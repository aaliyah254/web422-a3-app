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

import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

const WORK_ID = 'OL453657W';

export async function getStaticProps() {
  const res = await fetch(`https://openlibrary.org/works/${WORK_ID}.json`);
  if (!res.ok) return { props: { book: null } };
  const data = await res.json();
  return { props: { book: data } };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer – Aaliyah Salat" />
      <p>
        I’m a web development student passionate about building responsive, data-driven applications
        that deliver smooth and engaging user experiences. This project highlights my ability to
        integrate public APIs, structure React components effectively, and design clean, functional
        interfaces using Next.js and React-Bootstrap.
      </p>

      {props.book ? (
        <BookDetails book={props.book} workId={WORK_ID} showFavouriteBtn={false} />
      ) : (
        <p>Couldn’t load the demo book.</p>
      )}
    </>
  );
}