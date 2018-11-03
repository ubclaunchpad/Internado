import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import ResultsTable  from "../containers/ResultsTable";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component = {ResultsTable} />
    </Switch>;