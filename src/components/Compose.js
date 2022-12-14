import React from "react";
import { useState } from "react";
import styles from "../styles/compose.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Compose({ logout, update }) {
  const location = useLocation();
  const [title, setTitle] = useState(update ? location.state.titlee : "");
  const [content, setContent] = useState(update ? location.state.contentt : "");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://abdullahsheriff-backend.netlify.app/.netlify/functions/postBlog";
    axios
      .post(url, { title: title, content: content })
      .then(setTitle(""))
      .then(setContent(""))
      .then(setSuccessMsg("Blog has been successfully created!"))
      .then(handleSuccess());
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const url = `https://abdullahsheriff-backend.netlify.app/.netlify/functions/updateBlog/${location.state.id}`;
    axios
      .patch(url, { title: title, content: content })
      .then(setTitle(""))
      .then(setContent(""))
      .then(setSuccessMsg("Blog has been successfully updated!"))
      .then(handleSuccess());
  };

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
          <h2>Compose Blog</h2>
        </div>
        <div className={styles.form_container}>
          <Form
            onSubmit={update ? handleUpdateSubmit : handleSubmit}
            style={{ width: "40%" }}
          >
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                className={styles.control}
                value={title}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Content</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows="5"
                cols="50"
                name="content"
                id="content"
                onChange={(e) => setContent(e.target.value)}
                className={styles.control}
                value={content}
                required
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
            <Link to="/compose/notes" state={{ token: location.state?.token }}>
              <Button
                variant="primary"
                size="lg"
                className={styles.add_notes_btn}
              >
                Add Notes
              </Button>
            </Link>
            <br></br>
            <h6 className={styles.success}>{successMsg}</h6>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Compose;
