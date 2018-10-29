import React, { Component } from 'react';
import './css/App.css';
import './css/ResultsTable.css';
import Navbar from './js/Navbar.js';
import Routes from "./Routes";
import {ResultsTable, Result} from './js/ResultsTable.js';

class App extends Component {
  state = {
    data: [
            new Result("Nothing do-er", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "nop nop nop nop nop nop nop nop nop ", "Vancouver, BC, Canada", "http://hasthelargehadroncolliderdestroyedtheworldyet.com/", "https://thedailywtf.com/articles/you-can-only-get-what-you-have"), 
            new Result("CPU maker", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Make CPUs and stuff.",  "Vancouver, WA, USA", "https://ded.increpare.com/~locus/yourname.html", "https://ded.increpare.com/~locus/yourname.html"),
            new Result("Software Developer", "Develop Software, but more text", "Develop Software", "Vancouver, BC, Canada", "https://github.com/mattdiamond/fuckitjs", "https://github.com/ajalt/fuckitpy")
          ],
  };

  // This function will be used in the future to populate the data field in state to hold
  // the data returned from search queries
  populateResultsTableData() {
    
  }
  
  callBackendAPI = async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  render() {
    return (
      <div className="App">
        <Navbar />
          {/*<ResultsTable results={this.state.data} />*/}
          <Routes/>
      </div>
    );
  }
}

export default App;
