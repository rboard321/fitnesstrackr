import React, { useEffect, useState } from "react";
import { callApi } from "../utils";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL = 'https://fitnesstrac-kr.herokuapp.com/api'} = process.env

const Homepage = () => {


return (
    <>
    <h1>Homepage</h1>
    </>
)    

}


export default Homepage;