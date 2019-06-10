import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import { InputWithFormField } from 'components/v2/Input'
import CheckboxInput from 'components/v2/CheckboxInput'
import nameModel from 'models/shared/name'

import { validateModel } from 'models/validate'
import { getEffectiveModel } from 'components/v2/Input/modelValidations'

const NameFieldset = (props) => {
  const {
    value, title, className, disabled, required, prefix, onUpdate,
  } = props

  const classes = classnames('name', className, { disabled })

  const onChange = (name, newValue) => {
    onUpdate({
      ...value,
      [`${name}`]: newValue,
    })
  }

  const {
    first, middle, last, firstInitialOnly, middleInitialOnly, noMiddleName,
  } = value

  const inputProps = {
    disabled,
    required,
    onChange,
  }

  const effectiveNameModel = getEffectiveModel(nameModel, value)
  const errors = validateModel(value, nameModel) === true
    ? []
    : validateModel(value, nameModel)


  const firstInitialOnlyCheckbox = (
    <div className="modifier">
      <CheckboxInput
        label={i18n.t(`${prefix}.label.initialOnly`)}
        value={firstInitialOnly}
        inputId="firstInitialOnly"
        name="firstInitialOnly"
        {...inputProps}
      />
    </div>
  )

  const middleInitialOnlyCheckbox = (
    <div className="modifier">
      <CheckboxInput
        label={i18n.t(`${prefix}.label.initialOnly`)}
        value={middleInitialOnly}
        inputId="middleInitialOnly"
        name="middleInitialOnly"
        {...inputProps}
      />
    </div>
  )

  const noMiddleNameCheckbox = (
    <div className="modifier">
      <CheckboxInput
        label={i18n.t(`${prefix}.label.noMiddle`)}
        value={noMiddleName}
        inputId="noMiddleName"
        name="noMiddleName"
        {...inputProps}
      />
    </div>
  )

  return (
    <fieldset className={classes}>
      {title && <legend>{title}</legend>}

      <InputWithFormField
        name="first"
        label={i18n.t(`${prefix}.label.first`)}
        helptext={i18n.m('identification.name.first.help.message')}
        value={first}
        {...inputProps}
        modifiers={firstInitialOnlyCheckbox}
        model={getEffectiveModel(effectiveNameModel.first, value)}
        errors={errors.filter(e => e.indexOf('first') > -1)}
      />

      <InputWithFormField
        name="middle"
        label={i18n.t(`${prefix}.label.middle`)}
        value={middle}
        {...inputProps}
        model={getEffectiveModel(effectiveNameModel.middle, value)}
        errors={errors.filter(e => e.indexOf('middle') > -1)}
        disabled={noMiddleName}
        modifiers={(
          <span>
            {noMiddleNameCheckbox}
            {middleInitialOnlyCheckbox}
          </span>
        )}
      />

      <InputWithFormField
        name="last"
        label={i18n.t(`${prefix}.label.last`)}
        value={last}
        {...inputProps}
        model={getEffectiveModel(effectiveNameModel.last, value)}
        errors={errors.filter(e => e.indexOf('last') > -1)}
      />
    </fieldset>
  )
}

NameFieldset.propTypes = {
  value: PropTypes.object,
  prefix: PropTypes.string,
  onUpdate: PropTypes.func,
}

NameFieldset.defaultProps = {
  value: {},
  prefix: 'name',
  onUpdate: () => {},
}

export default NameFieldset
