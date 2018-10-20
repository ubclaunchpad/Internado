import React, { Component } from 'react';
import '../css/App.css';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      searchCategory: "Select Category"
    };
    this.searchCategories = ["Position", "Location"]
    this.updateSearchCategory = this.updateSearchCategory.bind(this);
  }

  updateSearchCategory(newCategory){
    this.setState({
      searchCategory: newCategory
    });
  }
  /*
    state = {
      search_category: "Select Category"
    };

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
  */
  render() {
    return (
      <div className="Navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <a class="navbar-brand" href="#">Internado</a>

          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Companies" aria-label="Search"/>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle category-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.searchCategory}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() => {this.updateSearchCategory(this.searchCategories[0])}}>{this.searchCategories[0]}</a>
                <a class="dropdown-item" onClick={() => {this.updateSearchCategory(this.searchCategories[1])}} >{this.searchCategories[1]}</a>
              </div>
            </div>
          </form>


          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav ml-auto">
              <button type="button" class="btn btn-primary mr-2">Sign up</button>
              <button type="button" class="btn btn-secondary">Login</button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;