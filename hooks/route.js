import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (router) {
        if (auth.user) {
          router.replace('/courses')
        } else {
          setLoading(false)
        }
      }
    }, [auth, router])

    if (loading) {
      return <h1>Loading...</h1>
    }

    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (router) {
        if (!auth || !auth.user) {
          router.replace('/auth')
        } else {
          setLoading(false)
        }
      }
    }, [auth, router])

    if (loading) {
      return <h1>Loading...</h1>
    }

    return <Component auth={auth} {...props} />
  }
}
