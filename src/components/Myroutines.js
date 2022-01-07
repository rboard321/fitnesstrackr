import React, { useEffect, useState } from "react";
import { callApi } from "../utils";
import { Link } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

const Myroutines = ({
  userId,
  activities,
  setMyRoutines,
  MyRoutines,
  token,
  setToken,
  loggedIn,
}) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [routineId, setRoutineId] = useState();
  const [activityId, setActivityId] = useState();
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();
  const [activityFields, setActivityFields] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  console.log("activityFields>>>>", activityFields);
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
    try {
      const resp = await fetch(`${REACT_APP_API_URL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
          isPublic: null,
        }),
      });
      const routine = await resp.json();

      console.log("created routine>>", routine);
    } catch (error) {
      console.error(error);
    }
  };

  const addActivities = async () => {
    try {
      const resp = await fetch(
        `${REACT_APP_API_URL}/routines/${routineId}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activityId: activityId,
            count: count,
            duration: duration,
          }),
        }
      );
      const activityToAdd = await resp.json();

      console.log("created routine>>", activityToAdd);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="title">My Routines</h1>
      {loggedIn ? (
        <form
          onSubmit={async (event) => {
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
          <input type="checkbox" onChange={() => setIsPublic(true)} />
          Public
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {MyRoutines.map((routine) =>
        userId === routine.creatorId ? (
          <div className="routine" key={routine.id}>
            <h2>{routine.name}</h2>
            <h4>{routine.goal}</h4>
            <h5>Creator: {routine.creatorName}</h5>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setActivityFields(true);
                setRoutineId(routine.id);
              }}
            >
              <button>Add Activity</button>

              <select
                className="activity"
                className={`${activityFields}`}
                onClick={(event) => setActivityId(activity.id)}
              >
                {activities.map((activity) => (
                  <option key={activity.id}>{activity.name}</option>
                ))}
              </select>

              <input
                type="text"
                value="count"
                className={`${activityFields}`}
                onChange={(event) => setCount(event.target.value)}
              />
              <input
                type="text"
                value="duration"
                className={`${activityFields}`}
                onChange={(event) => setDuration(event.target.value)}
              />
              <input
                type="submit"
                value="submit"
                className={`${activityFields}`}
              />

              <button>Delete</button>
            </form>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                addActivities();
                setActivityId(activity.id);
              }}
            ></form>

            <h2>Activities:</h2>
            {routine.activities.map((activity) => (
              <div className="activity" key={activity.id}>
                <h3>{activity.name}</h3>
                <h4>Description: {activity.description}</h4>
                <h4>Count: {activity.count}</h4>
                <h4>Duration: {activity.duration}</h4>
                <form>
                  <button>Edit</button>
                  <button>Remove</button>
                </form>
              </div>
            ))}
          </div>
        ) : null
      )}
    </>
  );
};

export default Myroutines;
