import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function confirmPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userInfo = {
      email: emailInput,
      password: password,
    };

    console.log(userInfo);
    if (confirmPassword === "") {
      setPasswordsMatch("please confirm password");
    } else if (password !== confirmPassword) {
      setPasswordsMatch("password do not match!");
    } else {
      setPasswordsMatch("");
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.status === 400) {
        setErrorMessage(await response.text());
      } else if (response.ok) {
        setEmailInput("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
        navigate("/login");
      }
    }
  }

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Registration</h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Form
          className="d-flex flex-column"
          style={{ width: "240px", position: "relative" }}
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
          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={confirmPasswordHandler}
            />
          </Form.Group>
          <span
            style={{
              color: "red",
              fontSize: "14px",
              position: "absolute",
              top: "241px",
              left: "42px",
            }}
          >
            {passwordsMatch}
          </span>
          <Button variant="dark" type="submit" style={{ marginTop: "10px" }}>
            Sign Up
          </Button>
        </Form>
        <p className="text-muted mt-2">
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </Container>
    </>
  );
}
