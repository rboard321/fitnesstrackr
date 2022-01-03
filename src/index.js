import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Routines from './components/Routines'


const App = () => {
  const [routines, setRoutines] = useState([]);
  console.log(routines)
  
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
        exact path="api/routines"
          element={
            <Routines
              setRoutines={setRoutines}
              routines={routines}
            />
          }/>
    


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
