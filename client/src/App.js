import React, { Component } from 'react';
import './styles/ResultsTable.css';
import Navbar from './views/Navbar';
import ResultsTable from './containers/ResultsTable';
import ResultData from './components/ResultData';

class App extends Component {
  state = {
    data: [
      new ResultData("Nothing do-er", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "nop nop nop nop nop nop nop nop nop ", "Vancouver, BC, Canada", "http://hasthelargehadroncolliderdestroyedtheworldyet.com/", "https://thedailywtf.com/articles/you-can-only-get-what-you-have"), 
      new ResultData("CPU maker", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Make CPUs and stuff.", "Vancouver, WA, USA", "https://ded.increpare.com/~locus/yourname.html", "https://ded.increpare.com/~locus/yourname.html"),
      new ResultData("Software Developer", "Develop Software, but more text", "Develop Software", "Vancouver, BC, Canada", "https://github.com/mattdiamond/fuckitjs", "https://github.com/ajalt/fuckitpy")
    ],
  };

  // This function will be used in the future to populate the data field in state to hold
  // the data returned from search queries
  // __populateResultsTableData() {

  // }

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
        <ResultsTable results={this.state.data} />
      </div>
    );
  }
}

export default App;
