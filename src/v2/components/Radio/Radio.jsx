import React from 'react'
import PropTypes from 'prop-types'

function Radio({
  id, name, disabled, label,
}) {
  return (
    <div>
      <input
        id={id}
        type="radio"
        name={name}
        disabled={disabled}
      />
      <label htmlFor={id}><span>{label}</span></label>
    </div>
  )
}

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
}

Radio.defaultProps = {
  id: '',
  name: '',
  disabled: false,
  label: '',
}

export default Radio
