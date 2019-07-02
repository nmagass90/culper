import { validateModel } from 'models/validate'
import identificationContacts from 'models/sections/identificationContacts'
import phone from 'models/shared/phone'

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
    return validateModel(this.data, {
      Telephone: { model: { validator: phone, requireNumberType: true } },
    }) === true
  }
}
