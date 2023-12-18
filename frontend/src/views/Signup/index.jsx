// Sign Up.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../context/appContext/actions";
import { useAppDispatch } from "../../context/appContext";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    signUp(state, (data) => {
      dispatch({ type: "SET_USER_DETAIL", user: jwtDecode(data)?.user });
      navigate("/", { replace: true });
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="card p-4">
        <h2 className="text-center">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="first_name"
              value={state.first_name}
              onChange={handleOnChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={state.last_name}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={state.email}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Sign Up
          </Button>

          <div className="text-center mt-3">
            <span>Do you want to login?</span>{" "}
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
