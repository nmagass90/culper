import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'

function DateControl({ hideDay, legend }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="dateControl-container">
        <div className="dateControl-month">
          <Input
            label="Month"
            type="text"
            maxLength="2"
          />
        </div>
        {!hideDay && (
        <div className="dateControl-day">
          <Input
            label="Day"
            type="text"
            maxLength="2"
          />
        </div>
        )}
        <div className="dateControl-year">
          <Input
            label="Year"
            type="text"
            maxLength="4"
          />
        </div>
      </div>
    </fieldset>
  )
}

DateControl.propTypes = {
  hideDay: PropTypes.bool,
  legend: PropTypes.string,
}

DateControl.defaultProps = {
  hideDay: false,
  legend: '',
}

export default DateControl
