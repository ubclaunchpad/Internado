import React from 'react';
import store from '../store.js';
import { Container, Grid } from 'semantic-ui-react';
import ResultRow  from './ResultRow';

export default class ResultsTable extends React.Component {
  render() {
    return(
      <Container>
        <Grid centered padded>
          {store.searchResults.map((result, i) => { return <ResultRow result={result} key={i}/>; })}
        </Grid>
      </Container>
    );
  }
}