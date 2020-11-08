import React, { Fragment, useState } from 'react';
// dependence for generating and identifier
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Form = ({ createAppointment }) => {

    //* States    
    // create appointment state
    const [appointment, updateAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms: ''
    });

    // error state
    const [error, updateError] = useState(false);

    //* Destructuring   
    // appointment destructuring
    const { pet, owner, date, time, symptoms } = appointment;

    //* Functions   
    // function that update the object appointment
    const updateState = e => {
        updateAppointment({
            ...appointment,
            [e.target.name]: e.target.value,
        });
    }

    const submitAppointment = e => {
        e.preventDefault();

        // Validate form 

        if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {

            // If  exist one error, will execute alert
            updateError(true);
            return;
        }

        updateError(false);

        // assign one ID
        appointment.id = uuid();

        // create the appointment
        createAppointment(appointment);

        // Restart Form
        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptoms: ''
        });
    }

    //* HTML    
    return (
        <Fragment>
            <h1>Create Appointment</h1>
            { error ? <p className="alerta-error">All fields are required</p> : null}

            <form onSubmit={submitAppointment} >
                <label>Pet:</label>
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet name"
                    onChange={updateState}
                    value={pet}
                />

                <label>Owner name:</label>
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Owner name"
                    onChange={updateState}
                    value={owner}
                />

                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={updateState}
                    value={date}
                />

                <label>Time:</label>
                <input
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={updateState}
                    value={time}
                />

                <label>Symptoms:</label>
                <textarea
                    className="u-full-width"
                    placeholder="Write the symptoms"
                    name="symptoms"
                    onChange={updateState}
                    value={symptoms}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Send</button>
            </form>

        </Fragment>
    );
}

// Data type
Form.propTypes = {
    createAppointment: PropTypes.func.isRequired
}

export default Form;