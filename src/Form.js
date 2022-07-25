import React, { useState, useEffect } from "react";
import { useNavigate,Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from 'react-router-dom';
import './Signup.css'
// import {  Link } from "react-router-dom";
import firebase from "./Firebase";
import Login from "./Login/login";


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showlogin, setShowlogin] = useState(false);

 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let myuuid = uuidv4();
        firebase.firestore().collection("user_response").add({
            name: name,
            email: email,
            password: password,
            phone: phone,
            userId: myuuid,
        });
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        navigate('/login');

       
     };

    return (
        <>
            {/* {show ? */}
            <form name="custom_form" id="customForm" onSubmit={handleSubmit}>
                <div className="form_box">
                    <h1>Registration Form</h1>
                    <div className="input-row">
                        <input type="text" name="name" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
                        <span className="error">Please Enter Your Name</span>
                    </div>

                    <div className="input-row">
                        <input type="text" name="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <span className="error">Please Enter Your Email</span>
                    </div>
                    <div className="input-row">
                        <input type="text" name="phone" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span className="error">Please Enter Your password</span>
                    </div>
                    <div className="input-row">
                        <input type="text" name="phone" placeholder="Phone*" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <span className="error">Please Enter Your Phone</span>
                    </div>

                    <button type="submit" value="Submit" >SUBMIT</button>
                </div>
            </form>
            <Outlet />
        </>

    )

}
export default Signup



