import { validateModel } from 'models/validate'
import consultation from 'models/consultation'

export const validateConsultations = (data, formType, options = {}) => (
  validateModel(data, consultation, options)
)

export default class ConsultationValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateConsultations(this.data) === true
  }
}
