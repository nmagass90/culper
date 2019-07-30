import militaryService from 'models/militaryService'
import militaryUsMilitary from 'models/sections/militaryUsMilitary'
import { validateModel } from 'models/validate'

export const validateMilitaryHistory = data => (
  validateModel(data, militaryUsMilitary) === true
)

export const validateMilitaryService = data => (
  validateModel(data, militaryService) === true
)

export default class MilitaryHistoryValidator {
  constructor(data = {}) {
    this.data = data
    this.hasServed = (data.HasServed || {}).value
    this.list = data.List || {}
  }

  validServed() {
    return validateModel(this.data, { HasServed: militaryUsMilitary.HasServed }) === true
  }

  validItems() {
    return validateModel(this.data, { List: militaryUsMilitary.List }) === true
  }

  isValid() {
    return validateMilitaryHistory(this.data)
  }
}

export class MilitaryServiceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateMilitaryService(this.data)
  }
}
