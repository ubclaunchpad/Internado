import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './sass/ResultsTable.scss';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import FilterMenu from './components/FilterMenu';
import Routes from './config/Routes';
import store from './store.js';
import { searchJobs } from './backendCalls/searchEndpoints.js';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      isFilterMenuVisible: false,
      latitude: 0.0,
      longitude: 0.0,
      categories: [],
      industries: [],
      salary: 0,
    };
  }

  toggleFilterVisibility = () => {
    this.setState(prevState => ({
      isFilterMenuVisible: !prevState.isFilterMenuVisible,
    }));
  };

  onChangeLocation = (newLatLng) => {
    this.setState({
      latitude: newLatLng.lat,
      longitude: newLatLng.lng,
    });
  }

  onChangeMinSalary = (newSalary) => {
    this.setState({
      salary: newSalary,
    });
  }

  // construct the JSON body of the search request
  constructBody = (searchKeywords) => {
    const body = {
      keywords: searchKeywords,
    };
    if (this.state.salary) {
      body.salaryMin = this.state.salary;
    }

    if (this.state.latitude && this.state.longitude) {
      body.latitude = this.state.latitude;
      body.longitude = this.state.longitude;
      // TODO: let user choose radius
      body.radius = 50;
    }
    return JSON.stringify(body);
  }

  searchHandler = (searchKeywords) => async() => {
    var keywords = this.constructBody(searchKeywords);
    await searchJobs(keywords);
    this.props.history.push('/results');
  }

  render() {
    return (
      <div className="App">
        <Navbar searchHandler={this.searchHandler}/>
        {this.state.isFilterMenuVisible ?
          <button id="filterButton" className="show clickable" onClick={this.toggleFilterVisibility}/> :
          <button id="filterButton" className="hide clickable" onClick={this.toggleFilterVisibility}>Filters</button>}
        <FilterMenu
          visibility={this.state.isFilterMenuVisible}
          changeSalary={this.onChangeMinSalary}
          changeLocation={this.onChangeLocation}
        />
        <Routes results={store.searchResults}/>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
