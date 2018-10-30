import React, { PureComponent } from 'react';
import '../styles/ResultsTable.css';
import ResultRow from '../components/ResultRow';

export default class ResultsTable extends PureComponent {
  render() {
    return (
        <table className="results-table">
          <tbody>
            {this.props.results.map((result, i) => { return <ResultRow result={result} key={i}/>; })}
          </tbody>
        </table>
    );
  }
}

