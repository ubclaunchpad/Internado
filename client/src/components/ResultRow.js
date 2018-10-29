import React, { Component } from 'react';

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  _handleClick = (action, result) => {
    switch (action) {
      case 'select': // Clicked on row to select/deselect
        this.setState({selected: !this.state.selected });
        break;
      case 'post': // Clicked on original post
        window.open(result.postUrl, '_blank');
        break;
      case 'apply': // Clicked on apply
        window.open(result.applyUrl);
        break;
      default: break;
    }
  };

  render() {
    console.log('no state:' + this.props.result.title);
    console.log('rendered');
    const generateKey = (pre) => {
      return `${pre}_${new Date().getTime()}`;
    };
    let text = this.state.selected ? this.props.result.description : this.props.result.excerpt; // If selected, show description, otherwise, show excerpt
    let desc = <p className="table-result-desc"> {text} </p>; // Description/excerpt
    let arrow = ">";
    let originalPosting = "";
    let applyButton = "";
    let location = this.props.result.location;
    if (this.state.selected) {
      location = ""; // Hide things that shouldnt be shown when selected, show things that should be shown
      arrow = "";
      originalPosting = <a className="table-post clickable" onClick={()=>this._handleClick("post", this.props.result)}><br/> Original Posting</a>;
      applyButton = <button className="table-button clickable" onClick={()=>this._handleClick("apply", this.props.result)}>Apply</button>;
    }
    return (
      <tr key={generateKey(this.props.id)} onClick={()=>this._handleClick("select", this.props.result)} className="table-row">
        <td align="left" className="table-cell-1 table-cell"> <h5 className="table-result-title"> {this.props.result.title} </h5>  {desc} </td>
        <td className="table-cell-2 table-cell" align="right">  <p className="table-result-location">{location}</p> {originalPosting} </td>
        <td className="table-cell-3 table-cell">  <p className="table-arrow">{arrow}{applyButton}</p> </td>
      </tr>
    );
  }
}

export default ResultRow;
