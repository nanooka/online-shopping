import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Log In</h1>
        <Form className="d-flex flex-column" style={{ width: "240px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-muted mt-2">
          Do not have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </Container>
      {/* <Link to={"./home"}>Home</Link> */}
    </div>
  );
}
