import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'

export function withPublic(Component, redirectTo = '/courses') {
  const WithPublic = (props) => {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (auth.user) {
        // Redirect to 'courses' or a specific page if the user is already authenticated
        const redirectRoute = router.query.from || redirectTo
        router.push(redirectRoute)
      } else {
        setLoading(false)
      }
    }, [auth.user, router])

    if (loading) {
      return <h1>Loading...</h1>
    }

    return <Component auth={auth} {...props} />
  }

  // Ensure getInitialProps from the wrapped component is called
  if (Component.getInitialProps) {
    WithPublic.getInitialProps = async (ctx) => {
      const componentProps = await Component.getInitialProps(ctx)
      return { ...componentProps }
    }
  }

  return WithPublic
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      if (router) {
        if (auth) {
          if (auth.userAuthenticated) {
            return setLoading(false)
          }
          if (auth.user == false) {
            void router.push({
              pathname: '/auth',
              query: { ...router.query, from: router.asPath },
            })
          }
          if (loading) {
            return <h1>Loading...</h1>
          }
        }
      }
    }, [auth, router])

    return <Component auth={auth} {...props} />
  }
}
