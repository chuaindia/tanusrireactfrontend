/* eslint-disable react/react-in-jsx-scope */
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';

function SingleLaptop() {
  const { id } = useParams();
  const laptop = useSelector((state) => state.laptops.laptops).find(
    (item) => item.id === Number(id),
  );
  const state = useSelector((state) => state.laptops.laptops);

  if (!laptop && state.length === 0) {
    return <div className="loading">Loading</div>;
  }
  if (!laptop && state.length !== 0) {
    return <div className="loading">Element not found</div>;
  }
  return (
    <section className="laptop-details-page">
      <div className="laptop-photo-container">
        <img
          src={laptop.imageUrl}
          alt="laptop"
          className="detailsPageLaptopPhoto"
        />
      </div>
      <div className="laptop-details-container">
        <h1>
          {laptop.name}
        </h1>
        <p className="laptop-description">
          {laptop.description}
        </p>
        <ul className="details">
          <li>
            <span>Price: </span>
            <span>
              {laptop.price}
              $
            </span>
          </li>
          <li>
            <span>Model Year: </span>
            <span>{laptop.model_year}</span>
          </li>
          <li>
            <span>Rom_size: </span>
            <span>{laptop.rom_size}</span>
          </li>
          <li>
            <span>Ram_size: </span>
            <span>{laptop.ram_size}</span>
          </li>
        </ul>
        {/* <ul className="laptop-social-links">
          <li>
            <a
              href={
                laptop.fbLink !== 'blank' ? laptop.fbLink : 'https://facebook.com'
              }
              className="laptop-sm-link"
              target="_blank"
              rel="noreferrer"
              aria-label="facebook page"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              href={
                laptop.igLink !== 'blank' ? laptop.igLink : 'https://instagram.com'
              }
              className="laptop-sm-link"
              target="_blank"
              rel="noreferrer"
              aria-label="instagram page"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href={
                laptop.twitterLink !== 'blank'
                  ? laptop.twitterLink
                  : 'https://twitter.com'
              }
              className="laptop-sm-link"
              target="_blank"
              rel="noreferrer"
              aria-label="twitter page"
            >
              <FaTwitter />
            </a>
          </li>
        </ul> */}
        <Link
          className="makeReservationButton"
          to="/reserve"
          state={{ chosenLaptopId: laptop.id }}
        >
          <button type="button">
            Make reservation
            <IoChevronForwardCircleOutline className="reserve-arrow-icon" />

          </button>
        </Link>
      </div>
    </section>
  );
}

export default SingleLaptop;
