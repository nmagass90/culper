import phone from 'models/shared/phone'
import email from 'models/shared/email'

const identificationContacts = {
  HomeEmail: (value, attributes) => {
    if (attributes.WorkEmail && attributes.WorkEmail.value) return {}
    return {
      presence: true,
      model: { validator: email },
    }
  },
  WorkEmail: (value, attributes) => {
    if (attributes.HomeEmail && attributes.HomeEmail.value) return {}
    return {
      presence: true,
      model: { validator: email },
    }
  },
  PhoneNumbers: {
    presence: true,
    accordion: {
      ignoreBranch: true,
      length: { minimum: 1 },
      validator: {
        Telephone: {
          model: {
            validator: phone,
            requireNumberType: true,
          },
        },
      },
      itemsValidator: (items) => {
        const numberTypes = []
        items.forEach((i) => {
          if (i.Item && i.Item.Telephone) {
            numberTypes.push(i.Item.Telephone.numberType)
          }
        })
        const unique = [...new Set(numberTypes)]
        if (numberTypes.length === unique.length) return null
        return 'Duplicate number types'
      },
    },
  },
}

export default identificationContacts
