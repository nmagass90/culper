import { all } from 'redux-saga/effects'

import { initializeFormData } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'

export const selectFormSection = (state, section) => (
  state.form && state.form[section]
)

export const selectState = state => state

export default function* rootSaga() {
  yield all([
    initializeFormData(),
    validateWatcher(),
  ])
}
