/**
 * Input requirements
 * Generic text input (text, email, number, password)
 *
 * TODO:
 * - aria-describedby ? Generic gives this an error name
 * - auto tab
 */

/* eslint jsx-a11y/label-has-for: */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import withFormField from 'components/v2/FormField/withFormField'

import { getValidationPropsFromModel } from './modelValidations'

class Input extends React.Component {
  state = {
    isFocused: false,
    // hasBlurred: false,
  }

  handleChange = (e) => {
    const { onChange, name } = this.props
    onChange(name, e.target.value)
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
    // TODO autotab
  }

  allowClipboard = (e) => {
    const { clipboard } = this.props
    if (!clipboard) e.preventDefault()
  }

  render() {
    const {
      inputId, name, type, placeholder, value, isError, isValid, disabled,
      required, readonly, autocapitalize, autocorrect, autocomplete, spellcheck,
      className, label, ariaLabel, model,
    } = this.props

    const validationProps = getValidationPropsFromModel(model)

    const { isFocused } = this.state

    const classes = classnames(
      'hide-for-print',
      className,
      { 'usa-input-error': isError && !disabled }
    )

    const inputClasses = classnames({
      'usa-input-focus': !disabled && isFocused,
      'usa-input-success': !disabled && isValid,
    }, className)

    const labelClasses = classnames({
      disabled,
      'usa-input-error-label': isError && !disabled,
    })

    return (
      <div className={classes}>
        <label
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
        </label>
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readonly}
          autoCapitalize={autocapitalize}
          autoCorrect={autocorrect}
          autoComplete={autocomplete}
          spellCheck={spellcheck}
          aria-label={ariaLabel}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onCopy={this.allowClipboard}
          onCut={this.allowClipboard}
          onPaste={this.allowClipboard}
          {...validationProps}
        />
        {/* for print CSS */}
        <div className="text-print print-only">
          {value}
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  clipboard: PropTypes.bool,
  spellcheck: PropTypes.bool,
  autocapitalize: PropTypes.bool,
  autocorrect: PropTypes.bool,
  autocomplete: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

Input.defaultProps = {
  ariaLabel: null,
  type: 'text',
  value: '',
  placeholder: '',
  isError: false,
  isValid: false,
  disabled: false,
  required: false,
  className: '',
  clipboard: true,
  spellcheck: true,
  autocapitalize: true,
  autocorrect: true,
  autocomplete: true,
  readonly: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default Input

export const InputWithFormField = withFormField(Input)
