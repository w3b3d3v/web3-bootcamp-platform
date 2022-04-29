import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

import { toast } from 'react-toastify'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'

import { auth } from '../firebase/initFirebase.js'

import { getUserFromFirestore, createUserinFirestore } from '../lib/user.js'

const AuthContext = createContext()

const formatUser = async (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
})

const toastParameters = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (currentUser) => {
    if (currentUser) {
      const formatedUser = await formatUser(currentUser)
      setUser(formatedUser)
      setSession(true)
      return formatedUser.email
    }
    setUser(false)
    setSession(false)
    return false
  }

  const setSession = (session) => {
    if (session) {
      cookie.set('web3dev-bootcamp-auth', session, {
        expires: 1,
      })
    } else {
      cookie.remove('web3dev-bootcamp-auth')
    }
  }

  const signup = (data) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user)
        createUserinFirestore(userCredential.user)
        Router.push('/courses')
        toast.success('Registrado com sucesso!', {
          toastParameters,
        })
      })
      .catch((error) => {
          if(error.code.includes('already-in-use')) {
            toast.error('Este email já está em uso!', {
              toastParameters,
            })
          }else {
            toast.error('Algo deu errado, tente novamente!', {
              toastParameters,
            })
          }
      })
      .finally(() => setLoading(false))
  }

  const login = (data) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user)
        getUserFromFirestore(userCredential.user)
        toast.success('Você entrou com sucesso!', {
          toastParameters,
        })
      })
      .catch((error) => {
        if(error.code.includes('not-found') || error.code.includes('wrong-password')) {
          toast.error('Credenciais inválidas, tente novamente.', {
            toastParameters,
          })
        }else {
          toast.error('Algo deu errado, tente novamente!', {
            toastParameters,
          })
        }
      })
      .finally(() => setLoading(false))
  }

  const loginGoogle = async () => {
    setLoading(true)
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user

        getUserFromFirestore(user)

        toast.success('Você entrou com sucesso!', {
          toastParameters,
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        toast.error('Algo de errado aconteceu.', {
          toastParameters,
        })
      })
  }

  const logout = async () => {
    try {
      Router.push('/')
      await auth.signOut()
      handleUser(false)
    } catch (error) {
      toast.error('Algo de errado aconteceu.', {
        toastParameters,
      })
    } finally {
      setLoading(false)
      toast.success('Você saiu!', {
        icon: '👋',
        toastParameters,
      })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        // loginGitHub,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

export default AuthContext
