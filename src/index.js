import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import Routines from './components/Routines';
import Login from './components/Login';
import Activities from './components/Activities';
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState();
  
  
  return(
      <>
      <header>
        <h1 className="headerTitle">Fitness Trac.kr</h1>
        <Link to="/">Home</Link> |{" "}
        <Link to="api/routines">Routines</Link> |{" "}
        <Link to="api/myroutines">My Routines</Link> |{" "}
        <Link to="api/activities">Activities</Link> 

      </header>
    <Routes>
        <Route 
        path="/"
        element={
          <Homepage/>
        }
        />
        <Route
        path="api/users/:method"
        element={
          <Login
          setToken={setToken}
          />
        }
        />
        <Route 
        exact path="api/routines"
          element={
            <Routines
              setRoutines={setRoutines}
              routines={routines}
              token={token}
              settoken={setToken}
            />
          }/>
          <Route 
        exact path="api/activities"
          element={
            <Activities
              setActivities={setActivities}
              activities={activities}
              token={token}
              settoken={setToken}
            />
          }/>
          <Route
          exact path="api/"
          />
    


    </Routes>

      </>
  )
}

ReactDOM.render(
<Router>
<App />
</Router>    
, 
document.getElementById("app"))
