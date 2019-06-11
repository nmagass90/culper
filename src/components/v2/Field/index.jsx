import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { newGuid } from 'components/Form/ValidationElement'

class Field extends React.Component {
  constructor(props) {
    super(props)

    this.uuid = newGuid()
  }

  render() {
    const { title, dataTestId, children } = this.props

    return (
      <div
        data-uuid={this.uuid}
        aria-label={title}
        {...(dataTestId && { 'data-test-id': dataTestId })}
      >
        {title}
        <span className="icon">ICON</span>
        HELP
        ERRORS
        {children}
      </div>
    )
  }
}

export default Field
