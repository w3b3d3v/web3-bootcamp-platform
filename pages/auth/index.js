import { useState } from 'react'

import useAuth from '../../hooks/useAuth'

function authPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, loading, login, register, logout } = useAuth()
  console.log('user', user)
  console.log('email', email)
  console.log('password', password)
  return (
    <>
      <div>
        <h3> Registrar </h3>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => register(email, password)}> Registrar</button>
      </div>
      

      <h4> Usuário logado: </h4>
      {user?.email}

      {user ? (
        <button onClick={logout}> Sair </button>
      ) : (
        'Você não ta logado'
      )}

<div>
        <h3> Logar </h3>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => login(email, password)}> Login</button>
      </div>
    </>
  )
}

export default authPage
