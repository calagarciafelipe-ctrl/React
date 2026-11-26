import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SongsPage from './pages/SongsPage'
import SongDetailPage from './pages/SongDetailPage'
import AddSongPage from './pages/AddSongPage'
import EditSongPage from './pages/EditSongPage'
import FavoritesPage from './pages/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'
import { songLoader } from './pages/loaders'

// El enrutador se crea fuera de los componentes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'songs', element: <SongsPage /> },
      { path: 'songs/:id', element: <SongDetailPage />, loader: songLoader, errorElement: <ErrorPage /> },
      { path: 'add-song', element: <AddSongPage /> },
      { path: 'edit-song/:id', element: <EditSongPage />, loader: songLoader, errorElement: <ErrorPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
