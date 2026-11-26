import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Input from './Input'
import SubmitButton from './SubmitButton'

const CATEGORIES = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Bebida']
const MOODS = ['Fácil', 'Media', 'Difícil']
const FIELD_ORDER = ['title', 'duration', 'rating', 'description', 'artistName', 'country']

const toFormState = (song) => ({
  title: song?.title ?? '',
  category: song?.category ?? CATEGORIES[0],
  mood: song?.mood ?? MOODS[0],
  duration: song?.duration ?? '',
  rating: song?.rating ?? '',
  description: song?.description ?? '',
  artistName: song?.artist.name ?? '',
  country: song?.artist.country ?? '',
  bio: song?.artist.bio ?? '',
  credits: song
    ? song.credits.map((i) => ({ ...i, id: crypto.randomUUID() }))
    : [{ id: crypto.randomUUID(), name: '', role: '' }],
  notes: song
    ? song.notes.map((text) => ({ id: crypto.randomUUID(), text }))
    : [{ id: crypto.randomUUID(), text: '' }],
})

const validate = (f) => {
  const e = {}
  const prep = Number(f.duration)
  const rating = Number(f.rating)
  if (!f.title.trim()) e.title = 'Escribe el título de la canción.'
  if (!Number.isInteger(prep) || prep <= 0) e.duration = 'La duración debe ser un entero mayor que 0.'
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) e.rating = 'La calificación debe estar entre 1 y 5.'
  if (!f.description.trim()) e.description = 'Agrega una descripción corta.'
  if (!f.artistName.trim()) e.artistName = 'Escribe el nombre del artista.'
  if (!f.country.trim()) e.country = 'Escribe el país del artista.'
  if (!f.credits.some((i) => i.name.trim() && i.role.trim())) e.credits = 'Agrega al menos un crédito con persona y rol.'
  if (!f.notes.some((s) => s.text.trim())) e.notes = 'Agrega al menos un dato curioso.'
  return e
}

const buildPayload = (f, song) => ({
  ...(song ?? { favorite: false, createdAt: new Date().toISOString() }),
  title: f.title.trim(),
  category: f.category,
  mood: f.mood,
  duration: Number(f.duration),
  rating: Number(f.rating),
  description: f.description.trim(),
  credits: f.credits
    .filter((i) => i.name.trim() && i.role.trim())
    .map((i) => ({ name: i.name.trim(), role: i.role.trim() })),
  notes: f.notes.map((s) => s.text.trim()).filter(Boolean),
  artist: { name: f.artistName.trim(), country: f.country.trim(), bio: f.bio.trim() },
})

const smallBtn = 'border rounded-lg px-3 py-1 text-sm'

const SongForm = ({ song, onSave, heading }) => {
  const [form, setForm] = useState(() => toFormState(song))
  const refs = useRef({})

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const updateRow = (key, id, patch) =>
    setForm((f) => ({ ...f, [key]: f[key].map((r) => (r.id === id ? { ...r, ...patch } : r)) }))
  const removeRow = (key, id) => setForm((f) => ({ ...f, [key]: f[key].filter((r) => r.id !== id) }))
  const addRow = (key, row) => setForm((f) => ({ ...f, [key]: [...f[key], { id: crypto.randomUUID(), ...row }] }))

  // React 19: la acción del <form> + useActionState manejan validación y envío
  const [state, formAction] = useActionState(
    async () => {
      const errors = validate(form)
      if (Object.keys(errors).length > 0) return { errors }
      try {
        await onSave(buildPayload(form, song))
        return { errors: {} }
      } catch {
        toast.error('No se pudo guardar la canción')
        return { errors: { form: 'El servidor no respondió. Intenta de nuevo.' } }
      }
    },
    { errors: {} }
  )

  // Enfoca el primer campo con error
  useEffect(() => {
    const first = FIELD_ORDER.find((k) => state.errors[k])
    if (first) refs.current[first]?.focus()
  }, [state])

  const err = state.errors
  const ref = (key) => (el) => {
    refs.current[key] = el
  }

  return (
    <form action={formAction} className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto grid gap-4">
      <h1 className="text-3xl font-bold">{heading}</h1>
      {err.form && <p role="alert" className="text-red-600">{err.form}</p>}

      <Input id="title" label="Título" ref={ref('title')} value={form.title} onChange={set('title')} error={err.title} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="category" label="Género" as="select" value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </Input>
        <Input id="mood" label="Ánimo" as="select" value={form.mood} onChange={set('mood')}>
          {MOODS.map((d) => <option key={d}>{d}</option>)}
        </Input>
        <Input id="duration" label="Duración (segundos)" type="number" ref={ref('duration')} value={form.duration} onChange={set('duration')} error={err.duration} />
        <Input id="rating" label="Calificación (1 a 5)" type="number" ref={ref('rating')} value={form.rating} onChange={set('rating')} error={err.rating} />
      </div>
      <Input id="description" label="Descripción" as="textarea" rows="3" ref={ref('description')} value={form.description} onChange={set('description')} error={err.description} />

      <fieldset className="grid gap-2">
        <legend className="font-semibold mb-1">Créditos</legend>
        {form.credits.map((i, index) => (
          <div key={i.id} className="flex gap-2 items-end">
            <Input id={`ing-name-${i.id}`} label={`Persona ${index + 1}`} value={i.name} onChange={(e) => updateRow('credits', i.id, { name: e.target.value })} />
            <Input id={`ing-qty-${i.id}`} label="Rol" value={i.role} onChange={(e) => updateRow('credits', i.id, { role: e.target.value })} />
            <button type="button" className={smallBtn} aria-label={`Quitar crédito ${index + 1}`} onClick={() => removeRow('credits', i.id)}>Quitar</button>
          </div>
        ))}
        {err.credits && <p className="text-sm text-red-600">{err.credits}</p>}
        <button type="button" className={`${smallBtn} self-start`} onClick={() => addRow('credits', { name: '', role: '' })}>Agregar crédito</button>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="font-semibold mb-1">Datos curiosos</legend>
        {form.notes.map((s, index) => (
          <div key={s.id} className="flex gap-2 items-end">
            <Input id={`step-${s.id}`} label={`Dato ${index + 1}`} value={s.text} onChange={(e) => updateRow('notes', s.id, { text: e.target.value })} />
            <button type="button" className={smallBtn} aria-label={`Quitar dato ${index + 1}`} onClick={() => removeRow('notes', s.id)}>Quitar</button>
          </div>
        ))}
        {err.notes && <p className="text-sm text-red-600">{err.notes}</p>}
        <button type="button" className={`${smallBtn} self-start`} onClick={() => addRow('notes', { text: '' })}>Agregar dato</button>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="artistName" label="Artista" ref={ref('artistName')} value={form.artistName} onChange={set('artistName')} error={err.artistName} />
        <Input id="country" label="País" ref={ref('country')} value={form.country} onChange={set('country')} error={err.country} />
      </div>
      <Input id="bio" label="Sobre el artista (opcional)" value={form.bio} onChange={set('bio')} />

      <div><SubmitButton>Guardar canción</SubmitButton></div>
    </form>
  )
}

export default SongForm
