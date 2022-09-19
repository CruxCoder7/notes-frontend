import React from "react";
import axios from "axios";
import styles from "../styles/blog.module.css";
import Card from "react-bootstrap/Card";
import styles1 from "../styles/notes.module.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

function BlogPage({ auth, del }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useSWR(
    "https://notes-blog-backend.herokuapp.com/api/blogs",
    (url) => axios(url).then((r) => r.data)
  );
  if (del) {
    const { id } = location.state;
    const url = `https://notes-blog-backend.herokuapp.com/api/blogs/del/${id}`;
    axios.get(url).then(navigate("/")).then(window.location.reload());
  }

  return (
    <div>
      <div>
        <h2 className={styles.heading}>BLOGS</h2>
      </div>
      <div className={styles1.card_container}>
        {data &&
          data.map((blog, i) => {
            return (
              <div className={styles.card} key={i}>
                <Card
                  text="dark"
                  className="mb-5"
                  style={{
                    height: "14em",
                    backgroundColor: "rgb(102, 178, 255)",
                    width: "20rem",
                  }}
                >
                  <Card.Header style={{ color: "#0a1929", fontWeight: "bold" }}>
                    {blog.title}
                  </Card.Header>
                  <Card.Body style={{ backgroundColor: "rgb(102, 178, 255)" }}>
                    <Card.Text
                      style={{ backgroundColor: "rgb(102, 178, 255)" }}
                    >
                      {blog.content.substring(0, 130)}
                      <span style={{ backgroundColor: "rgb(102, 178, 255)" }}>
                        ...
                      </span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Link
                    style={{
                      paddingBottom: "10px",
                      paddingLeft: "10px",
                      backgroundColor: "rgb(102, 178, 255)",
                    }}
                    className={styles1.link}
                  >
                    <Link
                      to={"/" + blog._id}
                      style={{
                        backgroundColor: "rgb(102, 178, 255)",
                        textDecoration: "none",
                        color: "blue",
                      }}
                      state={{ id: blog._id }}
                    >
                      Read More
                    </Link>
                    {auth ? (
                      <span>
                        <Link
                          to={"/blogs/del/" + blog._id}
                          state={{ id: blog._id }}
                        >
                          <AiFillDelete className={styles.icon} />
                        </Link>
                        <Link
                          to={"/blogs/update/" + blog._id}
                          state={{
                            titlee: blog.title,
                            contentt: blog.content,
                            id: blog._id,
                          }}
                        >
                          <GrUpdate className={styles.icon} />
                        </Link>
                      </span>
                    ) : null}
                  </Card.Link>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BlogPage;
