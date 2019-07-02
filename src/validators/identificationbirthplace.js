/* eslint import/prefer-default-export: 0 */
import { validateModel } from 'models/validate'
import identificationBirthPlace from 'models/sections/identificationBirthPlace'

export const validateIdentificationBirthPlace = data => (
  validateModel(data, identificationBirthPlace) === true
)
