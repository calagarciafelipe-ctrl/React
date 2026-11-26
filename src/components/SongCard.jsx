import { formatDuration } from '../utils/formatDuration'
import { useState } from 'react'
import { Link } from 'react-router'
import { FaClock, FaStar } from 'react-icons/fa'
import FavoriteButton from './FavoriteButton'

const MAX_CHARS = 90

const SongCard = ({ song, onFavoriteChange }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = song.description.length > MAX_CHARS
  const text = isLong && !expanded ? `${song.description.slice(0, MAX_CHARS).trimEnd()}...` : song.description

  return (
    <article className="bg-white rounded-2xl shadow p-5 flex flex-col">
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="text-sm text-indigo-800 font-medium">
            {song.category} · {song.mood}
          </p>
          <h3 className="text-xl font-bold">{song.title}</h3>
        </div>
        <FavoriteButton song={song} onChange={onFavoriteChange} />
      </div>
      <p className="mt-3 text-stone-600">{text}</p>
      {isLong && (
        <button onClick={() => setExpanded(!expanded)} className="self-start text-indigo-800 font-semibold mt-1">
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
      <div className="flex items-center gap-4 text-sm text-stone-500 mt-4">
        <span className="flex items-center gap-1"><FaClock aria-hidden="true" /> {formatDuration(song.duration)}</span>
        <span className="flex items-center gap-1"><FaStar aria-hidden="true" /> {song.rating}/5</span>
      </div>
      <Link to={`/songs/${song.id}`} className="mt-4 text-center bg-pink-400 text-indigo-950 font-semibold rounded-lg py-2 hover:bg-pink-300">
        Ver canción
      </Link>
    </article>
  )
}

export default SongCard
