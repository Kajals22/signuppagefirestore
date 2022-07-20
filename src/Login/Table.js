import React, { useState, useEffect } from "react";
import Login from "./login";
import Output from "./Output";
import { Navigate, useNavigate } from 'react-router-dom';

const Table = () => {
  const [btn, setBtn] = useState(true)
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(false)
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
 return (
    <>{show ? <Login /> : <Output />}
      {/* <button onClick={updateUser} s>show</button> */}
    </>
  )
}
export default Table