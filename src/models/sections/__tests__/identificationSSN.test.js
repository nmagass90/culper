import { validateModel } from 'models/validate'
import identificationSSN from '../identificationSSN'

describe('The identificationSSN model', () => {
  it('ssn is required', () => {
    const testData = {}
    const expectedErrors = ['ssn.required']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('fails if ssn is invalid', () => {
    const testData = {
      ssn: {
        first: '999',
        middle: '99',
        last: '9999',
        notApplicable: false,
      },
      verified: true,
    }

    const expectedErrors = ['ssn.ssn']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('fails if ssn is not verified', () => {
    const testData = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234',
        notApplicable: false,
      },
      verified: false,
    }

    const expectedErrors = ['verified.requireTrue']

    expect(validateModel(testData, identificationSSN))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid IdentificationSSN', () => {
    const testData = {
      ssn: {
        first: '123',
        middle: '12',
        last: '1234',
        notApplicable: false,
      },
      verified: true,
    }

    expect(validateModel(testData, identificationSSN)).toEqual(true)
  })

  describe('if not applicable', () => {
    it('passes a valid IdentificationSSN', () => {
      const testData = {
        ssn: {
          first: '',
          middle: '',
          last: '',
          notApplicable: true,
        },
        verified: false,
      }

      expect(validateModel(testData, identificationSSN)).toEqual(true)
    })
  })
})
