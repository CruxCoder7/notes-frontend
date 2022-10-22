import React, { useState } from "react";
import styles from "../styles/login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function LoginForm({ login, err, setErr }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://notes-blog-backend.herokuapp.com/api/login";
    axios
      .post(url, { email: details.email, pwd: details.password })
      .then((response) => login(response.data));
  };
  return (
    <>
      <div className={styles.admin_heading}>
        <h2>Admin Login</h2>
      </div>
      <div className={styles.admin_form}>
        <Form
          onSubmit={handleSubmit}
          style={{ width: "40%" }}
          autoComplete="on"
        >
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
              className={styles.control}
              required
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
              className={styles.control}
              name="password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <h5 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {err}
          </h5>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;
