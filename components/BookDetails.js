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
*  Vercel App (Deployed) Link: https://web422-a3-user-api-nu.vercel.app/
*
********************************************************************************/ 

import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  if (!book) return null;

  const title = book?.title || 'Untitled';
  const description = book?.description
    ? typeof book.description === 'string'
      ? book.description
      : book.description.value
    : null;

  const people = Array.isArray(book?.subject_people)
    ? book.subject_people.join(', ')
    : null;

  const places = Array.isArray(book?.subject_places)
    ? book.subject_places.join(', ')
    : null;

  const moreLinks = Array.isArray(book?.links) ? book.links : [];
  const coverId = book?.covers?.[0];

  async function favouritesClicked() {
    if (!workId) return;

    try {
      if (showAdded) {
        const updated = await removeFromFavourites(workId);
        setFavouritesList(updated);
      } else {
        const updated = await addToFavourites(workId);
        setFavouritesList(updated);
      }
    } catch (err) {
      console.error('Favourites update failed:', err);
      // Optional: surface a toast/alert here
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={
              coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                : 'https://placehold.co/400x600?text=Cover+Not+Available'
            }
            alt="Cover Image"
          />
        </Col>

        <Col lg="8">
          <h3>{title}</h3>

          {description && <p>{description}</p>}

          {people && (
            <>
              <h5>Characters</h5>
              {people}
              <br />
            </>
          )}

          {places && (
            <>
              <h5>Settings</h5>
              {places}
              <br />
            </>
          )}

          {moreLinks.length > 0 && (
            <>
              <h5>More Information</h5>
              {moreLinks.map((l, i) => (
                <span key={i}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.title || l.url}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {showFavouriteBtn && workId && (
            <>
              <br />
              <Button
                variant={showAdded ? 'danger' : 'outline-primary'}
                onClick={favouritesClicked}
              >
                {showAdded ? 'Remove Favourite' : '+ Favourite'}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}