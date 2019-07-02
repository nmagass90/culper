import { validateModel } from 'models/validate'
import identificationBirthDate from '../identificationBirthDate'

describe('The identificationBirthDate model', () => {
  it('Date is required', () => {
    const testData = {}
    const expectedErrors = ['Date.required']

    expect(validateModel(testData, identificationBirthDate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: {
        year: '1980',
        day: '14',
      },
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, identificationBirthDate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be within the applicant birthdate constraints', () => {
    const testData = {
      Date: {
        year: '2019',
        month: '08',
        day: '14',
      },
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, identificationBirthDate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid IdentificationBirthDate', () => {
    const testData = {
      Date: {
        year: '1980',
        month: '08',
        day: '14',
      },
    }

    expect(validateModel(testData, identificationBirthDate)).toEqual(true)
  })
})
