import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/compose.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

function AddNotes({ logout, update }) {
  const location = useLocation();

  const [authenticated, setauthenticated] = useState(null);
  const [subject, setSubject] = useState(update ? location.state.subject : "");
  const [topic, setTopic] = useState(update ? location.state.topic : "");

  const [url, setUrl] = useState(update ? location.state.url : "");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const url = "http://localhost:3001/api/verify";

    if (location.state?.token) {
      axios.post(url, { token: location.state.token }).then((response) => {
        if (response.data.message === "success") {
          setauthenticated(true);
        } else {
          setauthenticated(false);
        }
      });
    } else {
      axios
        .post(url, { token: localStorage.getItem("authenticated") })
        .then((response) => {
          if (response.data.message === "success") {
            setauthenticated(true);
          } else {
            setauthenticated(false);
          }
        });
    }
  }, [location.state?.token]);

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = "https://notes-blog-backend.herokuapp.com/api/notes";
    axios
      .post(URL, {
        subject: subject,
        topic: topic,
        url: url,
      })
      .then(setSubject(""))
      .then(setTopic(""))
      .then(setUrl(""))
      .then(setSuccessMsg("Notes have been successfully added!"))
      .then(handleSuccess());
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const URL = `https://notes-blog-backend.herokuapp.com/api/notes/update/${location.state.id}`;
    axios
      .patch(URL, {
        subject: subject,
        topic: topic,
        url: url,
      })
      .then(setSubject(""))
      .then(setTopic(""))
      .then(setUrl(""))
      .then(setSuccessMsg("Notes have been successfully updated!"))
      .then(handleSuccess());
  };

  if (!authenticated) {
    return <div style={{ color: "wheat" }}> NOT AUTH</div>;
  } else {
    return (
      <>
        <div className={styles.container}>
          <Button
            variant="danger"
            className={styles.logout_btn}
            type="submit"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
          <div className={styles.compose_heading}>
            <h2>Add Notes</h2>
          </div>
          <div className={styles.form_container}>
            <Form
              onSubmit={update ? handleUpdateSubmit : handleSubmit}
              style={{ width: "40%" }}
            >
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  id="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  className={styles.control}
                  value={subject}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Topic</Form.Label>
                <Form.Control
                  type="text"
                  name="topic"
                  id="topic"
                  onChange={(e) => setTopic(e.target.value)}
                  value={topic}
                  className={styles.control}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>URL</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  id="url"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  className={styles.control}
                  required
                  autoComplete="off"
                ></Form.Control>
              </Form.Group>

              <Button
                variant="success"
                className={styles.comp_btn}
                type="submit"
                size="lg"
              >
                Post
              </Button>
              <br></br>
              <Link to="/compose/blogs">
                <Button
                  variant="primary"
                  size="lg"
                  className={styles.add_notes_btn}
                >
                  <span
                    style={{
                      backgroundColor: "transparent",
                    }}
                    className={styles.btn_span}
                  >
                    Compose Blogs
                  </span>
                </Button>
              </Link>
              <h6 className={styles.success}>{successMsg}</h6>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default AddNotes;
