import React, { Component } from 'react';
import '../sass/NavBar.scss';

class Dropdown extends Component {
  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle category-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.searchCategory}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={this.props.handlePositionSearch} href="# ">{this.props.positionCategory}</a>
          <a className="dropdown-item" onClick={this.props.handleLocationSearch} href="# ">{this.props.locationCategory}</a>
        </div>
      </div>
    );
  }
}
export default Dropdown;
