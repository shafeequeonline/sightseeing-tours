import React, {useEffect, useState} from 'react';
import './Search.scss';

const Search = () => {
    const [ locations, setLocations ] = useState([]);
    const fetchLocations = async (string) => {
        const data = await fetch(
            `https://www.mydriver.com/api/v5/locations/autocomplete?searchString=${string}`
        )
        const locationList = await data.json();

        setLocations(locationList)
    }

    const searchLocation = (e) => {
        e.preventDefault()
        const searchTerm = e.target.value;
        if(searchTerm.length >= 3) {
            fetchLocations(searchTerm).then(location => location)
        }
    }

    return (
        <div className="Search">
            <div className="Search__fields">
                <input
                    type="text"
                    placeholder="Search for your Pickup Location"
                    className="Search__input"
                    onKeyUp={searchLocation}
                />

                <input
                    type="date"
                    placeholder="Select Date"
                    className="Search__input"
                    onKeyUp={searchLocation}
                />

                <input
                    type="time"
                    placeholder="Select Time"
                    className="Search__input"
                    onKeyUp={searchLocation}
                />

                <input
                    type="number"
                    placeholder="Select Duration (in Hours)"
                    className="Search__input"
                    onKeyUp={searchLocation}
                />
            </div>
            <div className="Search__results">
                {locations.map((place, index) => (
                    <label className="Search__results-item" id={place.id} key={place.id ? place.id : index}>{place.label}</label>
                ))}
            </div>
        </div>
    )
}

export default Search;