import React, { Component } from 'react';
import '../css/App.css';

class Result {
    constructor(title, description, location) {
    this.title = title;
    this.description = description;
    this.location = location;
  }
}

class ResultsTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
        results: null,
      }
  }

  addResult(result) {
    this.state.results.push(result);
  }

  render() {
    return (
        <h1>Table here</h1>
      );
  }
}

export {
  ResultsTable,
  Result
}
