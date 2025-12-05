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

import { getToken, removeToken } from './authenticate';

async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `JWT ${token}`,
    'content-type': 'application/json'
  };
  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    removeToken(); 
    return { ok: false, data: [] };
  }

  const data = await res.json().catch(() => ({}));
  return { ok: res.status === 200, data };
}

export async function addToFavourites(id) {
  const { ok, data } = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${encodeURIComponent(id)}`,
    { method: 'PUT' }
  );
  return ok ? data : [];
}

export async function removeFromFavourites(id) {
  const { ok, data } = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${encodeURIComponent(id)}`,
    { method: 'DELETE' }
  );
  return ok ? data : [];
}

export async function getFavourites() {
  const { ok, data } = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites`,
    { method: 'GET' }
  );
  return ok ? data : [];
}