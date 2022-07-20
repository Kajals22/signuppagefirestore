import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import firebase from "../Firebase";
import "./Output.css";
const Output = () => {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [alluser, setalluser] = useState([]);
    const [toname, setToname] = useState('');
    const[message,setMessage]=useState([]);
    // useEffect(() => {
    //     var b = localStorage.getItem("Name");
    //     setData(b);
    //     firebase.firestore().collection("user-response").onSnapshot((snapshot) => {
    //         snapshot.docs.map((item) => {
    //             setalluser([item.data()])
    //             console.log([item.data()])
    //         })
    //     });
    // }, [alluser]);
    useEffect(() => {
        var b = localStorage.getItem("Name");
        setData(b);
        firebase.firestore().collection("user-response").onSnapshot((snapshot) => {
            var data = [];
            console.log(data,"++++++++data")
            snapshot.docs.map((doc) => {
                data.push({
                    id: doc.id,
                    uname: doc.data().name,
                })
               
            })
            setalluser(data);
            console.log(data,"+++++++++++++userlist")
         
        });
        firebase.firestore.collection("message").orderBy("createAT").onSnapshot((snapshot)=>{
            setMessage(snapshot.docs.map((doc)=>{
                doc.data()
                
                
      }))
           })

    }, []);
    // const messagesRef2 = firebase.firestore().collection('messages').orderBy('createdAt');

    // messagesRef2.onSnapshot((value) => {
    //     console.log(value.docs);
    //     var msgData = [];
    //     value.forEach((item) => {
    //         var msg = item.data();
    //         msg.id = item.id
    //         msgData.push(msg);

    //     })


    //     setallmsg(msgData);
    function logOut() {

        localStorage.removeItem("Name");
        setData("");
        navigate('/login');
    }
    function handleClick(value){
        // console.log(value,"+++++++++value");
        setToname(value.uname)
    }
    return (
        <>

            <div className="container clearfix">
                <div className="people-list" id="people-list">
                    <div className="search clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
                        <div className="chat-with"> {data} </div>
                    </div>

                    <ul className="list">
                    
                        {/* {console.log('santos', alluser)} */}
                        {alluser.map((user) => (
                            <li className="clearfix" >
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
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
                            {/* <div className="chat-num-messages">already 1 902 messages</div> */}
                        </div>
                        {/* {/* <i className="fa fa-star"></i> */}
                    </div>

                    <div className="chat-history">
                        <ul>
                            <li className="clearfix">
                                <div className="message-data align-right">
                                    {/* <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp; */}
                                    {/* {/* <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i> */}

                                </div>
                                <div className="message other-message float-right">
                                    Hi Vincent

                                </div>
                            </li>

                            <li>
                                <div className="message-data">
                                    {/* {/* <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span> */}
                                    {/* <span className="message-data-time">10:12 AM, Today</span> */}
                                </div>
                                <div className="message my-message">

                                    helo
                                </div>
                            </li>










                        </ul>

                    </div>

                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

                        {/* {/* <i className="fa fa-file-o"></i> */}
                        {/* {/* <i className="fa fa-file-image-o"></i> */}

                        <button>Send</button>

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