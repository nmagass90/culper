import { hasYesOrNo } from 'models/validate'
import name from 'models/shared/name'

export const otherName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  DatesUsed: { presence: true, daterange: true },
  Reason: { presence: true, hasValue: true },
}

const identificationOtherNames = {
  HasOtherNames: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasOtherNames
      && attributes.HasOtherNames.value
      && attributes.HasOtherNames.value === 'No') return {}

    return {
      presence: true,
      accordion: { validator: otherName },
    }
  },
}

export default identificationOtherNames
