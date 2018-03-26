import React, { Component } from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './Components/MapContainer';
import FilteredShelterList from './Components/FilteredShelterList';
import FilterNav from './Components/FilterNav';

class App extends Component {

  constructor() {
    super();
    this.state = {
      shelterData: [],
      filteredData: [],
      currentlySelectedShelter: '',
      activeFilter: 'all',
      isDataLoaded: false    
    }
  }

  componentWillMount() {
    //Fetch the dataset from https://data.baltimorecity.gov/Health/Homeless-Services/uukz-aw5g via Socrata Open Data API (SODA).
    const URL = "https://data.baltimorecity.gov/resource/4adc-a5y9.json";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ shelterData: json, filteredData: json, isDataLoaded: true });
    });
  }

  render() {
    var that = this;
    const activeFilter = this.state.activeFilter;

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <h1>Baltimore Homeless Shelter Listings</h1>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Col sm={12}>
            <FilterNav activeFilter={activeFilter} activeKey={that.state.activeFilter} onChange={function (eventKey) {
              const tempFilterData = eventKey === 'all' ? that.state.shelterData : that.state.shelterData.filter(el => {
                return el[eventKey] === "1";
              })
              that.setState({ activeFilter: eventKey, filteredData: tempFilterData });
            }} />
          </Col>
          <Row>
            <Col xs={12} md={4}>
              <FilteredShelterList 
                filteredShelters={this.state.filteredData}
                currentlySelectedShelter={this.state.currentlySelectedShelter} 
                selectShelter={function (address) {
                  that.setState({ currentlySelectedShelter: address });
                }}
              />
            </Col>
            <Col xs={12} md={8}>
              <MapContainer google={this.props.google} filteredShelters={this.state.filteredData} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKbBX63r3ioFdUGQyChz_5hajqWdA26Io',
})(App)
