import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

function Checkbox({
  id, name, disabled, label, onChange,
}) {
  const uid = `${id}-${uuid.v4()}`

  return (
    <div>
      <input
        id={uid}
        type="checkbox"
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={uid}><span>{label}</span></label>
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
