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

import { Card } from 'react-bootstrap';

export default function PageHeader(props) {
  return (
    <Card className="bg-light mb-4">
      <Card.Body>
        <h1>{props.text}</h1>
        {props.subtext ? <p className="text-muted">{props.subtext}</p> : null}
      </Card.Body>
    </Card>
  );
}