/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function Reservations() {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
  }, [isLoggedIn, navigate]);

  const reservations = useSelector((state) => state.users.reservations);
  const laptops = useSelector((state) => state.laptops.laptops);

  if (isLoggedIn) {
    return (
      <section className="reservations-page">
        <h1>My reservations</h1>
        {reservations.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>Laptop Name</th>
                <th>City</th>
                <th>Date of Reservation</th>
                <th>Duration of Hire</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((item) => (
                <tr key={item.id}>
                  <td>
                    {laptops.find((laptop) => laptop.id === item.laptop_id).name}
                  </td>
                  <td>{item.city}</td>
                  <td>{item.date_of_reservation}</td>
                  <td>{item.duration_of_hire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-items-available">
            <div>There are no reservations currently</div>
            <Link to="/reserve"><button type="button">Make a reservation now!</button></Link>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="popup-message">
      <p>Please log in to access this page</p>
    </div>
  );
}

export default Reservations;
