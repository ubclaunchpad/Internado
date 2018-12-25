import React, { Component } from 'react';
import '../css/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link">
        <span>Job Search by</span>
          <span id="zr_logo_container">
            <img id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" />
          </span>
        </a>
      </div>
    )
  }
}