import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating, numReviews }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            className={
              rating >= index
                ? "fas fa-star"
                : rating >= index - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={
              rating < 3
                ? { color: "#c21b0c" }
                : rating < 4
                ? { color: "#D5B70F" }
                : { color: "#00A00A" }
            }
          ></i>
        </span>
      ))}
      <span className="px-1">{numReviews} Reviews</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

export default Rating;
