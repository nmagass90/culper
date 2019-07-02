import { validateModel } from 'models/validate'
import identificationBirthDate from 'models/sections/identificationBirthDate'

export const validateIdentificationBirthDate = data => (
  validateModel(data, identificationBirthDate) === true
)

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
