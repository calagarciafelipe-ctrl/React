import { Link } from 'react-router'
import SongCard from '../components/SongCard'
import Spinner from '../components/Spinner'
import StatusMessage from '../components/StatusMessage'
import useAsync from '../hooks/useAsync'
import { getSongs } from '../services/songsApi'

const FavoritesPage = () => {
  const { data: songs, setData, loading, error } = useAsync(getSongs)

  const updateFavorite = (id, favorite) =>
    setData((list) => list.map((r) => (r.id === id ? { ...r, favorite } : r)))

  const favorites = songs ? songs.filter((r) => r.favorite) : []

  return (
    <>
      <title>Favoritas | Vinilo</title>
      <h1 className="text-3xl font-bold mb-6">Canciones favoritas</h1>
      {loading && <Spinner />}
      {error && <StatusMessage>No pudimos cargar tus favoritas.</StatusMessage>}
      {songs && favorites.length === 0 && (
        <p className="py-10 text-center">
          Aún no tienes favoritas. <Link to="/songs" className="underline font-semibold">Explora las canciones</Link> y toca el corazón.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((r) => <SongCard key={r.id} song={r} onFavoriteChange={updateFavorite} />)}
      </div>
    </>
  )
}

export default FavoritesPage
