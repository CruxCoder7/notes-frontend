import { useState } from "react";
import PrivateRoutes from "./PrivateRoutes";
import Notes from "./components/Notes";
import LoginForm from "./components/LoginForm";
import BlogPage from "./components/BlogPage";
import Compose from "./components/Compose";
import Navvbar from "./components/Navvbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import AddNotes from "./components/AddNotes";

function App() {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") || false
  );

  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const Login = (token) => {
    if (token) {
      setauthenticated(true);
      setToken(token);
      localStorage.setItem("authenticated", token);
      navigate("/compose/blogs");
    } else {
      setErr("Invalid Credentials!");
    }
  };

  const Logout = () => {
    localStorage.removeItem("authenticated");
    setauthenticated(false);
    navigate("/");
  };

  return (
    <>
      <Navvbar auth={authenticated}></Navvbar>
      <Routes>
        <Route path="/" element={<BlogPage auth={authenticated} />}></Route>
        <Route path="/notes" element={<Notes auth={authenticated} />}></Route>
        <Route
          path="/admin"
          element={<LoginForm login={Login} err={err} setErr={setErr} />}
        ></Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/compose/blogs" element={<Compose logout={Logout} />} />
          <Route path="/compose/notes" element={<AddNotes logout={Logout} />} />
        </Route>
        <Route path="/blogs/:id" element={<Blog />}></Route>
        <Route
          path="/blogs/del/:id"
          element={<BlogPage auth={authenticated} del={true} />}
        ></Route>
        <Route
          path="/notes/del/:id"
          element={<Notes auth={authenticated} del={true} />}
        ></Route>
        <Route
          path="/blogs/update/:id"
          element={<Compose update={true} logout={Logout} />}
        ></Route>
        <Route
          path="/notes/update/:id"
          element={<AddNotes update={true} logout={Logout} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
