import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async'

import './Search.scss';

const Search = () => {
    const [ locations, setLocations ] = useState([]);
    const [ formValue, setFormValue ] = useState({ station: '', date: '', time: '', duration: ''});
    const [ offers, setOffers ] = useState([])

    /**
     * string from the search box
     */
    const fetchLocations = async (inputText, callback) => {
        const data = await fetch(
            `https://www.mydriver.com/api/v5/locations/autocomplete?searchString=${inputText}`
        )
        const locationList = await data.json();
        callback(locationList.map((place) => ({label: place.label, placeId: place.placeId})))
    }

    /**
     * searching the location
     */
    const searchLocation = (e) => {
        e.preventDefault()
        const searchTerm = e.target.value;
        if(searchTerm.length >= 3) {
            fetchLocations(searchTerm).then(location => location)
        }
    }

    /**
     * setting the pickup location to the state
     */
    const onLocationChange = location => {
        setLocations(location)
        setFormValue({...formValue, station: location})
    }

    const searchCabs = (event) => {
        event.preventDefault()
        const { station, date, time, duration } = formValue

        const requestBody = {
            "originPlaceId": station.placeId,
            "selectedStartDate": date,
            "duration": duration,
            "preferredTime": time,
            "type": "DURATION"
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch('https://www.mydriver.com/api/v5/offers', requestOptions)
            .then(res => res.json())
            .then(data => setOffers(data))

        console.log(offers)
    }


    const handleInputChange = (event) => {
        setFormValue( {...formValue, [event.target.name]: event.target.value })
    }

    return (
        <div className="Search">
            <div className="Search__fields">

                <form className="Search__form" name="search-form" onSubmit={searchCabs}>
                    <AsyncSelect
                        value={locations}
                        className="Search__select"
                        classNamePrefix="Search__select"
                        onChange={onLocationChange}
                        placeHolder={'type location'}
                        loadOptions={fetchLocations}
                    />

                    <input
                        type="date"
                        name="date"
                        value={formValue.date}
                        placeholder="Select Date"
                        className="Search__input"
                        onChange={handleInputChange}
                    />

                    <input
                        type="time"
                        name="time"
                        value={formValue.time}
                        placeholder="Select Time"
                        className="Search__input"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="duration"
                        value={formValue.duration}
                        placeholder="Select Duration (in Hours)"
                        className="Search__input"
                        onChange={handleInputChange}
                    />

                    <button
                        type="submit"
                        className="Search__button"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Search;