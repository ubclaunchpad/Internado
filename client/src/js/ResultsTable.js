import React, { Component } from 'react';
import '../css/App.css';

class Result {
    constructor(title, description, location, url) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.url = url;
  }
}

class ResultsTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
        results: props.results,
      }
  }

  handleClick(url) {
    window.open(url, "_blank");
  }

  renderResult(result) {
    return (
      <tr onClick={()=>this.handleClick(result.url)} class="table-row" paddingTop="10px">
        <td align="left" class="table-cell-1 table-cell"> <h5> {result.title} </h5>  {result.description} </td>
        <td class="table-cell-2 table-cell"> <h5><br /></h5> {result.location} </td>
        <td class="table-cell-3 table-cell"> <h5><br /></h5> &gt; </td>
      </tr>
    );
  }
  render() {
    var rows = [];
    for (var i = 0; i < this.state.results.length; i++) {
      rows.push(this.renderResult(this.state.results[i]));
      rows.push(<br/>)
    }
    return (
        <table>
          {rows}
        </table>
      );
  }
}

export {
  ResultsTable,
  Result
}
