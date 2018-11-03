import React, { Component } from "react";
import "../styles/Home.css";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>🌪 Internado</h1>
                    <p>Find your dream internship</p>
                    <br></br>
                    <br></br>
                    <h5>Be the first to know about the newest product updates</h5>
                    <form onSubmit={this.handleSubmit} className="my-8 my-lg-6">
                        <input className="form-control mr-sm-2"
                               type="email"
                               placeholder="searcher@mail.com"
                               aria-label="Email"
                               onChange="5"
                        />
                    <div className="navbar-nav ml-auto">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary mr-2">Enter the storm!</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}