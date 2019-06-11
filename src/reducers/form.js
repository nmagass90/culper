import { UPDATE_FORM } from 'constants/actionTypes'

const defaultState = {}

const form = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_FORM: {
      const {
        section, field, value,
      } = action

      const newSection = state[section]
        ? { ...state[section] }
        : {}

      const newSectionData = newSection.data
        ? { ...newSection.data }
        : {}

      newSectionData[field] = value

      return {
        ...state,
        [`${section}`]: {
          ...newSection,
          data: newSectionData,
        },
      }
    }

    default:
      return state
  }
}

export default form
