// Login.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../context/appContext/actions";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../context/appContext";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    login({ email: email, password: password }, (data) => {
      dispatch({ type: "SET_USER_DETAIL", user: jwtDecode(data)?.user });
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="card p-4">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Login
          </Button>

          <div className="text-center mt-3">
            <span>Don't have an account?</span>{" "}
            <Link to="/sign-up">
              <Button variant="link">Sign Up</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
