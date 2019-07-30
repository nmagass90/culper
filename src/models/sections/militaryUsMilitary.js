import { hasYesOrNo, checkValue } from 'models/validate'
import militaryService from 'models/militaryService'

const militaryUsMilitary = {
  HasServed: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => (
    checkValue(attributes.HasServed, 'Yes')
      ? {
        presence: true,
        accordion: { validator: militaryService },
      } : {}
  ),
}

export default militaryUsMilitary
