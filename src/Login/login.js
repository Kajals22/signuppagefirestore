import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import "./style.css";
export default function Login(props) {
  const [name, setname] = useState('');
  const [pass, setpass] = useState('');


  const navigate = useNavigate();
  const handleSubmit = (event) => {

    const ref = firebase.firestore().collection('user_response').where('name', "==", name);
    ref.onSnapshot((value) => {
      console.log(value.docs.length);
      value.docs.forEach((item) => {
        localStorage.setItem('userId', (item.data().userId));
        localStorage.setItem('Name', (item.data().name));
        // props.setData();
        console.log("++++2++++id", item.data().userId)
        console.log("///////////////", item.data().name)
        navigate('/output')
      })
    })

    


    event.preventDefault();

  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   firebase.firestore().collection("user_response").where('name', '==', name).onSnapshot((snapshot) => {
  //     snapshot.docs.map(() => {
  //       var a = localStorage.setItem('Name', name);
  //     })
  //     setname("");
  //     setpass("");
  //     navigate('/output')
  //   })
  // }
  const Signup = () => {
    navigate('/form')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="containerLogin" >
          <label htmlFor="uname"><b>Username</b></label>
          <div className="input_text">
            <input type="text" placeholder="Enter Username"
              name="uname" onChange={(e) => setname(e.target.value)} required />
          </div>
          <label htmlFor="psw"><b>Password</b></label>
          <div className="input_password">
            <input type="password" placeholder="Enter Password"
              name="pass" onChange={(text) => setpass(text)} required />
          </div>
          <button type="submit" className="LoginBtn">Login</button>
          <p>Create a new Account <button onClick={Signup}><span>Sign Up</span></button></p>
        </div>

      </form>
      <Outlet />




    </>

  )
};


