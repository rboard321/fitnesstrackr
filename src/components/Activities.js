import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const APIURL = `https://fitnesstrac-kr.herokuapp.com/api`
const { REACT_APP_API_URL } = process.env;

const Activities = ({ loggedIn, setActivities, activities, token }) => {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  
  let navigate = useNavigate()

  const fetchActivities = async () => {
    
    const resp = await fetch(`${APIURL}/activities`);
    const data = await resp.json();
    if (data) {
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [token]);

  const createActivity = async () => {
    console.log(activityDescription)
    try {
      const resp = await fetch(`${APIURL}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription
        }),
      });
      const activity = await resp.json();
      console.log(activity);
      fetchActivities();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="title">Activities</h1>
      {loggedIn ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            createActivity();
          }}
        >
          <input
            type="text"
            placeholder="name"
            value={activityName}
            onChange={(event) => setActivityName(event.target.value)}
          ></input>
          <input
            type="text"
            placeholder="description"
            value={activityDescription}
            onChange={(event) => setActivityDescription(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {activities.map((activity) => (
        <div className="activity" key={activity.id}>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
        </div>
      ))}
    </>
  );
};

export default Activities;
