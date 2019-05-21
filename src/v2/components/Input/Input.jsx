import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

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

    const { label, type, maxLength } = this.props

    const { value } = this.state

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
          value={value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
}

Input.defaultProps = {
  label: '',
  type: 'text',
  maxLength: '',
}
