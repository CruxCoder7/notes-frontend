import React, { useEffect, useState } from "react";
import styles from "../styles/notes.module.css";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NoteComp = ({ data, auth }) => {
  return (
    <div className={styles.card}>
      <Card
        text="dark"
        className="mb-5"
        style={{ height: "10rem", backgroundColor: "rgb(102, 178, 255)" }}
      >
        <Card.Header
          style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}
        >
          {data.subject}
        </Card.Header>
        <Card.Body style={{ backgroundColor: "rgb(102, 178, 255)" }}>
          <Card.Title style={{ backgroundColor: "rgb(102, 178, 255)" }}>
            {data.topic}
          </Card.Title>
          <br></br>
          <Card.Link
            href={data.url}
            target="_blank"
            className={styles.link}
            style={{ backgroundColor: "rgb(102, 178, 255)", color: "blue" }}
          >
            Click Here
            {auth ? (
              <span>
                <Link to={"/notes/del/" + data._id} state={{ id: data._id }}>
                  <AiFillDelete className={styles.icon} />
                </Link>
                <Link
                  to={"/notes/update/" + data._id}
                  state={{
                    id: data._id,
                    subject: data.subject,
                    topic: data.topic,
                    url: data.url,
                  }}
                >
                  <GrUpdate className={styles.icon} />
                </Link>
              </span>
            ) : null}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

const NoteFunc = (filter, notes = [], auth) => {
  if (filter === "All") {
    return (
      <div className={styles.card_container}>
        {notes.map((note, i) => {
          return <NoteComp data={note} key={i} auth={auth}></NoteComp>;
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.card_container}>
        {notes
          .filter((data) => data.subject === filter)
          .map((note, i) => {
            return <NoteComp data={note} key={i} auth={auth}></NoteComp>;
          })}
      </div>
    );
  }
};

function Notes({ auth, del }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const url = "https://notes-blog-backend.herokuapp.com/api/notes";
    axios.get(url).then((res) => {
      setNotes(res.data);
    });
  }, []);

  if (del) {
    const { id } = location.state;
    const url = `https://notes-blog-backend.herokuapp.com/api/notes/del/${id}`;
    axios.get(url).then(navigate("/notes")).then(window.location.reload());
  }
  return (
    <>
      <div className={styles.note_container}>
        <h2> {filter} Notes </h2>
      </div>
      <div className={styles.dropdown}>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filters"
          className={styles.dropdown_act}
        >
          <Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Linear Algebra")}>
            Linear Algebra
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Digital Design")}>
            Digital Design
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Physics")}>
            Physics
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("EVS")}>EVS</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("English")}>
            English
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Prog in C")}>
            Prog in C
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {notes.length > 0 ? (
        NoteFunc(filter, notes, auth)
      ) : (
        <div className={styles.containerr}>
          <h1> NO NOTES UPLOADED YET </h1>
        </div>
      )}
    </>
  );
}

export default Notes;
