import React, { Component } from 'react';
import { func, string } from 'prop-types';
import Dropdown from '../components/Dropdown';
import '../sass/NavBar.scss';

const propTypes = {
  searchKeywords: string.isRequired,
  handleSearch: func.isRequired,
  updateSearchKeywords: func.isRequired,
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      searchCategory: 'Select Category',
    };
    this.searchCategories = ['Position', 'Location'];
  }

  updateSearchCategory = (newCategory) => {
    this.setState({
      searchCategory: newCategory,
    });
  };

  _handlePositionSearch = () => {
    this.updateSearchCategory(this.searchCategories[0]);
  };

  _handleLocationSearch = () => {
    this.updateSearchCategory(this.searchCategories[1]);
  };

  handleKeyDown = function searchOnEnterKeyPress(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      this.searchElement.click();
    }
  };

  render() {
    const { searchCategory } = this.state;
    const { searchKeywords, handleSearch, updateSearchKeywords } = this.props;

    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="# ">
            Internado
          </a>

          <form
            className="form-inline my-2 my-lg-0"
            onKeyDown={(e) => {
              this.handleKeyDown(e);
            }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              value={searchKeywords}
              placeholder="Search Companies"
              aria-label="Search"
              onChange={updateSearchKeywords}
            />
            <Dropdown
              searchCategory={searchCategory}
              handlePositionSearch={this._handlePositionSearch}
              handleLocationSearch={this._handleLocationSearch}
              positionCategory={this.searchCategories[0]}
              locationCategory={this.searchCategories[1]}
            />
            <div className="navbar-nav ml-auto">
              <a
                onClick={handleSearch}
                ref={(search) => {
                  this.searchElement = search;
                }}
                href="# "
              >
                <button type="button" className="btn btn-primary mr-2">
                  Search
                </button>
              </a>
            </div>
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
              <button type="button" className="btn btn-primary mr-2">
                Sign up
              </button>
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
