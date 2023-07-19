import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchReservation, setMsgAction } from '../redux/user/session-redux';

function Reserve() {
  const { laptops } = useSelector((state) => state.laptops);
  const { creationMsg, user } = useSelector((state) => state.users);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { chosenLaptopId } = location.state || -1;

  const [durationOfHire, setDurationOfHire] = useState('');
  const [dateOfReservation, setDateOfReservation] = useState('');
  const [laptopId, setLaptopId] = useState(chosenLaptopId);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
    if (creationMsg === 'Reservation has been created successfully!') {
      setCreated(true);
      setErrorMessage('');
      setErrorMessage('');
      dispatch(setMsgAction());
      setTimeout(() => {
        navigate('/reservations');
      }, 2500);
    }
    if (creationMsg === 'Reservation couldn\'t be created.') {
      setErrorMessage('Oops! Reservation couldn\'t be created. Can\'t reserve the same laptop on the same day and hour twice.');
      dispatch(setMsgAction());
    }
  }, [creationMsg, created, dispatch, navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="popup-message">
        <p>Please log in to access this page</p>
      </div>
    );
  }

  const durationOfHires = [
    '8am - 9am',
    '9am - 10am',
    '10am - 11am',
    '11am - 12am',
    '1pm - 2pm',
    '2pm - 3pm',
    '3pm - 4pm',
    '4pm - 5pm',
    '5pm - 6pm',
    '6pm - 7pm',
    '7pm - 8pm',
  ];

  const cities = [
    'Tokyo',
    'Paris',
    'Algiers',
    'London',
    'Milan',
    'Toronto',
    'California',
    'Cairo',
    'New York',
    'Moscow',
    'Madrid',
    'Dubai',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (durationOfHire === '' || city === '' || dateOfReservation === '' || laptopId === -1) {
      setErrorMessage('All fields are required');
      return;
    }
    dispatch(
      fetchReservation({
        city,
        duration_of_hire: durationOfHire,
        date_of_reservation: dateOfReservation,
        laptop_id: laptopId,
        user_id: user.id,
      }),
    );
  };

  const getCurrentDate = () => new Date().toJSON().slice(0, 10);

  return (
    <section className="reserve-laptop-page">
      <h1>CHOOSE A LAPTOP</h1>

      <div className="reserve-page-divider" />
      <p>
        This app will allow you to choice a laptop to be hired following your demand.
      </p>

      <form onSubmit={handleSubmit} className="reserve-form">
        <select defaultValue={chosenLaptopId || ''} name="laptop_id" id="laptop-drop-down" onChange={(e) => setLaptopId(e.target.value)}>
          <option value="">Select a laptop</option>
          {laptops.map((laptop) => (
            <option
              key={laptop.id + laptop.firstName}
              value={laptop.id}
            >
              {`${laptop.nameame}`}
            </option>
          ))}
        </select>

        <select name="city" id="city-dropdown" onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input type="date" id="date-picker" name="date" min={getCurrentDate()} onChange={(e) => setDateOfReservation(e.target.value)} />

        <select name="hour" id="hour-dropdown" onChange={(e) => setDurationOfHire(e.target.value)}>
          <option value="">Select an hour</option>
          {durationOfHires.map((durationOfHire) => (
            <option key={durationOfHire} value={durationOfHire}>
              {durationOfHire}
            </option>
          ))}
        </select>

        <p className="error-messages">{errorMessage}</p>
        <input type="submit" value="Book Now" />
      </form>

      <div className={`popup-message ${created ? '' : 'hidden'}`}>
        <p>Reservation has been created successfully!</p>
      </div>
    </section>
  );
}

export default Reserve;
