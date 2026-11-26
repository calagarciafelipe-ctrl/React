const BASE = '/api/songs'

// Revisa response.ok y lanza un error si la respuesta no es exitosa
const request = async (url, options) => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`La API respondió con error ${response.status}`)
  return response.json()
}

const withBody = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const getSongs = () => request(BASE)

export const getLatestSongs = async () => {
  const result = await request(`${BASE}?_sort=-createdAt&_page=1&_per_page=3`)
  return result.data // json-server 1.x devuelve los datos en "data"
}

export const getSong = (id) => request(`${BASE}/${id}`)
export const createSong = (song) => request(BASE, withBody('POST', song))
export const updateSong = (id, song) => request(`${BASE}/${id}`, withBody('PUT', song))
export const setFavorite = (id, favorite) => request(`${BASE}/${id}`, withBody('PATCH', { favorite }))
export const deleteSong = (id) => request(`${BASE}/${id}`, { method: 'DELETE' })
