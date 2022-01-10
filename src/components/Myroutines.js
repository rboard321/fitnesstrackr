import React, { useEffect, useState } from "react";

const APIURL = `https://fitnesstrac-kr.herokuapp.com/api`
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
  const [editingActivity, setEditingActivity] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [editRoutineName, setEditRoutineName] = useState("");
  const [editRoutineGoal, setEditRoutineGoal] = useState("");

  const fetchRoutines = async () => {
    const resp = await fetch(`${APIURL}/routines`);
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
      const resp = await fetch(`${APIURL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
          isPublic: isPublic,
        }),
      });
      const routine = await resp.json();

      fetchRoutines();
    } catch (error) {
      console.error(error);
    }
  };

  const addActivities = async () => {
    try {
      const resp = await fetch(
        `${APIURL}/routines/${routineId}/activities`,
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
      fetchRoutines();
      setActivityFields(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEditRoutine = async (routineId) => {
    console.log(editRoutineName)
    console.log(editRoutineGoal)
    try {
      const resp = await fetch(
        `${APIURL}/routines/${routineId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: editRoutineName,
            goal: editRoutineGoal
          }),
        }
      );
      const data = await resp.json()
      console.log(data)
      fetchRoutines()
  } catch(error){
    console.error(error)
  }
};

  const handleDeleteRoutine = async (routineId) => {
    console.log(routineId);
    try {
      const resp = await fetch(`${APIURL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchRoutines();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditActivity = async (routineActivityId) => {
    try {
      const resp = await fetch(
        `${APIURL}/routine_activities/${routineActivityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            count: count,
            duration: duration,
          }),
        }
      );

      fetchRoutines();
      setEditingActivity(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteActivity = async (routineActivityId) => {
    try {
      const resp = await fetch(
        `${APIURL}/routine_activities/${routineActivityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchRoutines();
    } catch (error) {
      console.error(error);
    }
  };

  function handleAddActivity(routine) {
    setActivityFields(true);
    setRoutineId(routine);
  }

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
            <button
              value={routine.id}
              onClick={(event) => handleDeleteRoutine(event.target.value)}
            >
              Delete Routine
            </button>
            
              <button
                
                onClick={
                  (() => setActivityFields(true))
                }
              >
                Edit Routine
              </button>
              <input
                type="text"
                placeholder="name"
                className={`${activityFields}`}
                onChange={(event) => setEditRoutineName(event.target.value)}
              />
              <input
                type="text"
                placeholder="goal"
                className={`${activityFields}`}
                onChange={(event) => setEditRoutineGoal(event.target.value)}
              />
              <button onClick={() => handleEditRoutine(routine.id)}>
                Submit
              </button>
            
            <button
              value={routine.id}
              onClick={() => {
                handleAddActivity(routine.id);
              }}
            >
              Add Activity
            </button>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                addActivities();
                fetchRoutines();
              }}
            >
              <select
                className="activity"
                className={`${activityFields}`}
                onChange={(event) => setActivityId(event.target.value)}
              >
                {activities.map((activity) => (
                  <option value={activity.id} key={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="count"
                className={`${activityFields}`}
                onChange={(event) => setCount(event.target.value)}
              />
              <input
                type="text"
                placeholder="duration"
                className={`${activityFields}`}
                onChange={(event) => setDuration(event.target.value)}
              />

              <button value="submit" className={`${activityFields}`}>
                Submit
              </button>
            </form>

            <h2>Activities:</h2>
            {routine.activities.map((activity) => {
              return (
                <div className="activity" key={activity.id}>
                  <h3>{activity.name}</h3>
                  <h4>Description: {activity.description}</h4>
                  <h4>Count: {activity.count}</h4>
                  <h4>Duration: {activity.duration}</h4>
                  <form>
                    <input
                      type="text"
                      placeholder="count"
                      className={`${editingActivity}`}
                      onChange={(event) => setCount(event.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="duration"
                      className={`${editingActivity}`}
                      onChange={(event) => setDuration(event.target.value)}
                    />
                    <button
                      className={`${editingActivity}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleEditActivity(activity.routineActivityId);
                      }}
                    >
                      Submit
                    </button>
                    <button
                      value={activity.routineActivityId}
                      onClick={(event) => {
                        event.preventDefault();
                        setEditingActivity(true);
                      }}
                    >
                      Edit Activity
                    </button>
                    <button
                      value={activity.routineActivityId}
                      onClick={(event) => {
                        event.preventDefault(),
                          handleDeleteActivity(event.target.value);
                      }}
                    >
                      Remove Activity
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        ) : null
      )}
    </>
  );
};

export default Myroutines;
