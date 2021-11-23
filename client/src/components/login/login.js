import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "../chat/chat";
import "./login.scss";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  // register
  const data = { username, password, email, room };
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const signUp = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/register", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("authToken", res.authToken);
      });

    setUsername("");
    setPassword("");
    setEmail("");
    alert("Congrats.you are now register!");
  };
  //login
  const loginData = { email, password, room };
  const requestOptionsLogin = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(loginData),
  };
  const logIn = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/login", requestOptionsLogin)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("authToken", res.authToken);
      });
    alert("redirecting...");
    setEmail("");
    setPassword("");
    window.location.reload();
    return false;
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken && authToken !== "undefined") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {!isLoggedIn && (
        <div className="main_login-wrapper">
          <div className="login-wrap">
            <div className="login-html">
              <input id="tab-1" type="radio" name="tab" className="sign-in" />
              <label for="tab-1" className="tab">
                Sign In
              </label>
              <input id="tab-2" type="radio" name="tab" className="sign-up" />
              <label for="tab-2" className="tab">
                Sign Up
              </label>
              <div className="login-form">
                <div className="sign-in-htm">
                  <div className="group">
                    <label for="user" className="label">
                      Email
                    </label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label for="pass" className="label">
                      Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      //data-type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label for="room" className="label">
                      Room
                    </label>
                    <input
                      id="room"
                      type="room"
                      className="input"
                      //data-type="password"
                      name="room"
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <input id="check" type="checkbox" className="check" />
                    <label for="check">
                      <span className="icon"></span> Keep me Signed in
                    </label>
                  </div>
                  <div className="group">
                    <Link to="/chat">
                      <input
                        type="submit"
                        className="button"
                        value="Sign In"
                        onClick={logIn}
                      />
                    </Link>
                  </div>
                  <div className="hr"></div>
                  <div className="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </div>
                <div className="sign-up-htm">
                  <div className="group">
                    <label for="user" className="label">
                      Username
                    </label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label for="pass" className="label">
                      Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      //data-type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label for="pass" className="label">
                      Email Address
                    </label>
                    <input
                      id="pass"
                      type="text"
                      className="input"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label for="room" className="label">
                      Room
                    </label>
                    <input
                      id="room"
                      type="room"
                      className="input"
                      //data-type="password"
                      name="room"
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <input
                      onClick={signUp}
                      type="submit"
                      className="button"
                      value="Sign Up"
                    />
                  </div>
                  <div className="hr"></div>
                  <div className="foot-lnk">
                    <label for="tab-1">Already Member?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && <Chat />}
    </div>
  );
};
export default Login;
