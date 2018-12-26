import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/ResultsTable.css';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
// import ResultData from './components/ResultData';
// import ResultsTable from './components/ResultsTable';
import FilterMenu from './components/FilterMenu';
import Routes from './config/Routes';

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

  callBackendAPI = async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
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
  }

  searchHandler = (searchKeywords) => async() => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: this.constructBody(searchKeywords),
    });

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    this.setState({ data: body.result });
    this.props.history.push('/results');
  };

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
        <Routes results={this.state.data}/>
        {/* <ResultsTable results={this.state.data} /> */}
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
