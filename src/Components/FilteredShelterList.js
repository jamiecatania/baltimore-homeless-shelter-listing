import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


export default class FilteredShelterList extends Component {

    render() {
        return (
            <div>
                <ListGroup>
                {this.props.filteredShelters.map((place, index) => {
                    return (
                    <ListGroupItem 
                        key={index}
                        header={place.organization}
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
}