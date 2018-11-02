import React, { Component } from 'react';
import '../styles/NavBar.css';

class Dropdown extends Component {
  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle category-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.searchCategory}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={this.props.handlePositionSearch}>{this.props.positionCategory}</a>
          <a className="dropdown-item" onClick={this.props.handleLocationSearch} >{this.props.locationCategory}</a>
        </div>
      </div>
    );
  }
}
export default Dropdown;