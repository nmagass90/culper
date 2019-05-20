import React from 'react'
import PropTypes from 'prop-types'

function Checkbox({
  id, name, disabled, label,
}) {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        name={name}
        disabled={disabled}
      />
      <label htmlFor={id}><span>{label}</span></label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
}

Checkbox.defaultProps = {
  id: '',
  name: '',
  disabled: false,
  label: '',
}

export default Checkbox
