import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class MapContainer extends Component {

    componentDidUpdate() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: { lat: this.props.center.lat, lng: this.props.center.lng },
                zoom: this.props.zoom,
                mapTypeId: this.props.type
            })

            // Create the map and attach to node
            this.map = new maps.Map(node, mapConfig);

            // Create markers for each item in filteredShelters prop
            this.props.filteredShelters.forEach(location => {
                const marker = new maps.Marker({
                    position: { lat: location.location_1.coordinates[1], lng: location.location_1.coordinates[0] },
                    map: this.map,
                    title: location.organization
                });
            })
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '75vh',
            margin: 'auto'
        }

        return (
            <div ref="map" style={style}>
                loading map...
            </div>
        )
    }
}

//Config map to Baltimore
MapContainer.defaultProps = {
    center: { lat: 39.2904, lng: -76.6122 },
    zoom: 13,
    type: 'roadmap',
    filteredShelters: []
}

MapContainer.PropTypes = {
    filteredShelters: PropTypes.array.isRequired,
    google: PropTypes.Object
}