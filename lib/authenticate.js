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
*  Vercel App (Deployed) Link: https://web422-a3-app.vercel.app/login
*
********************************************************************************/ 

import { jwtDecode } from 'jwt-decode';

function setToken(token) {
  try {
    localStorage.setItem('access_token', token);
  } catch {}
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem('access_token');
  } catch {}
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return readToken() ? true : false;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userName: user,
      password: password,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 200 && data.token) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message || "Login failed");
  }
}


export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userName: user,
      password: password,
      password2: password2
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message || "Registration failed");
  }
}

export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `JWT ${token}` } : {};
}