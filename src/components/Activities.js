import React, { useEffect, useState } from "react";
import { callApi } from "../utils";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL} =
  process.env;

const Activities = ({ setActivities, activities, token, setToken }) => {
  const fetchActivities = async () => {
    const resp = await fetch(`${REACT_APP_API_URL}/activities`);
    const data = await resp.json();
    if (data) {
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [token]);

  

  return (
    <>
      <h1 className="title">Activities</h1>
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
