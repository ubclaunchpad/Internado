import React, {Component} from "react";
import "../css/Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', error: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  async handleSubmit(event) {
    const response = await fetch(`http://localhost:5000/mailing_list?email=${this.state.email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const body = await response.json();

    if (response.status !== 201) {
      if (body.error) {
        this.setState({error: body.error});
      }
      else {
        this.setState({error: JSON.stringify(body)});
      }
    } else {
      this.setState({error: ''});
      alert(`An email was submitted: ${this.state.email}`);
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <div className="main-title">
            <h1>🌪 Internado</h1>
            <p>Find your dream internship</p>
          </div>
          <h5>Stay up to date with the latest product developments and be one of the first to know when Internado is
            here</h5>
          <form className="my-8 my-lg-6">
            <input className="form-control mr-sm-2"
                   type="email"
                   placeholder="searcher@mail.com"
                   aria-label="Email"
                   onChange={this.handleChange}
            />
            <div className="navbar-nav ml-auto">
              <button type="button" onClick={this.handleSubmit} className="btn btn-primary mr-2">Join 0 other
                stormwatchers
              </button>
              <div className="error-text">{this.state.error}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}