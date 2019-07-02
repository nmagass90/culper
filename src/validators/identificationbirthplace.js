import { validateModel } from 'models/validate'
import identificationBirthPlace from 'models/sections/identificationBirthPlace'

export const validateIdentificationBirthPlace = data => (
  validateModel(data, identificationBirthPlace) === true
)

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data)
  }
}
