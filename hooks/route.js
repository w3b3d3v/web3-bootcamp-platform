import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import Loading from '../components/Loading'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (router) {
        if (auth.user) {
          // Retrieve the saved redirect URL from localStorage
          const savedRedirectUrl = localStorage.getItem('redirectUrl')
          if (savedRedirectUrl) {
            localStorage.removeItem('redirectUrl') // Clear the saved URL
            window.location.href = savedRedirectUrl // Use window.location.href for redirection
          } else {
            router.push('/courses')
          }
        } else {
          setLoading(false)
        }
      }
    }, [auth, router])

    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (auth) {
        if (auth.userAuthenticated) {
          setLoading(false)
        } else if (auth.user === false) {
          // Save the current URL to localStorage before redirecting
          localStorage.setItem('redirectUrl', router.asPath)
          router.push('/auth')
        }
      }
    }, [auth, router])

    return <Component auth={auth} {...props} />
  }
}
