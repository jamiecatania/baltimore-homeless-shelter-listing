import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


export default class FilteredShelterList extends Component {

    render() {
        const currentlySelectedShelter = this.props.currentlySelectedShelter;

        return (
            <div>
                <ListGroup>
                    {this.props.filteredShelters.map((place, index) => {
                        if (currentlySelectedShelter === place.location_1_address) {
                            return (
                                <ListGroupItem
                                    className="filtered-item"
                                    key={index}
                                    active
                                    header={place.organization}
                                    onClick={() => this.props.selectShelter(place.location_1_address)}
                                >
                                    <p>{place.location_1_address}</p>
                                    <p>{place.hours}</p>
                                    <p>{place.phone}</p>
                                    <p>{place.eligibleclients}</p>
                                    <p><a href={place.url} target="_blank">Website</a></p>
                                </ListGroupItem>
                            );
                        }
                        return (
                            <ListGroupItem
                                key={index}
                                header={place.organization}
                                onClick={() => this.props.selectShelter(place.location_1_address)}
                            >
                                {place.location_1_address}
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}

FilteredShelterList.PropTypes = {
    filteredShelterList: PropTypes.array.isRequired,
    currentlySelectedShelter: PropTypes.string.isRequired,
}

FilteredShelterList.defaultProps = {
    selectShelter: function (index) {
        alert(`Selected ${index}`);
    }
}