import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/SignUp";
import Account from "../views/AccountSettings";
import ResultsTable  from "../components/ResultsTable";

export default class Routes extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component={ResultsTable} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/account" exact component={Account} />
      </Switch>
    );
  }
}