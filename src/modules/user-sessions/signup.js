/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSession } from '../../redux/user/session-redux';

function Signup() {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const userData = useSelector((state) => state.users);

  const [nameState, setNameState] = useState('');
  const [existState, setExistState] = useState(false);
  const [validMsgState, setValidMsgState] = useState('');
  const [clicked, setClickedState] = useState(false);
  const [validDisplayState, setValidDisplayState] = useState(false);

  const validate = () => {
    setClickedState(true);
    if (nameState.length === 0) {
      setValidMsgState('User name field can not be empty');
      setValidDisplayState(true);
      setExistState(false);
    } else if (nameState.length < 6) {
      setValidMsgState('Use rname must be at least 6 characters');
      setValidDisplayState(true);
      setExistState(false);
    } else if (nameState.length >= 6) {
      dispatch(userSession({ name: nameState }, 'signup'));
    }
  };

  const setName = (e) => {
    setNameState(e.target.value);
  };

  useEffect(() => {
    if (userData.logged_in === false) {
      if (clicked) {
        setExistState(true);
        setValidDisplayState(false);
      }
    }
    if (userData.logged_in === true) {
      setExistState(false);
      localStorage.setItem('logged_in', true);
      localStorage.setItem('user', userData.user.name);
    }
    if (localStorage.getItem('logged_in') === 'true') {
      const user = localStorage.getItem('user');
      if (!userData) {
        dispatch(userSession({ name: user }, 'login'));
      }
      redirection('/');
    }
  }, [userData.message, userData.logged_in, redirection, dispatch, userData, clicked]);

  return (
    <section className="user-page flex">
      <div>
        <h1>Get Started</h1>
      </div>
      <form action="" className="user-form flex">
        <input
          type="input"
          name="name"
          placeholder="User name"
          id="name"
          onChange={setName}
        />
        <div
          className="backend-error"
          style={{
            display: existState ? 'inherit' : 'none',
          }}
        >
          <p>{userData.message}</p>
        </div>
        <div
          className="error"
          style={{
            display: validDisplayState ? 'inherit' : 'none',
          }}
        >
          <p>{validMsgState}</p>
        </div>
        <button
          type="button"
          name="signup"
          className="session-btn"
          onClick={validate}
        >
          Sign Up
        </button>
        <Link to="/user/login">
          <p
            className="session-redirect"
          >
            <em>Already a member? Log in...</em>
          </p>
        </Link>
      </form>
    </section>
  );
}

export default Signup;
