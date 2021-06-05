import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Home"
import Login from "./Login"

//styles
import "../assets/styles/App.css";


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
