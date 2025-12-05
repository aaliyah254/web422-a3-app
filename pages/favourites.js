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

import { Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import PageHeader from '@/components/PageHeader';
import BookCard from '@/components/BookCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  const hasItems = favouritesList.length > 0;

  if (!hasItems) {
    return (
      <>
        <PageHeader text="Nothing Here" subtext="Try adding a book to the list." />
      </>
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your favourite books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}