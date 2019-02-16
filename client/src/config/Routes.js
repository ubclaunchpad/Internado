import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { array, func } from 'prop-types';
import Home from '../views/Home';
import JobsContent from '../components/JobsContent';

const propTypes = {
  selectedCategories: array.isRequired,
  selectedIndustries: array.isRequired,
  handleAddCategory: func.isRequired,
  handleAddIndustry: func.isRequired,
  handleRemoveCategory: func.isRequired,
  handleRemoveIndustry: func.isRequired,
};

const Routes = (props) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/results" exact render={() => <JobsContent {...props} />} />
  </Switch>
);

Routes.propTypes = propTypes;

export default Routes;
