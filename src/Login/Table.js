import React, { useState, useEffect } from "react";
import Login from "./login";
import Output from "./Output";
import { Navigate, useNavigate } from 'react-router-dom';

const Table = (props) => {
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    var b = localStorage.getItem("Name");
    console.log(b);
    if (b == null) {

      setShow(true);
      console.log("b====== login")
    } else {

      setShow(false);
      console.log("b====== output")
    }
  }, []);
  function updateUser() {
    //setislogin(true);
    const items = JSON.parse(localStorage.getItem('userId'));
    if (items) {
      setUserId(items);
      console.log(items,"++++++++++++++++++itemns")
      const userData = localStorage.getItem('userDetails');

      setUsername(userData.name);
    }
    // else {
    //     setislogin(false);
    // }
  }
  return (
    <>{show ? <Login setData={() => updateUser()} /> : <Output />}
      {/* <button onClick={updateUser} s>show</button> */}
    </>
  )
}
export default Table