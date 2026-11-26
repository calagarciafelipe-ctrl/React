import { useOptimistic } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { setFavorite } from '../services/songsApi'

// El corazón cambia al instante; si el PATCH falla, vuelve solo al valor real
const FavoriteButton = ({ song, onChange }) => {
  const [isFavorite, setOptimisticFavorite] = useOptimistic(song.favorite)

  const toggle = async () => {
    const next = !isFavorite
    setOptimisticFavorite(next)
    try {
      await setFavorite(song.id, next)
      onChange(song.id, next)
    } catch {
      toast.error('No se pudo actualizar la favorita')
    }
  }

  return (
    <form action={toggle}>
      <button
        type="submit"
        aria-label={isFavorite ? 'Quitar de favoritas' : 'Marcar como favorita'}
        aria-pressed={isFavorite}
        className="text-2xl text-red-600"
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </form>
  )
}

export default FavoriteButton
