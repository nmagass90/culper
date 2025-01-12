import { validateModel, hasYesOrNo } from 'models/validate'
import drugVoluntaryTreatment from 'models/drugVoluntaryTreatment'

export const validateDrugVoluntaryTreatment = data => (
  validateModel(data, drugVoluntaryTreatment)
)

export const validateDrugVoluntaryTreatments = (data, formType, options = {}) => {
  const drugVoluntaryTreatmentsModel = {
    TreatmentVoluntary: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.TreatmentVoluntary
        && attributes.TreatmentVoluntary.value === 'Yes') {
        return { presence: true, accordion: { validator: drugVoluntaryTreatment } }
      }
      return {}
    },
  }

  return validateModel(data, drugVoluntaryTreatmentsModel, options)
}

export default class DrugVoluntaryTreatmentsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugVoluntaryTreatments(this.data) === true
  }
}

export class DrugVoluntaryTreatmentValidator {
  constructor(data = {}) {
    this.data = data
  }

  validTreatmentCompleted() {
    return validateModel(this.data, {
      TreatmentCompleted: drugVoluntaryTreatment.TreatmentCompleted,
      NoTreatmentExplanation: drugVoluntaryTreatment.NoTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateDrugVoluntaryTreatment(this.data) === true
  }
}
