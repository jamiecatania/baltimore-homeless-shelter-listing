import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem } from 'react-bootstrap';

export default class FilterNav extends Component {

  render() {
    return (
      <Nav bsStyle="pills" pullRight activeKey={1} onSelect={k => this.props.onChange(k)}>
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
    );
  }
}

FilterNav.defaultProps = {
  onChange: function(eventKey) {
    alert(`selected ${eventKey}`);
  }
}