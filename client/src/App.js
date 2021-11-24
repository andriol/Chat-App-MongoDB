import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
