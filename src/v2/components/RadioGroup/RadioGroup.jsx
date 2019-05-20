import React from 'react'
import PropTypes from 'prop-types'
import Radio from '../Radio/Radio'

const classNames = require('classnames')

function RadioGroup({
  error, branch, legend, options,
}) {
  const fielsetClass = classNames({
    'usa-fieldset-inputs usa-sans': true,
    'usa-checkbox-radio-error': error,
  })

  const radioLayout = classNames({
    'usa-unstyled-list': true,
    'usa-list-inline usa-list-inline-justified': branch,
  })
  return (
    <fieldset className={fielsetClass}>
      <legend>{legend}</legend>
      <ul className={radioLayout}>
        {options.map(option => (
          <li>
            <Radio
              id={option.id}
              name={option.name}
              disabled={option.disabled}
              label={option.label}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

RadioGroup.propTypes = {
  error: PropTypes.bool,
  branch: PropTypes.bool,
  legend: PropTypes.string,
  options: PropTypes.array,
}

RadioGroup.defaultProps = {
  error: false,
  branch: false,
  legend: '',
  options: [],
}

export default RadioGroup
