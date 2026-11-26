import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import SongForm from '../components/SongForm'
import { createSong } from '../services/songsApi'

const AddSongPage = () => {
  const navigate = useNavigate()

  // Espera la respuesta del servidor antes de avisar y navegar
  const handleSave = async (payload) => {
    const created = await createSong(payload)
    toast.success('Canción publicada')
    navigate(`/songs/${created.id}`)
  }

  return (
    <>
      <title>Publicar canción | Vinilo</title>
      <SongForm heading="Publicar una canción" onSave={handleSave} />
    </>
  )
}

export default AddSongPage
