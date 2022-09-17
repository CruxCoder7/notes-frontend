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
import useSWR from "swr";

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
                    semester: data.semester,
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

const NoteFunc = (filter, Semester, notes = [], auth) => {
  if (filter === "All") {
    return (
      <div className={styles.card_container}>
        {notes
          .filter((note) => note.semester === Semester)
          .map((note, i) => {
            return <NoteComp data={note} key={i} auth={auth}></NoteComp>;
          })}
      </div>
    );
  } else {
    return (
      <div className={styles.card_container}>
        {notes
          .filter(
            (data) => data.subject === filter && data.semester === Semester
          )
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
  const [Semester, setSemester] = useState(1);
  // const [notes, setNotes] = useState([]);
  const { data } = useSWR(
    "https://notes-blog-backend.herokuapp.com/api/notes",
    (url) => axios.get(url).then((r) => r.data)
  );
  // console.log(data);
  // useEffect(() => {
  //   const url = "https://notes-blog-backend.herokuapp.com/api/notes";
  //   axios.get(url).then((res) => {
  //     setNotes(res.data);
  //   });
  // }, []);

  if (del) {
    const { id } = location.state;
    const url = `https://notes-blog-backend.herokuapp.com/api/notes/del/${id}`;
    axios.get(url).then(navigate("/notes")).then(window.location.reload());
  }
  return (
    <>
      <div className={styles.note_container}>
        <h2>
          {filter} Semester {Semester} Notes{" "}
        </h2>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.dropdown}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Subject"
            className={styles.dropdown_act}
          >
            <Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("Linear Algebra");
                else if (Semester === 2) setFilter("Python");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Linear Algebra
                </span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>Python</span>
              )}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("Digital Design");
                else if (Semester === 2) setFilter("COA");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Digital Design
                </span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>COA</span>
              )}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("EVS");
                else if (Semester === 2) setFilter("Data Structures");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>EVS</span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Data Structures
                </span>
              )}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("Prog in C");
                else if (Semester === 2) setFilter("FDS");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Prog in C
                </span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>FDS</span>
              )}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("Physics");
                else if (Semester === 2) setFilter("SFDS");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>Physics</span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>SFDS</span>
              )}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (Semester === 1) setFilter("Comm English");
                else if (Semester === 2) setFilter("Engg English");
              }}
            >
              {Semester === 1 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Comm English
                </span>
              )}
              {Semester === 2 && (
                <span style={{ backgroundColor: "transparent" }}>
                  Engg English
                </span>
              )}
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className={styles.dropdown}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Semester"
            className={styles.dropdown_act}
          >
            <Dropdown.Item onClick={() => setSemester(1)}>1</Dropdown.Item>
            <Dropdown.Item onClick={() => setSemester(2)}>2</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {NoteFunc(filter, Semester, data, auth)}
    </>
  );
}

export default Notes;
