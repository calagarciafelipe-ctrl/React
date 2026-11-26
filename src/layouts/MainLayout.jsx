import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

const MainLayout = () => (
  <div className="min-h-screen bg-stone-50 text-stone-800">
    <Navbar />
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Outlet />
    </main>
    <ToastContainer position="bottom-right" />
  </div>
)

export default MainLayout
