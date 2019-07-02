/* eslint import/prefer-default-export: 0 */
import { validateModel } from 'models/validate'
import identificationBirthDate from 'models/sections/identificationBirthDate'

export const validateIdentificationBirthDate = data => (
  validateModel(data, identificationBirthDate) === true
)
