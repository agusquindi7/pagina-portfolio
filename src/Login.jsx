import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import './Login.css'
import {toast} from 'react-toastify'
import { Helmet } from 'react-helmet-async';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
      })
      navigate('/') // redirige al Home apenas el login sale bien
    } catch (err) {
      setError('Email o contraseña incorrectos')
      console.error(err)
    }
  }

  return (
    <>
    <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Login Admin</title>
        <meta name="description" content="Login page for admin access to the portfolio" />
      </Helmet>
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login Admin</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
    </>
  )
}

export default Login