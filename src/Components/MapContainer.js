import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export default class MapContainer extends Component {

    render() {
        const style = {
            width: '100%',
            height: '75vh'
        };

        let iconUrl = 'https://png.icons8.com/android/50/000000/tent.png';
        const currentlySelectedShelter = this.props.currentlySelectedShelter;

        return (
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={this.props.center}
            >
                {this.props.filteredShelters.map((place, index) => {
                    // Change sytling of icon on render if it's the currently selected shelter
                    if (currentlySelectedShelter === place.location_1_address) {
                        iconUrl = 'https://png.icons8.com/android/50/2980b9/tent.png';
                    } else {
                        iconUrl = 'https://png.icons8.com/android/50/000000/tent.png';
                    }
                    return (
                        <Marker
                            onClick={() => this.props.selectShelter(place.location_1_address)}
                            title={place.organization}
                            position={{ lat: place.location_1.coordinates[1], lng: place.location_1.coordinates[0] }}
                            key={index}
                            icon={{
                                url: iconUrl,
                                anchor: new this.props.google.maps.Point(10, 10),
                                scaledSize: new this.props.google.maps.Size(30, 30)
                            }}
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