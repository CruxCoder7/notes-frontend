import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/blog.module.css";
import useSWR from "swr";

function Blog() {
  const location = useLocation();
  const { id } = location.state;
  const { data } = useSWR(
    `https://abdullahsheriff-backend.netlify.app/.netlify/functions/getSingleBlog/${id}`,
    (url) => axios(url).then((r) => r.data)
  );
  return (
    <div>
      <head>BLOG</head>
      <h2 className={styles.heading}>{data && data[0].title}</h2>
      <div className={styles.container}>
        <div className={styles.content}>{data && data[0].content}</div>
      </div>
    </div>
  );
}

export default Blog;
