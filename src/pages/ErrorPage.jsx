import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

const ErrorPage = () => {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? error.statusText : error.message

  return (
    <section className="text-center py-20">
      <title>Algo salió mal | Vinilo</title>
      <h1 className="text-3xl font-bold mb-4">No encontramos esta canción</h1>
      <p className="mb-6 text-stone-600">{message}</p>
      <Link to="/songs" className="bg-indigo-800 text-white font-semibold rounded-lg px-5 py-2">Ver todas las canciones</Link>
    </section>
  )
}

export default ErrorPage
