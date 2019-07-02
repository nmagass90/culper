import { SELF } from 'constants/dateLimits'

const identificationBirthDate = {
  Date: {
    presence: true,
    date: { ...SELF },
  },
}

export default identificationBirthDate
