import React, { Component } from 'react';
import './css/App.css';
import './css/ResultsTable.css';
import Navbar from './js/Navbar.js';
import {ResultsTable, Result} from './js/ResultsTable.js';

class App extends Component {
  state = {
    data: [],
  };

  populateDummyData() {
    this.state.data.push(new Result("Software Developer", "Develop Software", "Vancouver, BC, Canada", "https://github.com/mattdiamond/fuckitjs"));
    this.state.data.push(new Result("CPU maker", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Vancouver, WA, USA", "https://stackoverflow.com"));
   this.state.data.push(new Result("Nothing do-er", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "Vancouver, BC, Canada", "http://hasthelargehadroncolliderdestroyedtheworldyet.com/"));
  }

  componentDidMount() {
    this.callBackendAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log(err));
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
    this.populateDummyData();
    return (
      <div className="App">
        <Navbar></Navbar>
        <ResultsTable results={this.state.data} />
      </div>
    );
  }
}

export default App;
