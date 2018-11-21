import React, { Component } from 'react';
import './css/ResultsTable.css';
import Navbar from './views/Navbar';
import ResultData from './components/ResultData';
import FilterMenu from './components/FilterMenu';
import Routes from './config/Routes';
import ResultsTable from './components/ResultsTable';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            // data: [
            //     new ResultData("Nothing do-er", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "nop nop nop nop nop nop nop nop nop ", "Vancouver, BC, Canada", "http://hasthelargehadroncolliderdestroyedtheworldyet.com/", "https://thedailywtf.com/articles/you-can-only-get-what-you-have"),
            //     new ResultData("CPU maker", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Make CPUs and stuff.",  "Vancouver, WA, USA", "https://ded.increpare.com/~locus/yourname.html", "https://ded.increpare.com/~locus/yourname.html"),
            //     new ResultData("Software Developer", "Develop Software, but more text", "Develop Software", "Vancouver, BC, Canada", "https://github.com/mattdiamond/fuckitjs", "https://github.com/ajalt/fuckitpy")
            // ],
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
      this.setState({data: body.result})
    };

    render() {
      return (
        <div className="App">
          <Navbar searchHandler={this.searchHandler}/>
          {this.state.isFilterMenuVisible ?
            <button id="filterButton" className="show clickable" onClick={this.toggleFilterVisibility}/> :
            <button id="filterButton" className="hide clickable" onClick={this.toggleFilterVisibility}>Filters</button>}
          <FilterMenu visibility={this.state.isFilterMenuVisible} />
          <ResultsTable results={this.state.data} />
          <Routes/>
        </div>
      );
    }
}

export default App
