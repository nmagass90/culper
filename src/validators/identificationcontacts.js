import { validateModel } from 'models/validate'
import identificationContacts, {
  contactPhoneNumber,
} from 'models/sections/identificationContacts'

export const validateContactPhoneNumber = data => (
  validateModel(data, contactPhoneNumber) === true
)

export const validateIdentificationContactInformation = data => (
  validateModel(data, identificationContacts) === true
)

/** LEGACY */
export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.data = data
  }

  validPhoneTypes() {
    return validateModel(this.data, {
      PhoneNumbers: identificationContacts.PhoneNumbers,
    }) === true
  }

  isValid() {
    return validateIdentificationContactInformation(this.data)
  }
}

export class ContactPhoneNumberValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateContactPhoneNumber(this.data)
  }
}
