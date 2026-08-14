import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './index.css'

import Navbar from './Navbar'
import Home from './Home'
import FullStackPage from './FullStackPage'
import BackEndPage from './BackEndPage'
import GameDevPage from './GameDevPage'
import AddProject from './AddProject'
import Error404 from './Error404'

import Login from './Login'
import { useAuth } from './useAuth'
import { signOut } from 'firebase/auth'
import { auth, db, deleteById } from './firebase'
import { getDocs, collection } from 'firebase/firestore'

import { Routes, Route, Link } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const colorsByRoute = {
  '/': ['#061410', '#1c990b'],
  '/fullstack': ['#0f1a2e', '#2b5fa8'],
  '/backend': ['#1a0f2e', '#7a2ba8'],
  '/gamedev': ['#2e0f0f', '#8ea20f'],
  'notFound': ['#1a0505', '#af1111'],
}

function App() {
  // Estado para manejar el hover del link "Developer Mode"
  const [isHovered, setIsHovered] = useState(false)
  // MANEJO DE ROTACION DE FONDO Y CAMBIO DE COLOR SEGUN RUTA
  const location = useLocation()
  const bgRef = useRef(null)
  const angleRef = useRef(135)
  const activeLayer = useRef(0)
  const [layers, setLayers] = useState([
    { colors: colorsByRoute['/'], opacity: 1 },
    { colors: colorsByRoute['/'], opacity: 0 },
  ])
  // Rotación automática constante (SIN CAMBIOS)
  useEffect(() => {
    let animationId
    const autoRotate = () => {
      angleRef.current += 0.25
      if (bgRef.current) {
        bgRef.current.style.setProperty('--gradient-angle', `${angleRef.current}deg`)
      }
      animationId = requestAnimationFrame(autoRotate)
    }
    autoRotate()
    return () => cancelAnimationFrame(animationId)
  }, [])
  // Cambio de color según la ruta (REEMPLAZA al useEffect viejo)
  useEffect(() => {
    const newColors = colorsByRoute[location.pathname] || colorsByRoute['notFound']
    const nextLayer = activeLayer.current === 0 ? 1 : 0

    setLayers((prev) => {
      const updated = [...prev]
      updated[nextLayer] = { colors: newColors, opacity: 1 }
      updated[activeLayer.current] = { ...updated[activeLayer.current], opacity: 0 }
      return updated
    })

    activeLayer.current = nextLayer
  }, [location.pathname])

  // Manejo de borrado de proyectos
  const [deletingId, setDeletingId] = useState(null)

  // fetch de proyectos
  const [allProjects, setAllProjects] = useState([])
  useEffect(() => {
    const fetchAll = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setAllProjects(data)
    }
    fetchAll()
  }, [location.pathname])

  // Manejo de autenticación
  const { user, loading } = useAuth()

  const handleLogout = async () => {
  try {
    await signOut(auth)
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 3000,
    })
  } catch (err) {
    console.error('Error al desloguear:', err)
  }
}

  if (loading) {
    return <div className="loading-screen">Cargando...</div>
  }

  const styleDeveloperMode = {
    display: 'block',
    textAlign:'right',
  marginRight: '10px',
  marginTop: '5px',
  fontSize: '12px',
  textDecoration: 'none',
  fontWeight: 'bold',
  cursor:'pointer',
  color: isHovered ? '#d61717' : '#ffffff00',
  }

const handleDeleteProject = async (projectId) => {
  setDeletingId(projectId)
  try {
    await deleteById(projectId)
    setAllProjects((prev) => prev.filter((p) => p.id !== projectId))
    toast.success('Project deleted successfully!')
  } catch (error) {
    console.error('Error deleting project:', error)
    toast.error('Failed to delete project.')
  } finally {
    setDeletingId(null)
  }
}

  return (
    <div className="Background" ref={bgRef}>
      {layers.map((layer, i) => (
        <div
          key={i}
          className="gradient-layer"
          style={{
            background: `linear-gradient(var(--gradient-angle, 135deg), ${layer.colors[0]}, ${layer.colors[1]})`,
            opacity: layer.opacity,
          }}
        />
      ))}
      <div className="content-wrapper">
        {!user && 
        <a className="developer-mode">
          <Link to="/login" style={styleDeveloperMode} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            Developer Mode
          </Link>
        </a>}
        {user && (
  <Link to="/" style={styleDeveloperMode} onClick={handleLogout} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            Logout
  </Link>
)}
        <Navbar isDeveloperModeOn={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fullstack" element=
          {<FullStackPage 
          projects={allProjects.filter(p => p.section === 'fullstack' || p.section === 'all')}
          handleDelete={handleDeleteProject}
          deletingId={deletingId} />} 
          />
          <Route path="/backend" element=
          {<BackEndPage 
          projects={allProjects.filter(p => p.section === 'backend' || p.section === 'all')}
          handleDelete={handleDeleteProject}
          deletingId={deletingId} />} 
          />
          <Route path="/gamedev" element=
          {<GameDevPage 
          projects={allProjects.filter(p => p.section === 'gamedev' || p.section === 'all')}
          handleDelete={handleDeleteProject}
          deletingId={deletingId} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App