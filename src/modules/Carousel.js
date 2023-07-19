/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import Laptop from './Laptop';

function Carousel({ laptops }) {
  const handlePrevClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.laptop-card');
    carousel.scrollLeft -= item.clientWidth;
  };
  const handleNextClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.laptop-card');
    carousel.scrollLeft += item.clientWidth;
  };

  return (
    <div className="carousel-container">
      <button
        type="button"
        className="previous"
        onClick={() => {
          handlePrevClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiLeftArrow />
          </div>
        </IconContext.Provider>
      </button>
      <ul className="carousel">
        {laptops.map((item) => (
          <li key={item.id}>
            <Laptop obj={item} />
          </li>
        ))}
      </ul>
      <button
        className="next"
        type="button"
        onClick={() => {
          handleNextClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiRightArrow />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
}

Carousel.propTypes = {
  laptops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      modelYear: PropTypes.number.isRequired,
      romSize: PropTypes.number.isRequired,
      ramSize: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Carousel;
