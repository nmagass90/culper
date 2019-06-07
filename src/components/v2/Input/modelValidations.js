/* eslint import/prefer-default-export: 0 */
import { validate } from 'validate.js'

export const getEffectiveModel = (model, attributes, options = {}) => {
  const effectiveModel = {}

  const constraints = Object.keys(model)
  for (let i = 0; i < constraints.length; i += 1) {
    const constraint = constraints[i] // attributeName
    const constraintValue = model[constraint] // validation function
    if (validate.isFunction(constraintValue)) {
      console.log('constraint function', constraint)
      const value = attributes[constraint] // attribute value
      effectiveModel[constraint] = constraintValue(value, attributes, constraint, options)
      console.log('result', effectiveModel[constraint])
      break
    }

    effectiveModel[constraint] = constraintValue
  }

  return effectiveModel
}

// Input is a validate.js constraints object
// Return object representing props that handle native validation
export const getValidationPropsFromModel = (model = {}) => {
  const props = {}

  const constraints = Object.keys(model)
  for (let i = 0; i < constraints.length; i += 1) {
    const constraint = constraints[i]
    switch (constraint) {
      case 'presence':
        props.required = model[constraint]
        break

      case 'format':
        props.pattern = model[constraint]
        break

      case 'length': {
        const length = model[constraint]
        if (length.is) {
          props.maxLength = length.is
          props.minLength = length.is
        }

        if (length.maximum) props.maxLength = length.maximum
        if (length.minimum) props.minLength = length.minimum
        break
      }

      default:
        // no op
    }
  }

  return props
}
