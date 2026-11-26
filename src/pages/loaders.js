import { getSong } from '../services/songsApi'

export const songLoader = ({ params }) => getSong(params.id)
