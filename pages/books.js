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

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const router = useRouter();
  const { query, isReady } = router;

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const queryString = new URLSearchParams(query).toString();

  const url =
    isReady && queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null;

  const { data, error } = useSWR(url);

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  function previous() {
    if (page > 1) setPage((p) => p - 1);
  }
  function next() {
    setPage((p) => p + 1);
  }

  const subtext =
    query && Object.keys(query).length > 0
      ? Object.entries(query)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ')
      : 'No search filters applied';

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      {!data && !error && <p>Loading…</p>}
      {error && <p>Failed to load results.</p>}

      {pageData?.docs?.length > 0 && (
        <>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {pageData.docs.map((book) => {
                const workHref = book.key || '#';
                return (
                  <tr
                    key={book.key}
                    onClick={() => router.push(workHref)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <Link
                        href={workHref}
                        onClick={(e) => e.stopPropagation()}
                        className="text-dark text-decoration-none"
                      >
                        {book.title || 'Untitled'}
                      </Link>
                    </td>
                    <td>{book.first_publish_year ?? 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previous} disabled={page <= 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}

      {pageData && pageData.docs?.length === 0 && <p>No results found.</p>}
    </>
  );
}