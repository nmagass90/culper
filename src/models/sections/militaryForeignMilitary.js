import militaryForeign from 'models/militaryForeign'

const militaryForeignMilitary = {
  List: {
    presence: true,
    branchCollection: {
      validator: militaryForeign,
    },
  },
}

export default militaryForeignMilitary
