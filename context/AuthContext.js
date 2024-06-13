import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import { mixpanel } from '../lib/utils/mixpanel.js'
import { toast } from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  OAuthProvider,
  linkWithCredential,
} from 'firebase/auth'
import { auth } from '../firebase/initFirebase.js'
import { getUserFromFirestore, createUserinFirestore, updateUserGithub } from '../lib/user.js'

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
  const [userAuthenticated, setUserAuthenticated] = useState(false)
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
      setUserAuthenticated(true)
      setLoading(false)
    } else {
      cookie.remove('web3dev-bootcamp-auth')
      setUserAuthenticated(false)
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
        if (error.code.includes('already-in-use')) {
          toast.error('Este email já está em uso!', {
            toastParameters,
          })
        } else {
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
        if (error.code.includes('not-found') || error.code.includes('wrong-password')) {
          toast.error('Credenciais inválidas, tente novamente.', {
            toastParameters,
          })
        } else {
          toast.error('Algo deu errado, tente novamente!', {
            toastParameters,
          })
        }
      })
      .finally(() => setLoading(false))
  }

  const loginGoogle = async () => {
    return loginWithProvider(GoogleAuthProvider)
  }

  const loginGithub = async () => {
    return loginWithProvider(GithubAuthProvider)
  }

  const loginWithProvider = async (Provider) => {
    setLoading(true)
    await signInWithRedirect(auth, new Provider())
  }
  let githubUrl = ''

  useEffect(() => {
    async function fetchUser() {
      await getRedirectResult(auth)
        .then(async (result) => {
          const user = result?.user
          if (!user) return
          const cred = JSON.parse(sessionStorage.getItem('credential'))

          if (cred?.providerId == 'github.com') {
            await linkGithub(cred, user)
          }
          const providerObj = user.reloadUserInfo.providerUserInfo[0]
          if (providerObj.providerId !== 'github.com') return
          await getUserFromFirestore(user)
          githubUrl = `https://${providerObj.providerId}/${providerObj.screenName}`
          await updateUserGithub(githubUrl, user.uid)
          sessionStorage.clear()

          toast.success('Você entrou com sucesso!', {
            toastParameters,
          })
        })
        .catch((error) => {
          console.log(error)
          if (error.code === 'auth/account-exists-with-different-credential') {
            const credential = OAuthProvider.credentialFromResult(error.customData)
            sessionStorage.setItem('credential', JSON.stringify(credential))
            Router.push('/auth')
          }
        })
    }
    fetchUser()
    if (user) {
      mixpanel.identify(user?.uid)
      mixpanel.people.set(user)
    }
  }, [auth.currentUser])

  async function linkGithub(cred, user) {
    if (user) {
      const credential = GithubAuthProvider.credential(cred.accessToken)
      const userCredential = await linkWithCredential(user, credential)
      githubUrl = JSON.parse(userCredential._tokenResponse.rawUserInfo).html_url
      await updateUserGithub(githubUrl, user.uid)
      await getUserFromFirestore(user, user.providerData)
    }
  }
  const logout = async () => {
    try {
      sessionStorage.clear()
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
        userAuthenticated,
        login,
        signup,
        loginGithub,
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
