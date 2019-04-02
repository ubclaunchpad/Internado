import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Routes from './config/Routes';
import { searchJobs } from './backendCalls/searchEndpoints';
import './sass/App.scss';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchKeywords: '',
      latitude: 0.0,
      longitude: 0.0,
      selectedCategories: [],
      selectedIndustries: [],
      minSalary: 0,
    };
  }

  updateSearchKeywords = (event) => {
    this.setState({ searchKeywords: event.target.value });
  };

  handleAddCategory = (category) => () => {
    this.setState((prevState) => ({
      selectedCategories: prevState.selectedCategories.includes(category)
        ? [...prevState.selectedCategories]
        : [...prevState.selectedCategories, category],
    }));
  };

  handleAddIndustry = (industry) => () => {
    this.setState((prevState) => ({
      selectedIndustries: prevState.selectedIndustries.includes(industry)
        ? [...prevState.selectedIndustries]
        : [...prevState.selectedIndustries, industry],
    }));
  };

  handleRemoveCategory = (categoryToRemove) => () => {
    this.setState((prevState) => ({
      selectedCategories: prevState.selectedCategories.filter((category) => category !== categoryToRemove),
    }));
  };

  handleRemoveIndustry = (industryToRemove) => () => {
    this.setState((prevState) => ({
      selectedIndustries: prevState.selectedIndustries.filter((industry) => industry !== industryToRemove),
    }));
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
      selectedCategories: [],
      selectedIndustries: [],
    });
    this.handleSearch();
  };

  // construct the JSON body of the search request
  constructBody = (searchKeywords) => {
    const body = {
      keywords: searchKeywords,
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
    const keywords = this.constructBody(this.state.searchKeywords);
    await searchJobs(keywords);
    this.props.history.push('/results');
  };

  render() {
    const {
      searchKeywords, selectedCategories, selectedIndustries, minSalary,
    } = this.state;

    return (
      <div className="App">
        <Navbar
          searchKeywords={searchKeywords}
          handleSearch={this.handleSearch}
          updateSearchKeywords={this.updateSearchKeywords}
        />
        <Routes
          selectedCategories={selectedCategories}
          selectedIndustries={selectedIndustries}
          minSalary={minSalary}
          handleAddCategory={this.handleAddCategory}
          handleAddIndustry={this.handleAddIndustry}
          handleRemoveCategory={this.handleRemoveCategory}
          handleRemoveIndustry={this.handleRemoveIndustry}
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
