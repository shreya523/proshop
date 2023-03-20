import React, { useState } from "react"
import PropTypes from "prop-types"

const Rating = ({
  value = 0,
  text,
  color,
  editMode = false,
  changeRatingHandler,
}) => {
  const [val, setVal] = useState(value)

  const onClickHandler = (e) => {
    if (editMode) {
      setVal(e.target.dataset.value)
      changeRatingHandler(e.target.dataset.value)
    }
  }
  return (
    <div className={`rating ${editMode ? "poniter" : ""}`}>
      <span>
        <i
          data-value={1}
          onClick={onClickHandler}
          style={{ color }}
          className={
            val >= 1
              ? "fas fa-star"
              : val >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          data-value={2}
          onClick={onClickHandler}
          style={{ color }}
          className={
            val >= 2
              ? "fas fa-star"
              : val >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          data-value={3}
          onClick={onClickHandler}
          style={{ color }}
          className={
            val >= 3
              ? "fas fa-star"
              : val >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          data-value={4}
          onClick={onClickHandler}
          style={{ color }}
          className={
            val >= 4
              ? "fas fa-star"
              : val >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          data-value={5}
          onClick={onClickHandler}
          style={{ color }}
          className={
            val >= 5
              ? "fas fa-star"
              : val >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: "#d9534f",
}

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.string,
}

export default Rating
