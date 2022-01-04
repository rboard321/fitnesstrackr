import React, { useState } from "react";

const { REACT_APP_API_URL = "https://fitnesstrac-kr.herokuapp.com/api" } =
  process.env;

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
console.log("username>>>>>",username)
  return (
    <>
      <h1>Login/Register</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const resp = await fetch(`${REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username,
                password,
              },
            }),
          }).catch(console.error);
          const respObj = await resp.json();
          setToken(respObj.data.token);
        }}
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="confirm password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;
