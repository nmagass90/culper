import { validateModel, hasYesOrNo } from 'models/validate'
import financialCardAbuse from 'models/financialCardAbuse'
import { requireFinancialCardDisciplinaryDate } from 'helpers/branches'
import store from 'services/store'
import * as formTypes from 'constants/formTypes'

const cardAbuseModel = {
  HasCardAbuse: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasCardAbuse } = attributes
    if (HasCardAbuse && HasCardAbuse.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialCardAbuse },
      }
    }
    return {}
  },
}

export const validateFinancialCardAbuse = (data, formType, options = {}) => (
  validateModel(
    data,
    cardAbuseModel,
    {
      ...options,
      requireFinancialCardDisciplinaryDate: requireFinancialCardDisciplinaryDate(formType),
    },
  )
)

export default class CardAbuseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validHasCardAbuse() {
    return validateModel(this.data, { HasCardAbuse: cardAbuseModel.HasCardAbuse }) === true
  }

  validList() {
    return validateModel(this.data, { List: cardAbuseModel.List }) === true
  }

  isValid() {
    return validateFinancialCardAbuse(this.data, this.formType) === true
  }
}

const validateCardAbuseItem = (data, formType) => (
  validateModel(
    data,
    financialCardAbuse,
    { requireFinancialCardDisciplinaryDate: requireFinancialCardDisciplinaryDate(formType) },
  )
)

export class CardAbuseItemValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType = formTypes.SF86 } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validAgency() {
    return validateModel(this.data, { Agency: financialCardAbuse.Agency }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: financialCardAbuse.Address }) === true
  }

  validDate() {
    return validateModel(
      this.data,
      { Date: financialCardAbuse.Date },
      { requireFinancialCardDisciplinaryDate: requireFinancialCardDisciplinaryDate(this.formType) },
    ) === true
  }

  validReason() {
    return validateModel(this.data, { Reason: financialCardAbuse.Reason }) === true
  }

  validAmount() {
    return validateModel(this.data, { Amount: financialCardAbuse.Amount }) === true
  }

  validDescription() {
    return validateModel(this.data, { Description: financialCardAbuse.Description }) === true
  }

  isValid() {
    return validateCardAbuseItem(this.data, this.formType) === true
  }
}
