import React, { Component } from "react";
import { Redirect } from "react-router";

import "../styles/Home.css";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigateToResults = this.navigateToResults.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    navigateToResults(){
        this.setState({redirect: true});
    }

    handleSubmit(event) {
        // Make a change here to POST email to the email table
        // If the email exists, alert the user on this page
        // Otherwise, create an email record and transition to the results table
        alert('An email was submitted: ' + this.state.value);
        event.preventDefault();
    }

    // We should probably refactor the two buttons' className fields to
    // something like "homeButton" or something
    render() {
        if(this.state.redirect) return <Redirect to='/results' />
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
                               onChange={this.handleChange}
                        />
                    <div className="navbar-nav ml-auto navButton">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary mr-2">Enter the storm!</button>
                    </div>
                    <div className="navbar-nav ml-auto navButton">
                        <button type="button" onClick={this.navigateToResults} className="btn btn-default mr-2">Skip</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}