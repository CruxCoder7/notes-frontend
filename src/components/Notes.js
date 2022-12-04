import React, { useState } from "react";
import styles from "../styles/notes.module.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Pagination from "./Pagination";

const NoteComp = ({ data, auth, color }) => {
  return (
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6574714792618765"
          crossorigin="anonymous"
        ></script>
      </head>
      <div className={styles.card}>
        <Card
          text="dark"
          className="mb-5"
          style={{
            width: "18rem",
            backgroundColor: "rgb(102, 178, 255)",
          }}
        >
          <Card.Header
            style={{ color: color, fontSize: "20px", fontWeight: "bold" }}
          >
            {data.subject}
          </Card.Header>
          <Card.Body
            style={{
              backgroundColor: "rgb(102, 178, 255)",
            }}
          >
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
    </>
  );
};

function Notes({ auth, del }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(9);

  const { data } = useSWR(
    "https://abdullahsheriff-backend.netlify.app/.netlify/functions/getNotes",
    (url) => axios.get(url).then((r) => r.data)
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = data?.slice(indexOfFirstNote, indexOfLastNote);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (del) {
    const { id } = location.state;
    const url = `https://abdullahsheriff-backend.netlify.app/.netlify/functions/delNote/${id}`;
    axios.get(url).then(navigate("/notes")).then(window.location.reload());
  }

  return (
    <>
      <div className={styles.note_container}>
        <div class="container">
          <InputGroup>
            <FormControl
              placeholder="Search Subject"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <div className={styles.card_container}>
        {search === ""
          ? data &&
            currentNotes
              .filter((val) => {
                if (
                  val.subject.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return val;
                } else return 0;
              })
              .map((note, i) => {
                return (
                  <NoteComp
                    data={note}
                    key={i}
                    auth={auth}
                    color={
                      note.subject === "Programming in C"
                        ? "lightgreen"
                        : note.subject === "Linear Algebra"
                        ? "purple"
                        : note.subject === "Digital Design"
                        ? "green"
                        : note.subject === "Engineering Physics"
                        ? "gray"
                        : null
                    }
                  ></NoteComp>
                );
              })
          : data &&
            data
              .filter((val) => {
                if (
                  val.subject.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return val;
                } else return 0;
              })
              .map((note, i) => {
                return (
                  <NoteComp
                    data={note}
                    key={i}
                    auth={auth}
                    color={
                      note.subject === "Programming in C"
                        ? "lightgreen"
                        : note.subject === "Linear Algebra"
                        ? "purple"
                        : note.subject === "Digital Design"
                        ? "green"
                        : note.subject === "Engineering Physics"
                        ? "gray"
                        : null
                    }
                  ></NoteComp>
                );
              })}
      </div>
      <Pagination
        notesPerPage={notesPerPage}
        totalPosts={data?.length}
        paginate={paginate}
      />
    </>
  );
}

export default Notes;
