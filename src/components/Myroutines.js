import React, { useEffect, useState } from "react";
import { callApi } from "../utils";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

const Myroutines = ({ userId, setMyRoutines, MyRoutines, token, setToken, loggedIn }) => {
    const [routineName, setRoutineName] = useState("");
    const [routineGoal, setRoutineGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const fetchRoutines = async () => {
    const resp = await fetch(`${REACT_APP_API_URL}/routines`);
    const data = await resp.json();
    if (data) {
      setMyRoutines(data);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, [token]);

  const createRoutine = async () => {
      console.log(localStorage.getItem("token"))
      try {
        console.log(routineName)
        console.log(routineGoal)
      const resp = await fetch(`${REACT_APP_API_URL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: `${routineName}`,
          goal: `${routineGoal}`,
          isPublic: null
        }),
      });

      console.log("created routine>>", resp);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <h1 className="title">My Routines</h1>
      {loggedIn ? (
        <form
          onClick={async (event) => {
            event.preventDefault();
            createRoutine();
          }}
        >
          <input
            type="text"
            placeholder="name"
            value={routineName}
            onChange={(event) => setRoutineName(event.target.value)}
          ></input>
          <input
            type="text"
            placeholder="goal"
            value={routineGoal}
            onChange={(event) => setRoutineGoal(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {MyRoutines.map((routine) => 
          userId === routine.creatorId ? (
        <div className="routine" key={routine.id}>
          <h2>{routine.name}</h2>
          <h4>{routine.goal}</h4>
          <h5>Creator: {routine.creatorName}</h5>

          <h2>Activities:</h2>
          {routine.activities.map((activity) => (
            <div className="activity" key={activity.id}>
              <h3>{activity.name}</h3>
              <h4>Description: {activity.description}</h4>
              <h4>Count: {activity.count}</h4>
              <h4>Duration: {activity.duration}</h4>
            </div>
          ))}
        </div>
      ) : null
      )}
    </>
  );
};

export default Myroutines;
