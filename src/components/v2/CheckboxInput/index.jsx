/* eslint jsx-a11y/label-has-for: */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import withFormField from 'components/v2/FormField/withFormField'

class CheckboxInput extends React.Component {
  state = {
    isFocused: false,
  }

  handleChange = (e) => {
    const { onChange, name } = this.props
    onChange(name, e.target.checked)
  }

  handleFocus = (e) => {
    const { onFocus } = this.props
    this.setState({ isFocused: true })
    onFocus(e)
  }

  handleBlur = (e) => {
    const { onBlur } = this.props
    this.setState({ isFocused: false })
    onBlur(e)
  }

  handleKeyDown = (e) => {
    // TODO
  }

  render() {
    const {
      inputId, name, value, isError, isValid, disabled, readonly, className,
      label, ariaLabel, children,
    } = this.props

    const checked = value == true

    const classes = classnames(
      className,
      {
        disabled,
        'usa-input-error': isError,
      }
    )

    const labelClasses = classnames(
      'checkbox',
      {
        'usa-input-error-label': isError,
        checked,
      }
    )

    const inputClasses = classnames({
      'usa-input-success': isValid,
    })

    return (
      <div className={classes}>
        <input
          id={inputId}
          name={name}
          type="checkbox"
          className={inputClasses}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          aria-label={ariaLabel}
          checked={checked}
        />
        <label
          htmlFor={inputId}
          className={labelClasses}
        >
          {children}
          <span>{label}</span>
        </label>
      </div>
    )
  }
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isError: PropTypes.bool,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

CheckboxInput.defaultProps = {
  ariaLabel: null,
  children: null,
  value: '',
  isError: false,
  isValid: false,
  disabled: false,
  className: '',
  readonly: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default CheckboxInput

export const CheckboxInputWithFormField = withFormField(CheckboxInput)
