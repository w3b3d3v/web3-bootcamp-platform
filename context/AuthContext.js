import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import { mixpanel } from '../lib/utils/mixpanel.js'
import { toast } from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  OAuthProvider,
  linkWithCredential,
} from 'firebase/auth'
import { auth } from '../firebase/initFirebase.js'
import { getUserFromFirestore, createUserinFirestore, updateUserGithub } from '../lib/user.js'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const { t } = useTranslation()
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
      .then(async (userCredential) => {
        setUser(userCredential.user)
        await createUserinFirestore(userCredential.user)
        Router.push('/courses')
        toast.success(t('messages.registration_success'), {
          toastParameters,
        })
      })
      .catch((error) => {
        if (error.code.includes('already-in-use')) {
          toast.error(t('messages.email_in_use'), {
            toastParameters,
          })
        } else {
          toast.error(t('messages.something_wrong_try_again'), {
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
        toast.success(t('messages.login_success'), {
          toastParameters,
        })
      })
      .catch((error) => {
        if (error.code.includes('not-found') || error.code.includes('wrong-password')) {
          toast.error(t('messages.invalid_credentials_try_again'), {
            toastParameters,
          })
        } else {
          toast.error(t('messages.something_wrong_try_again'), {
            toastParameters,
          })
        }
      })
      .finally(() => setLoading(false))
  }

  const loginGoogle = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider())
      await handleUser(result.user)
      const redirectPath = router.query.from || '/courses'
      router.push(redirectPath)
      toast.success(t('messages.login_success'), {
        toastParameters,
      })
    } catch (error) {
      console.error('Google login error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info(t('messages.login_cancelled'), {
          toastParameters,
        })
      } else {
        toast.error(t('messages.something_wrong_try_again'), {
          toastParameters,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const loginGithub = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, new GithubAuthProvider())
      await handleGithubLogin(result.user)
      const redirectPath = router.query.from || '/courses'
      router.push(redirectPath)
      toast.success(t('messages.login_success'), {
        toastParameters,
      })
    } catch (error) {
      console.error('GitHub login error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info(t('messages.login_cancelled'), {
          toastParameters,
        })
      } else {
        toast.error(t('messages.something_wrong_try_again'), {
          toastParameters,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async (user) => {
    const userData = await getUserFromFirestore(user)
    if (!userData) {
      await createUserinFirestore(user)
    }
    setUser(user)
    const providerData = user.providerData.find((provider) => provider.providerId === 'github.com')
    if (providerData) {
      const githubUrl = `https://github.com/${providerData.uid}`
      await updateUserGithub(githubUrl, user.uid)
    }
    Router.push('/courses')
    toast.success(t('messages.login_success'), {
      toastParameters,
    })
  }

  const loginWithProvider = async (Provider) => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, new Provider())
      await handleUser(result.user)
      const redirectPath = router.query.from || '/courses'
      router.push(redirectPath)
      toast.success(t('messages.login_success'), {
        toastParameters,
      })
    } catch (error) {
      console.error('Provider login error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info(t('messages.login_cancelled'), {
          toastParameters,
        })
      } else {
        toast.error(t('messages.something_wrong_try_again'), {
          toastParameters,
        })
      }
    } finally {
      setLoading(false)
    }
  }
  let githubUrl = ''

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          await handleGithubLogin(result.user)
        }
      } catch (error) {
        console.error('Redirect result error:', error)
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credential = OAuthProvider.credentialFromResult(error.customData)
          sessionStorage.setItem('credential', JSON.stringify(credential))
          Router.push('/auth')
        }
      }
    }
    fetchUser()
    if (user) {
      mixpanel.identify(user?.uid)
      mixpanel.people.set(user)
    }
  }, [auth.currentUser])
  const logout = async () => {
    try {
      sessionStorage.clear()
      Router.push('/')
      await auth.signOut()
      handleUser(false)
    } catch (error) {
      toast.error(t('messages.something_wrong_happened'), {
        toastParameters,
      })
    } finally {
      setLoading(false)
      toast.success(t('messages.logout_success'), {
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
