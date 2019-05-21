import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

const classNames = require('classnames')

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const uid = uuid.v4()

    const {
      label, type, maxLength, error, success,
    } = this.props

    const { value } = this.state

    const inputError = classNames({
      'usa-input-error': error,
    })

    const inputSuccess = classNames({
      'usa-input-success': success,
    })

    return (
      <div className={inputError}>
        <label
          htmlFor={uid}
        >
          {label}
        </label>
        <input
          type={type}
          id={uid}
          maxLength={maxLength}
          value={value}
          onChange={this.handleChange}
          className={inputSuccess}
        />
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.bool,
  success: PropTypes.bool,
}

Input.defaultProps = {
  label: '',
  type: 'text',
  maxLength: '',
  error: false,
  success: false,
}
