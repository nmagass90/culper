import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import withFormField from 'components/v2/FormField/withFormField'

class Select extends React.Component {
  handleChange = (e) => {
    const { onChange, name } = this.props
    console.log('ON CHANGE', name, e.target.value)
    onChange(name, e.target.value)
  }

  render() {
    const {
      inputId, name, value, isError, isValid, disabled, readonly, className,
      label, ariaLabel, options, optional,
    } = this.props

    const wrapperClasses = classnames(
      className,
      { 'usa-input-error': isError }
    )

    const selectClasses = classnames(
      { 'usa-input-success': isValid }
    )

    return (
      <div className={wrapperClasses}>
        <label
          htmlFor={inputId}
          className={'title label'}
        >
          {label}{optional && (
            <span className="optional">(optional)</span>
          )}
        </label>

        <select
          id={inputId}
          name={name}
          onChange={this.handleChange}
          value={value}
          disabled={disabled}
          className={selectClasses}
        >
          {options.map(o => (
            <option
              key={`${name}-option-${o.value}`}
              label={o.label}
              value={o.value}
            >
              {o.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  ariaLabel: PropTypes.string,
  value: PropTypes.string,
  isError: PropTypes.bool,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

Select.defaultProps = {
  ariaLabel: null,
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

export default Select

export const SelectWithFormField = withFormField(Select)
