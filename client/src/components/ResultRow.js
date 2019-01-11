import React, { Component } from 'react';

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  _handleClick = (action, result) => {
    switch (action) {
      case 'select': // Clicked on row to select/deselect
        this.setState({ selected: !this.state.selected });
        break;
      case 'post': // Clicked on original post
        if (result.link && result.link !== '')
          window.open(result.link, '_blank');
        break;
      case 'apply': // Clicked on apply
        // window.open(result.applyUrl);
        break;
      default: break;
    }
  };

  render() {
    const generateKey = (pre) => {
      return `${pre}_${new Date().getTime()}`;
    };
    const text = this.state.selected ? this.props.result.description : this.props.result.description.slice(0, 20); // If selected, show description, otherwise, show excerpt
    const desc = <p className='table-result-desc'> {text} </p>; // Description/excerpt
    let arrow = '>';
    let originalPosting = '';
    let applyButton = '';
    let { city } = this.props.result;
    if (this.state.selected) {
      city = ''; // Hide things that shouldnt be shown when selected, show things that should be shown
      arrow = '';
      originalPosting = <a className='table-post clickable' onClick={() => this._handleClick('post', this.props.result)}><br/> Original Posting</a>;
      applyButton = <button className='table-button clickable' onClick={() => this._handleClick('apply', this.props.result)}>Apply</button>;
    }
    return (
      <tr key={generateKey(this.props.id)} onClick={() => this._handleClick('select', this.props.result)} className='table-row'>
        <td align='left' className='table-cell-1 table-cell'> <h5 className='table-result-title'> {this.props.result.job_title} </h5>  {desc} </td>
        <td className='table-cell-2 table-cell' align='right'>  <p className='table-result-location'>{city}</p> {originalPosting} </td>
        <td className='table-cell-3 table-cell'>  <p className='table-arrow'>{arrow}{applyButton}</p> </td>
      </tr>
    );
  }
}

export default ResultRow;
