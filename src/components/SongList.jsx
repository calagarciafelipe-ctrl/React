import { useState } from 'react'
import SongCard from './SongCard'

const CATEGORIES = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Bebida']
const MOODS = ['Fácil', 'Media', 'Difícil']
const PER_PAGE = 6

const SongList = ({ songs, onFavoriteChange }) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [mood, setDifficulty] = useState('Todas')
  const [page, setPage] = useState(1)

  // Estado derivado: la lista filtrada se calcula en cada render
  const text = search.trim().toLowerCase()
  const filtered = songs.filter(
    (r) =>
      r.title.toLowerCase().includes(text) &&
      (category === 'Todas' || r.category === category) &&
      (mood === 'Todas' || r.mood === mood)
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const onFilter = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('Todas')
    setDifficulty('Todas')
    setPage(1)
  }

  const field = 'border border-stone-300 rounded-lg py-2 px-3 bg-white'

  return (
    <section>
      <div className="grid gap-3 md:grid-cols-4 mb-6">
        <input type="search" aria-label="Buscar canción" placeholder="Buscar por nombre..." className={field} value={search} onChange={onFilter(setSearch)} />
        <select aria-label="Género" className={field} value={category} onChange={onFilter(setCategory)}>
          <option value="Todas">Todos los géneros</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Ánimo" className={field} value={mood} onChange={onFilter(setDifficulty)}>
          <option value="Todas">Todos los ánimos</option>
          {MOODS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <button onClick={clearFilters} className={field}>Limpiar filtros</button>
      </div>

      <p className="mb-4 text-stone-600">{filtered.length} de {songs.length} canciones</p>

      {filtered.length === 0 ? (
        <p className="py-10 text-center">No hay canciones con esos filtros. Prueba con otra búsqueda o limpia los filtros.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((r) => <SongCard key={r.id} song={r} onFavoriteChange={onFavoriteChange} />)}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-8">
        <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">Siguiente</button>
      </div>
    </section>
  )
}

export default SongList
