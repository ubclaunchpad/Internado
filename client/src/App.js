import React, { Component } from 'react';
import './css/ResultsTable.css';
import Navbar from './views/Navbar';
import FilterMenu from './components/FilterMenu';
import Routes from './config/Routes';
import { withRouter } from 'react-router-dom';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
						isFilterMenuVisible: false
        };
    }

    toggleFilterVisibility = () => {
        this.setState(prevState => ({
            isFilterMenuVisible: !prevState.isFilterMenuVisible
        }));
    };

    callBackendAPI = async() => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    };

    searchHandler = (searchKeywords) => async() => {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'keywords': searchKeywords
        })
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
          <FilterMenu visibility={this.state.isFilterMenuVisible} />
          <Routes results={this.state.data}/>
        </div>
      );
    }
}

export default withRouter(App)
