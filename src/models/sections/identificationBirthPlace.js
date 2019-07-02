import birthplace from 'models/shared/locations/birthplace'

const identificationBirthPlace = {
  Location: {
    location: { validator: birthplace },
    presence: true,
  },
}

export default identificationBirthPlace
