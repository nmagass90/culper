import { hasYesOrNo } from 'models/validate'
import militaryDiscipline from 'models/militaryDiscipline'

const militaryDisciplinaryProcedures = {
  HasDisciplinary: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    const { HasDisciplinary } = attributes
    if (HasDisciplinary && HasDisciplinary.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: militaryDiscipline },
      }
    }

    return {}
  },
}

export default militaryDisciplinaryProcedures
