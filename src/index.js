import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Routines from "./components/Routines";
import Myroutines from "./components/Myroutines";
import Login from "./components/Login";
import Activities from "./components/Activities";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [MyRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState();
  const [loggedIn, setLoggedin] = useState(false);
  const [userId, setUserId] = useState("");

  let navigate = useNavigate();

  return (
    <>
      <header>
        <h1 className="headerTitle">Fitness Trac.kr</h1>
        <Link className={"title"} to="/">Home</Link> 
        <Link to="api/routines">Routines</Link>{" "}
        {loggedIn ? <Link to="api/myroutines">My Routines</Link> : null}
        {loggedIn ? " " : null}
        <Link to="api/activities">Activities</Link>{" "}
        <Link className={token ? "ifLoggedOut" : ""}to="api/users/login">Login/Register</Link>
        <button
          className={token ? "" : "ifLoggedOut"}
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedin(false);
            navigate("/");
            window.location.reload(false); 
          }}
        >Log Out</button>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="api/users/:method"
          element={
            <Login
              setToken={setToken}
              setLoggedin={setLoggedin}
              loggedIn={loggedIn}
              setUserId={setUserId}
            />
          }
        />
        <Route
          exact
          path="api/routines"
          element={
            <Routines
              setRoutines={setRoutines}
              routines={routines}
              token={token}
              settoken={setToken}
            />
          }
        />
        <Route
          exact
          path="api/activities"
          element={
            <Activities
              setActivities={setActivities}
              activities={activities}
              token={token}
              settoken={setToken}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="api/myroutines"
          element={
            <Myroutines
              setMyRoutines={setMyRoutines}
              activities={activities}
              MyRoutines={MyRoutines}
              token={token}
              settoken={setToken}
              userId={userId}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
