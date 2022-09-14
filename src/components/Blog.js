import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/blog.module.css";

function Blog() {
  const location = useLocation();
  const { id } = location.state;
  const [blog, setBlog] = useState([]);
  console.log();
  useEffect(() => {
    const url = `https://notes-blog-backend.herokuapp.com/api/blogs/${id}`;
    axios.get(url).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  return (
    <div>
      <h2 className={styles.heading}>{blog.title}</h2>
      <div className={styles.container}>
        <div className={styles.content}>{blog.content}</div>
      </div>
    </div>
  );
}

export default Blog;
