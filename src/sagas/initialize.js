import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { unschema } from 'schema'

import { env } from 'config'

import { sectionMapping } from 'helpers/migrate'

export function* updateSectionData(name, data) {
  try {
    yield all(Object.keys(data).map((subsection) => {
      const key = sectionMapping[`${name}/${subsection}`]
      const sectionData = unschema(data[subsection])

      if (key) {
        console.log('INIT FORM DATA', name, subsection, key)
        return put({ type: actionTypes.SET_SECTION, section: key, data: sectionData })
      }

      return put(
        updateApplication(
          name,
          subsection,
          sectionData,
        )
      )
    }))
  } catch (e) {
    yield call(env.History().push, '/error')
  }
}

export function* setFormData(action) {
  const { data, cb } = action

  try {
    yield all(Object.keys(data)
      .map(section => call(updateSectionData, section, data[section])))

    yield put(validateFormData())

    yield call(cb)
  } catch (e) {
    yield call(env.History().push, '/error')
  }
}

export function* initializeFormData() {
  yield takeLatest(actionTypes.SET_FORM_DATA, setFormData)
}
