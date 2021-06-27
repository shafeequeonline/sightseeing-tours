
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock } from '@fortawesome/free-solid-svg-icons';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { CabsContext } from "../../context/cabs-context";
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import {Select, MenuItem} from '@material-ui/core';

import './Search.scss';


const Search = () => {
    const [ locations, setLocations ] = useState([]);
    const [ formValue, setFormValue ] = useState({ station: '', duration: ''});
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ selectedTime, setSelectedTime ] = useState(new Date());

    /**
     * Using React context to communicate between components
     */
    const { setOffers, setShowCabs } = useContext(CabsContext)
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
     * setting the pickup location to the state
     */
    const onLocationChange = location => {
        setLocations(location)
        setFormValue({...formValue, station: location})
    }

    /**
     * Fetching the cabs with the details from the form
     */
    const searchCabs = (event) => {
        event.preventDefault()
        const { station, duration } = formValue
        const durationInMinutes = duration * 60;
        const requestBody = {
            "originPlaceId": station.placeId,
            "selectedStartDate": selectedDate.toDateString(),
            "preferredTime": selectedTime.toTimeString(),
            "duration": durationInMinutes,
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
        setShowCabs(true)
    }

    /**
     * Handling the input change
     */
    const handleInputChange = (event) => {
        setFormValue( {...formValue, [event.target.name]: event.target.value })
    }

    /**
     * Handling the Date change
     */
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    /**
     * Handling the Time change
     */
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    /**
     * rendering placeholder for React Select
     */
    const Placeholder = props => {
        return <components.Placeholder {...props} />;
    };

    const durations = [
        {value: 1, label: '1 Hour'},
        {value: 1.5, label: '1.5 Hours'},
        {value: 2, label: '2 Hours'},
        {value: 2.5, label: '2.5 Hours'},
        {value: 3, label: '3 Hours'},
        {value: 3.5, label: '3.5 Hours'}
    ]
    return (
        <div className="Search">
            <div className="Search__fields">
                <form className="Search__form" name="search-form" onSubmit={searchCabs} >
                    <AsyncSelect
                        required
                        value={locations}
                        className="Search__select"
                        classNamePrefix="Search__select"
                        onChange={onLocationChange}
                        loadOptions={fetchLocations}
                        placeholder={'Enter your pickup point'}
                        components={{ Placeholder }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            className="Search__input"
                            id="date-picker-inline"
                            name="date"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Select Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            className="Search__input"
                            variant="inline"
                            name="time"
                            margin="normal"
                            label="Select Time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            keyboardIcon={<FontAwesomeIcon icon={faClock} />}
                        />

                        <Select
                            displayEmpty
                            labelId="select-label"
                            className="Search__input--select"
                            id="select"
                            label="Select Duration"
                            name="duration"
                            value={formValue.duration}
                            onChange={handleInputChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="" disabled>Duration</MenuItem>
                            {
                                durations.map(time => (
                                    <MenuItem value={time.value} >{time.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </MuiPickersUtilsProvider>

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