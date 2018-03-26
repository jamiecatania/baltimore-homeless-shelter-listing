import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem } from 'react-bootstrap';

export default class FilterNav extends Component {

  render() {
    return (
      <div className="filter-container">
        <h2 className="filter-label">Filters:</h2>
        <Nav className="filter-nav" bsStyle="pills" activeKey={this.props.activeKey} onSelect={eventKey => this.props.onChange(eventKey)}>
          <NavItem eventKey={'all'}>
            All
        </NavItem>
          <NavItem eventKey={'drugrehab'}>
            Drug Rehab
        </NavItem>
          <NavItem eventKey={'transportation'}>
            Transportation
        </NavItem>
          <NavItem eventKey={'food'}>
            Food
        </NavItem>
          <NavItem eventKey={'medical'}>
            Medical
        </NavItem>
          <NavItem eventKey={'education'}>
            Education
        </NavItem>
        </Nav>
      </div>
    );
  }
}

FilterNav.defaultProps = {
  onChange: function (eventKey, key) {
    alert(`selected ${eventKey}`);
  }
}