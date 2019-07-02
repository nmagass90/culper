import { validateModel } from 'models/validate'
import identificationBirthPlace from '../identificationBirthPlace'

describe('The identificationBirthPlace model', () => {
  it('Location is required', () => {
    const testData = {}
    const expectedErrors = ['Location.required']

    expect(validateModel(testData, identificationBirthPlace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Location must be a valid birthplace', () => {
    const testData = {
      Location: {
        state: 'MA',
        country: '',
      },
    }
    const expectedErrors = ['Location.location']

    expect(validateModel(testData, identificationBirthPlace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid IdentificationBirthPlace', () => {
    const testData = {
      Location: {
        city: 'Boston',
        state: 'MA',
        county: 'Boston',
        country: 'United States',
      },
    }

    expect(validateModel(testData, identificationBirthPlace)).toEqual(true)
  })

  it('passes a valid foreign birth place', () => {
    const testData = {
      Location: {
        city: 'Toronto',
        country: {
          value: ['Canada'],
        },
      },
    }

    expect(validateModel(testData, identificationBirthPlace)).toEqual(true)
  })
})
