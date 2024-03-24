import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogIn() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const token = data.token;
      const userID = data.userID;
      Cookies.set("userID", userID, { expires: 1 });
      localStorage.setItem("token", token);
      setEmailInput("");
      setPassword("");
      setErrorMessage("");
    } else {
      setErrorMessage("email or password is not correct");
    }
  }

  return (
    <div>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Log In</h1>
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
          <span
            style={{
              color: "red",
              fontSize: "14px",
              position: "absolute",
              top: "157px",
              left: "20px",
            }}
          >
            {errorMessage}
          </span>
          <Button variant="dark" type="submit" style={{ marginTop: "10px" }}>
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
