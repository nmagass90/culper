import { validateModel } from 'models/validate'
import identificationName from '../identificationName'

describe('The identificationName model', () => {
  it('Name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, identificationName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'Some name',
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, identificationName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid IdentificationName', () => {
    const testData = {
      Name: {
        first: 'My',
        middle: 'T',
        middleInitialOnly: true,
        last: 'Name',
        suffix: 'II',
      },
    }

    expect(validateModel(testData, identificationName)).toEqual(true)
  })
})
