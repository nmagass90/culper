import React from 'react'
import PropTypes from 'prop-types'

function DateControl({ hideDay }) {
  return (
    <fieldset>
      <legend>Provide your date of birth</legend>
      <div className="dateControl-container">
        <div className="dateControl-month">
          <label htmlFor="month">Month</label>
          <input id="month" maxLength="2" type="text" />
        </div>
        {!hideDay && (
        <div className="dateControl-day">
          <label htmlFor="day">Day</label>
          <input id="day" maxLength="2" type="text" />
        </div>
        )}
        <div className="dateControl-year">
          <label htmlFor="year">Year</label>
          <input id="year" maxLength="4" type="text" />
        </div>
      </div>
    </fieldset>
  )
}

DateControl.propTypes = {
  hideDay: PropTypes.bool,
}

DateControl.defaultProps = {
  hideDay: false,
}

export default DateControl
