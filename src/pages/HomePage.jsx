import { Link } from 'react-router'
import Hero from '../components/Hero'
import Card from '../components/Card'
import SongCard from '../components/SongCard'
import Spinner from '../components/Spinner'
import StatusMessage from '../components/StatusMessage'
import useAsync from '../hooks/useAsync'
import { getLatestSongs } from '../services/songsApi'

const HomePage = () => {
  const { data: songs, setData, loading, error } = useAsync(getLatestSongs)

  const updateFavorite = (id, favorite) =>
    setData((list) => list.map((r) => (r.id === id ? { ...r, favorite } : r)))

  return (
    <>
      <title>Vinilo | Inicio</title>
      <meta name="description" content="Catálogo web de canciones y playlists del Tolima." />
      <Hero />
      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <Card bg="bg-pink-100">
          <h2 className="text-2xl font-bold mb-2">Para artistas</h2>
          <p className="mb-4">Comparte tu canción con la comunidad.</p>
          <Link to="/add-song" className="font-semibold text-indigo-900 underline">Publicar una canción</Link>
        </Card>
        <Card bg="bg-indigo-100">
          <h2 className="text-2xl font-bold mb-2">Para oyentes</h2>
          <p className="mb-4">Busca por género y ánimo.</p>
          <Link to="/songs" className="font-semibold text-indigo-900 underline">Explorar canciones</Link>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Canciones recientes</h2>
      {loading && <Spinner />}
      {error && <StatusMessage>No pudimos cargar las canciones. Revisa que la API esté encendida.</StatusMessage>}
      {songs && (
        <div className="grid gap-6 md:grid-cols-3">
          {songs.map((r) => <SongCard key={r.id} song={r} onFavoriteChange={updateFavorite} />)}
        </div>
      )}
      <div className="text-center mt-8">
        <Link to="/songs" className="bg-indigo-800 text-white font-semibold rounded-lg px-5 py-2">Ver todas</Link>
      </div>
    </>
  )
}

export default HomePage
