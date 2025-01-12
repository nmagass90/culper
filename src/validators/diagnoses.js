import { validateModel } from 'models/validate'
import diagnoses from 'models/diagnoses'

export const validateDiagnoses = (data, formType, options = {}) => (
  validateModel(data, diagnoses, options)
)

export default class DiagnosesValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDiagnosisList() {
    return validateModel(this.data, {
      DiagnosisList: diagnoses.DiagnosisList,
    }) === true
  }

  validTreatmentList() {
    return validateModel(this.data, {
      TreatmentList: diagnoses.TreatmentList,
    }) === true
  }

  isValid() {
    return validateDiagnoses(this.data) === true
  }
}
