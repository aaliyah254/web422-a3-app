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

import { Container } from 'react-bootstrap';
import MainNav from '@/components/MainNav';

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{props.children}</Container>
      <br />
    </>
  );
}