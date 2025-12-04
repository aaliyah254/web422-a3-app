/*********************************************************************************
*  WEB422 – Assignment 2
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aaliyah Salat Student ID: 161973185  Date: 04/11/2025
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