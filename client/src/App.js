import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './sass/ResultsTable.scss';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Routes from './config/Routes';
import { searchJobs } from './backendCalls/searchEndpoints';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      isFilterMenuVisible: false,
      latitude: 0.0,
      longitude: 0.0,
      selectedCategories: [],
      selectedIndustries: [],
      salary: 0,
    };
  }

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

  onChangeMinSalary = (newSalary) => {
    this.setState({
      salary: newSalary,
    });
  };

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
  };

  searchHandler = (searchKeywords) => async () => {
    const keywords = this.constructBody(searchKeywords);
    await searchJobs(keywords);
    this.props.history.push('/results');
  };

  render() {
    const { selectedCategories, selectedIndustries } = this.state;

    return (
      <div className="App">
        <Navbar searchHandler={this.searchHandler} />
        <Routes
          selectedCategories={selectedCategories}
          selectedIndustries={selectedIndustries}
          handleAddCategory={this.handleAddCategory}
          handleAddIndustry={this.handleAddIndustry}
          handleRemoveCategory={this.handleRemoveCategory}
          handleRemoveIndustry={this.handleRemoveIndustry}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
