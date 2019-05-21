import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

function Input({ label, type, maxLength }) {
  const uid = uuid.v4()

  return (
    <div>
      <label
        htmlFor={uid}
      >
        {label}
      </label>
      <input
        type={type}
        id={uid}
        maxLength={maxLength}
      />
    </div>
  )
}

export default Input
