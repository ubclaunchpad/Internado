import React, { Component } from "react";
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

class FilterMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
      isShowLocation: false,
      address: "",
      isShowCategories: false,
      isShowIndustries: false,
      isShowSalary: false,
    };
  }

  toggleLocation = () => {
    this.setState(prevState => ({
      isShowLocation: !prevState.isShowLocation
    }));
  }

  handleLocationChange = address => {
    this.setState({ address });
  }

  handleLocationSelect = () => {
    // do nothing
  }

  toggleCategories = () => {
    this.setState(prevState => ({
      isShowCategories: !prevState.isShowCategories
    }));
  }

  toggleIndustries = () => {
    this.setState(prevState => ({
      isShowIndustries: !prevState.isShowIndustries
    }));
  }

  toggleSalary = () => {
    this.setState(prevState => ({
      isShowSalary: !prevState.isShowSalary
    }));
  }

  renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className="autocomplete-root">
      <input {...getInputProps()} />
      <div className="autocomplete-dropdown-container">
        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)}>
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
    </div>
  );

  render() {
    return (
      <div id="flyoutMenu" className={this.props.visibility ? "show" : "hide"}>
        <h3>Filters</h3>
        <div className="locationTitle">
          <p>LOCATIONS</p>
          <button className="expand clickable" onClick={this.toggleLocation} />
        </div>
        {(this.state.isShowLocation) ?
          <div className="filterContent">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleLocationChange}
              onSelect={this.handleLocationSelect}>
              {this.renderFunc}
            </PlacesAutocomplete>
          </div>
          : null}
        <div className="categoriesTitle">
          <p>CATEGORIES</p>
          <button className="expand clickable" onClick={this.toggleCategories} />
        </div>
        {(this.state.isShowCategories) ?
          <div className="filterContent">
            <div className="categoriesList">
              <label>
                <input type="checkbox" />
                Full stack web
            </label>
              <label>
                <input type="checkbox" />
                Backend web
            </label>
              <label>
                <input type="checkbox" />
                Frontend web
            </label>
              <label>
                <input type="checkbox" />
                Android
              </label>
              <label>
                <input type="checkbox" />
                iOS
              </label>
              <label>
                <input type="checkbox" />
                Machine Learning
              </label>
              <label>
                <input type="checkbox" />
                Natural Language Processing
              </label>
              <label>
                <input type="checkbox" />
                Graphics
              </label>
              <label>
                <input type="checkbox" />
                Gaming
              </label>
            </div>
          </div>
          : null}
        <div className="industriesTitle">
          <p>INDUSTRIES</p>
          <button className="expand clickable" onClick={this.toggleIndustries} />
        </div>
        {(this.state.isShowIndustries) ?
          <div className="filterContent">
            <div>
              <label>
                <input type="checkbox" />
                E-Commerce
            </label>
              <label>
                <input type="checkbox" />
                Social Networking
              </label>
            </div>
          </div>
          : null}
        <div className="salaryTitle">
          <p>SALARY</p>
          <button className="expand clickable" onClick={this.toggleSalary} />
        </div>
        {(this.state.isShowSalary) ?
          <div className="filterContent">
            <input type="text" name="name" placeholder="Enter minimum" />
          </div>
          : null}
      </div>
    );
  }
}

FilterMenu.propTypes = {
  visibility: PropTypes.bool
};

export default FilterMenu;