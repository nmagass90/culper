import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'

const classNames = require('classnames')

function CheckboxGroup({
  legend, options, error, onChange,
}) {
  const fielsetClass = classNames({
    'usa-fieldset-inputs usa-sans': true,
    'usa-checkbox-radio-error': error,
  })
  return (
    <fieldset className={fielsetClass}>
      <legend>{legend}</legend>
      <ul className="usa-unstyled-list">
        {options.map(option => (
          <li>
            <Checkbox
              key={option.id}
              id={option.id}
              name={option.name}
              disabled={option.disabled}
              label={option.label}
              onChange={onChange}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

CheckboxGroup.propTypes = {
  legend: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.bool,
}

CheckboxGroup.defaultProps = {
  legend: '',
  options: [],
  error: false,
}

export default CheckboxGroup
