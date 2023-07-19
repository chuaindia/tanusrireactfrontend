/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLaptop, clear } from '../../redux/laptops/laptops';

function AddLaptop() {
  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.laptops);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const postData = (data) => {
    const obj = { ...data };
    dispatch(addLaptop(obj));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
    if (returnMsg) {
      if (returnMsg.message === 'Laptop has been created successfully!') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection('/');
        }, 2500);
      } else if (returnMsg.message === 'Laptop already exists') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection, isLoggedIn]);

  if (isLoggedIn) {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <section className="add-laptop-page">
        <h1>ADD A LAPTOP</h1>
        <div className="add-laptop-page-divider" />

        <form
          action=""
          className="add-laptop-form"
          onSubmit={handleSubmit(postData)}
        >
          <input
            type="input"
            name="name"
            placeholder="Name*"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is a required field',
              },

            })}
          />

          <input
            type="input"
            name="image_url"
            placeholder="domain.com/something.jpg"
            {...register('image_url', {
              required: {
                value: true,
                message: 'image url is a required field',
              },

            })}
          />

          <input
            type="number"
            name="price"
            placeholder="Hourly fee $"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('price', {
              required: {
                value: true,
                message: 'Price is a required field',
              },

            })}
          />

          <input
            type="input"
            name="model_year"
            placeholder="Model Year"
            {...register('model_year', {
              required: {
                value: true,
                message: 'Model Year is a required field',
              },

            })}
          />

          <input
            type="input"
            name="rom_size"
            placeholder="ROM Size"
            {...register('rom_size', {
              required: {
                value: true,
                message: 'ROM Size is a required field',
              },

            })}
          />

          <input
            type="input"
            name="ram_size"
            placeholder="RAM Size"
            {...register('ram_size', {
              required: {
                value: true,
                message: 'RAM Size is a required field',
              },

            })}
          />

          <textarea
            type="text"
            name="description"
            placeholder="Description"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is a required field',
              },
              minLength: {
                value: 20,
                message: 'Description must have a minimum of 20 characters',
              },
              maxLength: {
                value: 120,
                message: 'Description can only have a maximum of 120 characters',
              },
            })}
          />

          {/* <ul className="error-messages">
            {errors.first_name && (
              <li className="errorMsg">{errors.first_name.message}</li>
            )}

            {errors.last_name && (
              <li className="errorMsg">{errors.last_name.message}</li>
            )}

            {errors.image_url && (
              <li className="errorMsg">{errors.image_url.message}</li>
            )}

            {errors.description && (
              <li className="errorMsg">{errors.description.message}</li>
            )}

            {errors.hourly_fee && (
              <li className="errorMsg">{errors.hourly_fee.message}</li>
            )}

            {errors.experience && (
              <li className="errorMsg">{errors.experience.message}</li>
            )}

            {errors.ig_link && (
              <li className="errorMsg">{errors.ig_link.message}</li>
            )}

            {errors.twitter_link && (
              <li className="errorMsg">{errors.twitter_link.message}</li>
            )}

            {errors.fb_link && (
              <li className="errorMsg">{errors.fb_link.message}</li>
            )}
          </ul> */}
          */

          <button type="submit" name="additem" className="session-btn"> Add laptop </button>
        </form>

        <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
          <p>{returnMsg.message}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="popup-message">
      <p>Please login to view this page</p>
    </div>
  );
}

export default AddLaptop;
