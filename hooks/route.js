import { useRouter } from 'next/router';
import { fromJSON } from 'postcss';
import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if(router) {
        if(auth.user) {
          router.query.from ? router.push(router.query.from) : router.push('/courses');
        } else {
          setLoading(false);
        }
      }
    }, [auth, router]);

    if(loading) {
      return <h1>Loading...</h1>;
    }

    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if(router) {
        if(auth) {
          if(auth.user == false) console.log('é falso')
          if(auth.userAuthenticated) {
            return setLoading(false);
          }
          if(auth.user == false) {
            console.log('porr')
            void router.push({
              pathname: '/auth',
              query: { ...router.query, from: router.asPath },
            });
          }
          if(loading) {
            return <h1>Loading...</h1>;
          }
        }
      }
    }, [auth, router]);



    return <Component auth={auth} {...props} />;
  };
}
