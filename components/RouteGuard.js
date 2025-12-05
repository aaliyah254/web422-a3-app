/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aaliyah Salat Student ID: 161973185 Date: 01/12/2025
*
*  Vercel App (Deployed) Link: https://web422-a3-app.vercel.app/
*
********************************************************************************/ 

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/about', '/_error'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    try {
      if (isAuthenticated()) {
        const favs = await getFavourites();
        setFavouritesList(favs);
      } else {
        setFavouritesList(undefined); 
      }
    } catch {
    }
  }

  useEffect(() => {
    updateAtom().finally(() => authCheck(router.pathname));

    router.events.on('routeChangeComplete', authCheck);
    return () => router.events.off('routeChangeComplete', authCheck);
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    const publicRoute = PUBLIC_PATHS.includes(path);

    if (!isAuthenticated() && !publicRoute) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
}