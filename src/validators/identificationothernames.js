import { validateModel } from 'models/validate'
import identificationOtherNames, { otherName } from 'models/sections/identificationOtherNames'

export const validateOtherName = data => (
  validateModel(data, otherName) === true
)

export const validateOtherNames = data => (
  validateModel(data, identificationOtherNames) === true
)

export default class OtherNamesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateOtherNames(this.data)
  }
}

export class OtherNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateOtherName(this.data)
  }
}
