import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export default class MapContainer extends Component {

    render() {
        const style = {
            width: '100%',
            height: '75vh'
        };

        return (
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={this.props.center}
            >
                {this.props.filteredShelters.map((place, index) => {
                    {/* TODO: Update marker styling when active */ }
                    return (
                        <Marker
                            onClick={() => this.props.selectShelter(place.location_1_address)}
                            title={place.organization}
                            position={{ lat: place.location_1.coordinates[1], lng: place.location_1.coordinates[0] }}
                            key={index}
                        />
                    );
                }
                )}
            </Map>
        );
    }
}

MapContainer.PropTypes = {
    filteredShelterList: PropTypes.array.isRequired,
    currentlySelectedShelter: PropTypes.string.isRequired,
    google: PropTypes.Object,
    selectShelter: PropTypes.function
}

//Config map to Baltimore
MapContainer.defaultProps = {
    center: { lat: 39.2904, lng: -76.6122 },
    zoom: 13,
    type: 'roadmap',
    selectShelter: function (index) {
        alert(`Selected ${index}`);
    }
}