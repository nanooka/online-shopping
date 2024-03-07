import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");

  function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userInfo = {
      email: emailInput,
      password: password,
    };

    console.log(userInfo);

    await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    setEmailInput("");
    setPassword("");
  }

  return (
    <div>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Log In</h1>
        <Form
          className="d-flex flex-column"
          style={{ width: "240px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={emailInput}
              onChange={emailHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordHandler}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-muted mt-2">
          Do not have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </Container>
    </div>
  );
}
