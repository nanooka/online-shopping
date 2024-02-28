// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignUp() {
  // const [backendData, setBackendData] = useState([{}]);
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   fetch("/users", {
  //     method: "POST",
  //     body: JSON.stringify(handleSubmit),
  //   });
  // }, []);

  // function sending() {
  //   fetch("/users", {
  //     method: "POST",
  //     body: JSON.stringify(handleSubmit),
  //   });
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function emailHandler(e: any) {
    setEmailInput(e.target.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function passwordHandler(e: any) {
    setPassword(e.target.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function confirmPasswordHandler(e: any) {
    setConfirmPassword(e.target.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    const userInfo = {
      email: emailInput,
      password: password,
      // confirmPassword: confirmPassword,
    };

    console.log(userInfo);
    // return userInfo;
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Registration</h1>
        <Form
          className="d-flex flex-column"
          style={{ width: "240px" }}
          // onSubmit={}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={confirmPasswordHandler}
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Form>
        <p className="text-muted mt-2">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Container>
    </>
  );
}
