import { validateModel } from 'models/validate'
import identificationSSN from 'models/sections/identificationSSN'

export const validateIdentificationSSN = data => (
  validateModel(data, identificationSSN) === true
)

/** LEGACY */
export default class IdentificationSSNValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationSSN(this.data)
  }
}
