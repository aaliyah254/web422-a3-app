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

import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading || !workId) return null;
  if (error || !data) return <Error statusCode={404} />;

  const title = data?.title || '';
  const firstPublished = data?.first_publish_date || 'N/A';
  const coverId = data?.covers?.[0];

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = 'https://placehold.co/300x450?text=No+Cover';
        }}
        className="img-fluid w-100"
        src={
          coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : 'https://placehold.co/300x450?text=No+Cover'
        }
        alt={title}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{title}</Card.Title>
        <Card.Text className="text-muted mb-3">
          First published: {firstPublished}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button as="a" variant="primary" className="mt-auto w-100">
            Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}