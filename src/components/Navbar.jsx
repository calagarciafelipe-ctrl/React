import { NavLink, Link } from 'react-router'
import { FaMusic } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/songs', label: 'Canciones' },
  { to: '/favorites', label: 'Favoritas' },
  { to: '/add-song', label: 'Publicar' },
]

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-pink-400 text-indigo-950' : 'text-indigo-50 hover:bg-indigo-800'}`

const Navbar = () => (
  <header className="bg-indigo-900">
    <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-300">
        <FaMusic aria-hidden="true" /> Vinilo
      </Link>
      <div className="flex flex-wrap gap-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  </header>
)

export default Navbar
