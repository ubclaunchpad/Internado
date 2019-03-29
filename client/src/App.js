import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Routes from './config/Routes';
import { searchJobs } from './backendCalls/searchEndpoints';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchBoxText: '',
      filterKeywords: [],
      latitude: 0.0,
      longitude: 0.0,
      minSalary: 0,
    };
  }

  updateSearchBoxText = (event) => {
    this.setState({ searchBoxText: event.target.value });
  };

  handleAddFilterKeyword = (keyword) => async () => {
    this.setState((prevState) => ({
      filterKeywords: prevState.filterKeywords.includes(keyword)
        ? [...prevState.filterKeywords]
        : [...prevState.filterKeywords, keyword],
    }));
    this.handleSearch();
  };

  handleRemoveFilterKeyword = (keywordToRemove) => async () => {
    this.setState((prevState) => ({
      filterKeywords: prevState.filterKeywords.filter((keyword) => keyword !== keywordToRemove),
    }));
    this.handleSearch();
  };

  onChangeLocation = (newLatLng) => {
    this.setState({
      latitude: newLatLng.lat,
      longitude: newLatLng.lng,
    });
  };

  handleAddMinSalary = async (newSalary) => {
    await this.setState({
      minSalary: newSalary,
    });
    this.handleSearch();
  };

  handleRemoveMinSalary = async () => {
    await this.setState({
      minSalary: 0,
    });
    this.handleSearch();
  };

  handleClearFilters = async () => {
    await this.setState({
      minSalary: 0,
      filterKeywords: [],
    });
    this.handleSearch();
  };

  // construct the JSON body of the search request
  constructBody = (searchBoxText, filterKeywords) => {
    const body = {
      keywords: [...filterKeywords, searchBoxText].join(' '),
    };

    if (this.state.minSalary) {
      body.salaryMin = this.state.minSalary;
    }

    if (this.state.latitude && this.state.longitude) {
      body.latitude = this.state.latitude;
      body.longitude = this.state.longitude;
      // TODO: let user choose radius
      body.radius = 50;
    }
    return JSON.stringify(body);
  };

  handleSearch = async () => {
    const requestBody = this.constructBody(this.state.searchBoxText, this.state.filterKeywords);
    await searchJobs(requestBody);
    this.props.history.push('/results');
  };

  render() {
    const {
      searchBoxText, filterKeywords, minSalary,
    } = this.state;

    return (
      <div className="App">
        <Navbar
          searchBoxText={searchBoxText}
          handleSearch={this.handleSearch}
          updateSearchBoxText={this.updateSearchBoxText}
        />
        <Routes
          filterKeywords={filterKeywords}
          handleAddFilterKeyword={this.handleAddFilterKeyword}
          handleRemoveFilterKeyword={this.handleRemoveFilterKeyword}
          minSalary={minSalary}
          handleAddMinSalary={this.handleAddMinSalary}
          handleRemoveMinSalary={this.handleRemoveMinSalary}
          handleClearFilters={this.handleClearFilters}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
