import React, { Component } from 'react';
import '../css/App.css';


class Result {
    constructor(title, description, excerpt, location, postUrl, applyUrl) {
    this.title = title;
    this.description = description;
    this.excerpt = excerpt;
    this.location = location;
    this.postUrl = postUrl;
    this.applyUrl = applyUrl;
    this.selected = false;
    this.i = 0;
  }
}

class ResultsTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
        results: props.results,
      }
  }

  handleClick(action, result) {
    switch (action) {
      case 0: // Clicked on row to select/deselect
        result.selected = !result.selected;
        this.setState({
            results: this.state.results,
          }); // result.selected = !result.selected
        break;
      case 1: // Clicked on original post
        window.open(result.postUrl, '_blank');
        break;
      case 2: // Clicked on apply
        window.open(result.applyUrl);
        break;
    }
  }

  renderResult(result) {
    let text = result.selected ? result.description : result.excerpt; // If selected, show description, otherwise, show excerpt
    let desc = <p class="table-result-desc"> {text} </p>; // Description/excerpt
    let arrow = ">";
    let originalPosting = "";
    let applyButton = "";
    let location = result.location;
    if (result.selected) {
      location = ""; // Hide things that shouldnt be shown when selected, show things that should be shown
      arrow = "";
      originalPosting = <a class="table-post clickable" onClick={()=>this.handleClick(1, result)}><br/> Original Posting</a>;
      applyButton = <button class="table-button clickable" onClick={()=>this.handleClick(2, result)}>Apply</button>;
    }
    return (
      <tr onClick={()=>this.handleClick(0, result)} class="table-row" paddingTop="10px">
        <td align="left" class="table-cell-1 table-cell"> <h5 class="table-result-title"> {result.title} </h5>  {desc} </td>
        <td class="table-cell-2 table-cell" align="right">  <p class="table-result-location">{location}</p> {originalPosting} </td>
        <td class="table-cell-3 table-cell">  <p class="table-arrow">{arrow}{applyButton}</p> </td>
      </tr>
    );
  }

  render() {
    var rows = [];
    for (var i = 0; i < this.state.results.length; i++) {
      this.state.results[i].i = i;  // Make i available from the result object
      rows.push(this.renderResult(this.state.results[i])); // Render each row
    }
    return (
        <table class="results-table">
          {rows}
        </table>
      );
  }
}

export {
  ResultsTable,
  Result
}
