import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import ResultsTable  from "../components/ResultsTable";

export default class Routes extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact render={ () => <ResultsTable results={this.props.results}/> } />
      </Switch>
    );
  }
}