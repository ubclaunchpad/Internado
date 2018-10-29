import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./js/Home";
import { ResultsTable, Result }  from "./js/ResultsTable";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component = {ResultsTable} />
    </Switch>;