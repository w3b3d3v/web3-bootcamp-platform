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
          if(router.query.from.includes('[id]')){
            router.push('/courses/Solidity_And_Smart_Contracts')
          }else router.replace('/courses')
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
          void router.push({
            pathname: '/auth',
            query: { from: router.pathname },
          })
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
