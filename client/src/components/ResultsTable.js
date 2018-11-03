//import React, { PureComponent } from 'react';
import ResultRow from './ResultRow';
import ResultData from './ResultData'

const ResultsTable = ({ results }) => (
  <table className="results-table">
    <tbody>
      {results.map((result, i) => { return <ResultRow result={result} key={i}/>; })}
    </tbody>
  </table>
)

ResultsTable.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.instanceOf(ResultData)
  ).isRequired
}

export default ResultsTable