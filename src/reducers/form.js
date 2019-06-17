import { UPDATE_FORM, UPDATE_ERRORS, SET_SECTION } from 'constants/actionTypes'

const defaultState = {}

const form = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SECTION: {
      const { section, data } = action

      console.log('SET SECTION', section, data)

      const newSection = state[section]
        ? { ...state[section] }
        : {}

      return {
        ...state,
        [`${section}`]: {
          ...newSection,
          data,
        },
      }
    }

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

    case UPDATE_ERRORS: {
      const {
        section, errors,
      } = action

      const newSection = state[section]
        ? { ...state[section] }
        : {}

      return {
        ...state,
        [`${section}`]: {
          ...newSection,
          errors: errors !== true && errors,
          complete: errors === true,
        },
      }
    }

    default:
      return state
  }
}

export default form
