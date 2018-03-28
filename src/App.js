import React, { Component } from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './Components/MapContainer';
import FilteredShelterList from './Components/FilteredShelterList';
import FilterNav from './Components/FilterNav';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      shelterData: [],
      filteredData: [],
      currentlySelectedShelter: '',
      currentlySelectedIndex: null,
      activeFilter: 'all',
      isDataLoaded: false
    }
  }

  //Fetches the raw data set just before the App Component mounts to the DOM.
  componentWillMount() {
    //Fetch the dataset from https://data.baltimorecity.gov/Health/Homeless-Services/uukz-aw5g via Socrata Open Data API (SODA).
    const URL = "https://data.baltimorecity.gov/resource/4adc-a5y9.json";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ shelterData: json, filteredData: json, isDataLoaded: true });
    });
  }

  render() {
    const that = this; // Explicitly declaring the meaning of 'this'
    const activeFilter = that.state.activeFilter;

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <h1>Baltimore Homeless Shelter Listings</h1>
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
                filteredShelters={that.state.filteredData}
                currentlySelectedShelter={that.state.currentlySelectedShelter}
                selectShelter={function (address) {
                  that.setState({ currentlySelectedShelter: address });
                }}
              />
            </Col>
            <Col xs={12} md={8}>
              <MapContainer
                google={that.props.google}
                currentlySelectedShelter={that.state.currentlySelectedShelter}
                filteredShelters={that.state.filteredData}
                selectShelter={function (address) {
                  that.setState({ currentlySelectedShelter: address });
                }}
              />
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
