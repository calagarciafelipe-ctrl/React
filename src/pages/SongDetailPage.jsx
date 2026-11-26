import { formatDuration } from '../utils/formatDuration'
import { Link, useLoaderData, useNavigate, useRevalidator } from 'react-router'
import { toast } from 'react-toastify'
import FavoriteButton from '../components/FavoriteButton'
import { deleteSong } from '../services/songsApi'

const SongDetailPage = () => {
  const song = useLoaderData()
  const navigate = useNavigate()
  const { revalidate } = useRevalidator()

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${song.title}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteSong(song.id)
      toast.success('Canción eliminada')
      navigate('/songs')
    } catch {
      toast.error('No se pudo eliminar la canción')
    }
  }

  return (
    <article className="bg-white rounded-2xl shadow p-6 md:p-10 max-w-3xl mx-auto">
      <title>{`${song.title} | Vinilo`}</title>
      <meta name="description" content={song.description} />
      <Link to="/songs" className="text-indigo-800 font-semibold">Volver al listado</Link>
      <div className="flex justify-between items-start mt-4">
        <div>
          <p className="text-indigo-800 font-medium">{song.category} · {song.mood}</p>
          <h1 className="text-4xl font-bold">{song.title}</h1>
        </div>
        <FavoriteButton song={song} onChange={revalidate} />
      </div>
      <p className="mt-4 text-lg">{song.description}</p>
      <p className="mt-2 text-stone-500">{formatDuration(song.duration)} · Calificación {song.rating}/5</p>

      <h2 className="text-2xl font-bold mt-8 mb-2">Créditos</h2>
      <ul className="list-disc pl-6">
        {song.credits.map((i) => <li key={`${i.role}-${i.name}`}>{i.role}: {i.name}</li>)}
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-2">Datos curiosos</h2>
      <ul className="list-disc pl-6 grid gap-2">
        {song.notes.map((s) => <li key={s}>{s}</li>)}
      </ul>

      <div className="mt-8 bg-stone-100 rounded-xl p-4">
        <p className="font-semibold">Canción de {song.artist.name}</p>
        {song.artist.bio && <p>{song.artist.bio}</p>}
        <p className="text-sm text-stone-500">{song.artist.country}</p>
      </div>

      <div className="flex gap-3 mt-8">
        <Link to={`/edit-song/${song.id}`} className="bg-pink-400 text-indigo-950 font-semibold rounded-lg px-5 py-2">Editar</Link>
        <button onClick={handleDelete} className="bg-red-700 text-white font-semibold rounded-lg px-5 py-2">Eliminar</button>
      </div>
    </article>
  )
}

export default SongDetailPage
