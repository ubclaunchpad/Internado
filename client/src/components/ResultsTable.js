import React from 'react';
import { connect } from 'react-redux';
import ResultRow from './ResultRow';

export default class ResultsTable extends React.Component {
  render() {
    
    return(
      <table className="results-table">
        <tbody>
          {this.props.results.map((result, i) => { return <ResultRow result={result} key={i}/>; })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    results: state.postingsReducer.postings
  }
}

const mapDispatchToProps = dispatch => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ResultsTable)