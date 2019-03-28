import React from 'react';
import store from '../store.js';
import { Grid } from 'semantic-ui-react';
import ResultRow from './ResultRow';

const ResultsTable = () => (
  <Grid centered>
    {store.searchResults.map((result, i) => (
      <ResultRow result={result} key={i} />
    ))}
  </Grid>
);

export default ResultsTable;
