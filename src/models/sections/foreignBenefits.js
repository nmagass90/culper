import { hasYesOrNo } from 'models/validate'
import foreignBenefit from 'models/foreignBenefit'

const foreignBenefits = {
  HasBenefits: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    if (attributes.HasBenefits && attributes.HasBenefits.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignBenefit },
      }
    }

    return {}
  },
}

export default foreignBenefits
