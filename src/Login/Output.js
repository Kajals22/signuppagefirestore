import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import firebase from "../Firebase";
import "./Output.css";
const Output = () => {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [userId, setUserId] = useState('');
    const [alluser, setalluser] = useState([]);
    const [toname, setToname] = useState('');
    const [messages, setMessages] = useState('');
    const [allmsg, setallmsg] = useState([]);
    useEffect(() => {
        var b = localStorage.getItem("Name");
     
        setData(b);
        // console.log(b, "//////////////////////////name")
        firebase.firestore().collection("user_response").onSnapshot((snapshot) => {
            var data = [];
            // console.log(data, "======>>>>>data")
            snapshot.docs.map((doc) => {
                data.push({
                    id: doc.id,
                    uname: doc.data().name,
                    userId:doc.data().userId,
 })
               console.log('===first id',doc.data().userId);



            })
            var value = localStorage.getItem('user');
            console.log(value, "++++++++++++++++++++++userlist22")

            let user = data.find((elm) => elm.uname == value)
            if (user) {
                setToname(user.uname)
            }
            setalluser(data);
            console.log(data, "+++++++++++++userlist")

        });

        firebase.firestore().collection("message").onSnapshot((snapshot) => {
            var msg = [];
            console.log(msg, "++++++++data")

            snapshot.docs.map((doc) => {
                msg.push({
                    id: doc.id,
                    data: doc.data(),
                })

            });
            setallmsg(msg)
            console.log({ setallmsg });
        });

    }, []);
    function logOut() {

        localStorage.removeItem("Name");
        setData("");
        setUserId("");
        navigate('/login');
    }
    function handleClick(value) {
        console.log(value, "+++++++++value");
        setToname(value.uname);
        localStorage.setItem('user', (value.uname));
        localStorage.setItem('usertoID', (value.userId));
        console.log("-----------------**********USERnamemmm", (value.uname))
        console.log("-----------------**********USERTOid", (value.userId))
    }

    const send = (e) => {
        e.preventDefault();
        var id = localStorage.getItem("userId")
        // console.log(id, "++++++++++++++++++++++userrrrrrrrrrrrriddddddd")
        var user_Id1 = localStorage.getItem("usertoID");

        firebase.firestore().collection("message").add({
            userId: id,
            text: messages,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            from: user_Id1,
            // to: userto,
            // type: type
        });

        setMessages("");
        console.log("++++++++++++++++send")
        // .catch((error) => alert(error));
    };



    return (
        <>



            <div className="container clearfix">
                <div className="people-list" id="people-list">
                    <div className="search clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
                        <div className="chat-with"> {data} </div>
                        <i class="fa fa-sign-out icon" onClick={() => { logOut() }}></i>
                    </div>





                    <ul className="list">

                        {/* {console.log('santos', alluser)} */}
                        {alluser.map((user) => (
                            <li className="clearfix" >
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" /> 
                                <div className="about" key={user.id}
                                    // onClick={()=>alert()}
                                    onClick={() => { handleClick(user) }}
                                >
                                    {/* {console.log(user.id,"++++++++++++++++++id")} */}
                                    <div className="name">{user.uname}</div>
                                    <div className="status">


                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                        <div className="chat-about">
                            <div className="chat-with">{toname}</div>
                        </div>
                    </div>
                    <div className="chat-history">
                        <ul >
                            {allmsg?.map(({ id, data }) => (

                                <>
                                    {data.from == userId ?
                                        <li>


                                            <div className="message my-message">
                                                {data.text}
                                            </div>
                                        </li>
                                        :
                                        <li className="clearfix" key={id}>


                                            <div className="message other-msg ">
                                                {data.text}
                                            </div>
                                        </li>
                                    }

                                </>




                            ))}
                        </ul>

                        {/* {
                            allmsg.map((msg, id) => {
                                {console.log(msg)}
                                return (
                                    <>
                                        <ul>
                                            <li className="clearfix">
                                                <div className="message-data align-right">
                                                </div>
                                                <div className="message other-message float-right">
                                                    {msg.text}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="message-data">
                                                </div>
                                                <div className="message my-message">
                                                    {msg.text}
                                                </div>
                                            </li>
                                        </ul>
                                    </>
                                )
                            })
                        } */}

                    </div>
                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"
                            value={messages} onChange={(e) => setMessages(e.target.value)}></textarea>
                        <button onClick={send}>Send</button>
                    </div>
                </div>
            </div>








            {/* <h1>{data}</h1>
            <div className="container mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>

                    </thead>
                </table>
                <button type="submit" onClick={() => { logOut() }}>Log Out</button>
            </div> */}

            <Outlet />


        </>
    )
}
export default Output