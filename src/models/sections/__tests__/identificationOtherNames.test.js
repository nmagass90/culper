import { validateModel } from 'models/validate'
import identificationOtherNames, { otherName } from '../identificationOtherNames'

describe('The otherName model', () => {
  it('Name is required', () => {
    const testData = {}

    const expectedErrors = ['Name.required']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'test',
    }

    const expectedErrors = ['Name.model']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('MaidenName is required', () => {
    const testData = {}

    const expectedErrors = ['MaidenName.required']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('MaidenName must have a value', () => {
    const testData = {
      MaidenName: { value: '' },
    }

    const expectedErrors = ['MaidenName.hasValue']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DatesUsed is required', () => {
    const testData = {}

    const expectedErrors = ['DatesUsed.required']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DatesUsed must be a valid date range', () => {
    const testData = {
      DatesUsed: {
        from: {
          month: '1',
          day: '1',
          year: '2010',
        },
        to: {},
      },
    }

    const expectedErrors = ['DatesUsed.daterange']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason is required', () => {
    const testData = {}

    const expectedErrors = ['Reason.required']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = {
      Reason: false,
    }

    const expectedErrors = ['Reason.hasValue']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid otherName', () => {
    const testData = {
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        suffix: 'Jr',
      },
      MaidenName: {
        value: 'Foo',
      },
      DatesUsed: {
        from: {
          month: '1',
          day: '1',
          year: '2010',
        },
        to: {
          month: '1',
          day: '1',
          year: '2012',
        },
        present: false,
      },
      Reason: {
        value: 'Testing',
      },
    }

    expect(validateModel(testData, otherName)).toEqual(true)
  })
})

describe('The identificationOtherNames model', () => {
  it('HasOtherNames is required', () => {
    const testData = {}

    const expectedErrors = ['HasOtherNames.required']

    expect(validateModel(testData, identificationOtherNames))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasOtherNames must have a valid value', () => {
    const testData = {
      HasOtherNames: { value: 'foo' },
    }

    const expectedErrors = ['HasOtherNames.hasValue']

    expect(validateModel(testData, identificationOtherNames))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('with other names', () => {
    it('List is required', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: null,
      }

      const expectedErrors = ['List.required']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be valid other names', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Name: {
                  first: '',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                MaidenName: {
                  value: 'Foo',
                },
                DatesUsed: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                Reason: {
                  value: 'Testing',
                },
              },
            },
          ],
        },
      }

      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, identificationOtherNames))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid identificationOtherNames', () => {
      const testData = {
        HasOtherNames: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                MaidenName: {
                  value: 'Foo',
                },
                DatesUsed: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                },
                Reason: {
                  value: 'Testing',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, identificationOtherNames)).toEqual(true)
    })
  })

  describe('without other names', () => {
    it('passes a valid identificationOtherNames', () => {
      const testData = {
        HasOtherNames: { value: 'No' },
      }

      expect(validateModel(testData, identificationOtherNames)).toEqual(true)
    })
  })
})
