import React, { useState } from "react";
import ReactDOM from "react-dom";

import firebase from "./Firebase";

// import "./style.css";
export default function Login(props) {
  const [name, setname] = useState('');
  const [pass, setpass] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];


  const handleSubmit = (event) => {

    const ref = firebase.firestore().collection('users').where('name', "==", name);
    ref.onSnapshot((value) => {
      console.log(value.docs.length);
      value.docs.forEach((item) => {
        localStorage.setItem('userId', JSON.stringify(item.data().userId));
        localStorage.setItem('userDetails', JSON.stringify(item.data()));
        props.setData();
        console.log("++++2++++", item.data().userId)
      })
    })
    // ref.get().then(querySnapshot => {
    //     const docData = querySnapshot.data();
    //     // setData(docData);
    //    console.log(docData);
    // })


    event.preventDefault();

  };
  return (
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
          name="pass"  onChange={(text) => setpass(text)} required />
        </div>
        <button type="submit" className="LoginBtn">Login</button>
      </div>
    </form>
  );
}