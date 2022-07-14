// import React,{useState} from "react";
// import firebase from "./myFirebase";
// import Firebase from "./Firebase";
import "./Signup.css"
import { useState } from "react";
import firebase from "./Firebase";
// import { collection,addDoc } from "firebase/firestore/lite";
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [phone, setPhone] = useState("");
    const [customersData, setCustomersData] = useState([]);
    useEffect(() => {
        firebase.collection("user-respone").onSnapshot((snapshot) => {
          setCustomersData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
        console.log({ customersData });
      }, []);
    const sub = (e) => {
        e.preventDefault();

        // Add data to the store
        firebase.firestore().collection("user-respone").add({
            name: name,
            email: email,
            password: pass,
            phone: phone
        })
            .then((docRef) => {
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setName("");
        setPass("");
        setEmail("");
        setPhone("");
    }
    return (
        <>
            {/* <div className="container"> */}
            <form name="custom_form" id="customForm" action="valid.html" onSubmit={sub}
            >
                <div className="form_box">
                    <h1>Registration Form</h1>
                    <div class="input-row">
                        <input type="text" name="name" id="name" placeholder="Name*" onChange={(e) => { setName(e.target.value) }} />
                        <span className="error">Please Enter Your Name</span>
                    </div>

                    <div className="input-row">
                        <input type="text" name="email" id="email" placeholder="Email*" onChange={(e) => { setEmail(e.target.value) }} />
                        <span className="error">Please Enter Your Email</span>
                    </div>
                    <div className="input-row">
                        <input type="text" name="password" id="password" placeholder="Password*" onChange={(e) => { setPass(e.target.value) }} />
                        <span className="error">Please Enter Password</span>
                    </div>
                    <div className="input-row">
                        <input type="text" name="phone" id="phone" placeholder="Phone*" onChange={(e) => { setPhone(e.target.value) }} />
                        <span className="error">Please Enter Your Phone</span>
                    </div>
                    <input type="submit" value="Submit" name="" ></input>
                </div>
            </form>
            <div className="App__DataDisplay">
                <table>
                    <tr>
                        <th>NAME</th>
                        <th>PASSWORD</th>
                    </tr>

                    {customersData?.map(({ id, data }) => (
                        <tr key={id}>
                            <td>{data.name}</td>
                            <td>{data.password}</td>
                        </tr>
                    ))}
                </table>
            </div>
        {/* </div> */}
            {/* </div> */ }
        </>
    )

}
export default Signup