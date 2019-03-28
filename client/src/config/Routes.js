import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { array, func, number } from 'prop-types';
import Home from '../views/Home';
import Login from "../views/Login";
import Signup from "../views/SignUp";
import Account from "../views/AccountSettings";
import JobsContent from '../components/JobsContent';

const propTypes = {
  selectedCategories: array.isRequired,
  selectedIndustries: array.isRequired,
  minSalary: number.isRequired,
  handleAddCategory: func.isRequired,
  handleAddIndustry: func.isRequired,
  handleRemoveCategory: func.isRequired,
  handleRemoveIndustry: func.isRequired,
  handleAddMinSalary: func.isRequired,
  handleRemoveMinSalary: func.isRequired,
  handleClearFilters: func.isRequired,

};

const Routes = (props) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/results" exact render={() => <JobsContent {...props} />} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/account" exact component={Account} />
  </Switch>
);

Routes.propTypes = propTypes;

export default Routes;
