import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

function Radio({
  id, name, disabled, label,
}) {
  const uid = uuid.v4()

  return (
    <div>
      <input
        id={`${id}-${uid}`}
        type="radio"
        name={name}
        disabled={disabled}
      />
      <label htmlFor={`${id}-${uid}`}><span>{label}</span></label>
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
