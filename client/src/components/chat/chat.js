import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ReactScrollableFeed from "react-scrollable-feed";
import "./chat.scss";
let socket;
const CONNECTION = "localhost:8080/";
const Chat = ({ props }) => {
  console.log(props);
  console.log();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [messages, setMessages] = useState([]);

  console.log(userInfo.room);
  useEffect(() => {
    socket = io(CONNECTION);
  }, [CONNECTION]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, []);

  const roomConnection = () => {
    setIsloggedIn(true);
    socket.emit("join", userInfo.room);
  };
  const sendMessage = async () => {
    let messageContent = {
      room: userInfo.room,
      content: {
        username: userInfo.username,
        message: message,
        owner: userInfo, // gets user's info
      },
    };

    // send message

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
  };

  //receive message

  const getMessage = async () => {
    const response = await fetch("http://localhost:8080/message");
    const messages = await response.json();

    setMessages(messages);
  };
  useEffect(() => {
    getMessage();
  }, []);
  // get user's profile
  const authToken = sessionStorage.getItem("authToken");

  const reqOptions = {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  };
  const getProfile = async () => {
    const response = await fetch(
      "http://localhost:8080/user/profile",
      reqOptions
    );

    const userInfo = await response.json();

    setUserInfo(userInfo);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="logIn">
          <div className="inputs"></div>
          <button onClick={roomConnection}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <ReactScrollableFeed>
            <div className="messages">
              {messages.map((msg) => {
                console.log(msg);
                return (
                  <div
                    className="messageContainer"
                    id={msg.username == userInfo.username ? "You" : "Other"}
                  >
                    <div className="messageIndividual" key={msg.id}>
                      {msg.username}: {msg.message}
                    </div>
                  </div>
                );
              })}
              {messageList.map((val) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.username == userInfo.username ? "You" : "Other"}
                  >
                    <div className="messageIndividual" key={val.id}>
                      {val.username}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </ReactScrollableFeed>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chat;
