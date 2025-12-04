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

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Row, Col, Button } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: ""
    }
  });

  function submitForm(data) {
    router.push({
      pathname: '/books',
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
      )
    });
  }

  return (
    <>
      <PageHeader 
        text="Search for Books" 
        subtext="Browse the extensive collection of books available on openlibrary.org."
      />

      <Form noValidate onSubmit={handleSubmit(submitForm)}>

        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                {...register("author", { required: "Author is required" })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && (
                <div className="invalid-feedback">{errors.author.message}</div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="formLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength="3"
                {...register("language")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formPublishYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button variant="primary" type="submit" className="w-100 py-3 fs-5">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}