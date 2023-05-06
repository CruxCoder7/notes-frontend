import React from "react";
import axios from "axios";
import styles from "../styles/blog.module.css";
import useSWR from "swr";

function Blog() {
  const url = window.location.href
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  const { data } = useSWR(
    `https://abdullahsheriff-backend.netlify.app/.netlify/functions/getSingleBlog/${id}`,
    (url) => axios(url).then((r) => r.data)
  );
  return (
    <>
      <div>
        {data && (
          <div>
            <head>BLOG</head>
            <h2 className={styles.heading}>{data && data[0].title}</h2>
            <div className={styles.container}>
              <div className={styles.content}>{data && data[0].content}</div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Blog;
