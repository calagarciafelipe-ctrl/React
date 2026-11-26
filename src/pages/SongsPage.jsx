import SongList from '../components/SongList'
import Spinner from '../components/Spinner'
import StatusMessage from '../components/StatusMessage'
import useAsync from '../hooks/useAsync'
import { getSongs } from '../services/songsApi'

const SongsPage = () => {
  const { data: songs, setData, loading, error } = useAsync(getSongs)

  const updateFavorite = (id, favorite) =>
    setData((list) => list.map((r) => (r.id === id ? { ...r, favorite } : r)))

  return (
    <>
      <title>Canciones | Vinilo</title>
      <h1 className="text-3xl font-bold mb-6">Todas las canciones</h1>
      {loading && <Spinner />}
      {error && <StatusMessage>No pudimos cargar las canciones. Revisa que la API esté encendida.</StatusMessage>}
      {songs && <SongList songs={songs} onFavoriteChange={updateFavorite} />}
    </>
  )
}

export default SongsPage
