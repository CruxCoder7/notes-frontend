import { Navigate, Outlet } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const PrivateRoutes = (props) => {
  const [tryy, setTryy] = useState("");
  const check = (new_token) => {
    try {
      const url =
        "https://abdullahsheriff-backend.netlify.app/.netlify/functions/verify";
      axios
        .post(url, { token: new_token })
        .then((response) => {
          console.log(response.data);
          setTryy(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  if (props?.token === localStorage.getItem("authenticated")) {
    return <Outlet />;
  }
  if ("authenticated" in localStorage) {
    check(localStorage.getItem("authenticated"));
    if (tryy === "success") {
      return <Outlet />;
    }
  } else return <Navigate to="/admin" />;
};

export default PrivateRoutes;
