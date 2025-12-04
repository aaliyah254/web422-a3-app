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

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Alert, Button } from 'react-bootstrap';

import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';

// Jotai
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    const favs = await getFavourites();
    setFavouritesList(Array.isArray(favs) ? favs : []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning('');
    try {
      await authenticateUser(user, password);
      await updateAtom();           
      router.push('/');             
    } catch (err) {
      setWarning(err.message || 'Login failed');
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      {warning && (
        <>
          <Alert variant="danger">{warning}</Alert>
          <br />
        </>
      )}

      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  );
}