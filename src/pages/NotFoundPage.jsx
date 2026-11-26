import { Link } from 'react-router'

const NotFoundPage = () => (
  <section className="text-center py-20">
    <title>Página no encontrada | Vinilo</title>
    <h1 className="text-5xl font-bold mb-4">404</h1>
    <p className="mb-6">Esta página no existe.</p>
    <Link to="/" className="bg-indigo-800 text-white font-semibold rounded-lg px-5 py-2">Volver al inicio</Link>
  </section>
)

export default NotFoundPage
