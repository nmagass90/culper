import React from 'react'
import PropTypes from 'prop-types'

import DateControl from '../DateControl/DateControl'

function DateRange({ legend }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="dateRange-container">
        <div className="dateRange-from">
          <DateControl
            legend="From date"
          />
        </div>
        <div className="dateRange-arrow" />
        <div className="dateRange-to">
          <DateControl
            legend="To date"
          />
        </div>
      </div>
    </fieldset>
  )
}

DateRange.propTypes = {
  legend: PropTypes.string,
}

DateRange.defaultProps = {
  legend: '',
}

export default DateRange
