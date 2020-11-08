import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {

  // Get all the local Storage appointments
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));

  // check if there are appointments in the localStorage 
  if (!initialAppointments) {
    initialAppointments = [];
  }

  //* States     
  // new cita, this state is initialized with the localStorage array
  const [newAppointment, saveNewAppointment] = useState(initialAppointments);

  // Save the object in the localStorage
  useEffect(() => {
    if (newAppointment) {
      localStorage.setItem('appointments', JSON.stringify(newAppointment));
    } else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }
  }, [newAppointment, initialAppointments]);

  // Function that take all to the current appointments and the save them
  const createAppointment = appointment => {
    saveNewAppointment([...newAppointment, appointment]);
  }

  // Function that delete an appointment
  const deleteAppointment = id => {
    // return one array with all appointments 
    const deletedAppointment = newAppointment.filter(appointment => appointment.id !== id);
    saveNewAppointment(deletedAppointment);
  }

  // Show alert when there is no appointment
  const alertAppointment = (newAppointment.length < 1) ? 'There are no appointments to show' : 'manage your appointments';

  return (
    <Fragment>
      <h1>patient management</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              createAppointment={createAppointment}
            />
          </div>
          <div className="one-half column">
            <h1>{alertAppointment}</h1>
            {newAppointment.map(appointment => (
              <Appointment
                key={appointment.id}/* always put the key when go to iteration, don't forget it */
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
