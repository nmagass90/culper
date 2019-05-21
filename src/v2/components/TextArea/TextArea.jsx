import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

export default class TextArea extends React.Component {
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

    const { label } = this.props

    const { value } = this.state

    return (
      <div>
        <label
          htmlFor={uid}
        >
          {label}
        </label>
        <textarea
          id={uid}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

TextArea.propTypes = {
  label: PropTypes.string,
}

TextArea.defaultProps = {
  label: '',
}
