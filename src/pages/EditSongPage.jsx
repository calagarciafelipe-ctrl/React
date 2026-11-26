import { useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import SongForm from '../components/SongForm'
import { updateSong } from '../services/songsApi'

const EditSongPage = () => {
  const song = useLoaderData()
  const navigate = useNavigate()

  const handleSave = async (payload) => {
    await updateSong(song.id, payload)
    toast.success('Canción actualizada')
    navigate(`/songs/${song.id}`)
  }

  return (
    <>
      <title>{`Editar ${song.title} | Vinilo`}</title>
      <SongForm heading="Editar canción" song={song} onSave={handleSave} />
    </>
  )
}

export default EditSongPage
