/* eslint import/prefer-default-export: 0 */
import { validateModel } from 'models/validate'
import identificationName from 'models/sections/identificationName'

export const validateIdentificationName = data => (
  validateModel(data, identificationName) === true
)
