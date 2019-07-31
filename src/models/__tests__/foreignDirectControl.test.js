import { validateModel } from 'models/validate'
import foreignDirectControl from 'models/sections/foreignDirectControl'

describe('The foreign direct control section', () => {
  describe('HasInterests', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = [
        'HasInterests.required',
      ]

      expect(validateModel(testData, foreignDirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasInterests: { value: 'Invalid' },
      }
      const expectedErrors = [
        'HasInterests.hasValue',
      ]

      expect(validateModel(testData, foreignDirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasInterests: { value: 'No' },
      }

      expect(validateModel(testData, foreignDirectControl)).toEqual(true)
    })
  })

  describe('List', () => {
    it('requires a list if HasInterest', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
      }
      const expectedErrors = [
        'List.required',
      ]

      expect(validateModel(testData, foreignDirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid list', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
        List: {
          branch: { type: '' },
          items: [
            {
              Item: {
                InterestTypes: {
                  values: [
                    'Yourself',
                    'Spouse',
                    'Cohabitant',
                    'DependentChildren',
                  ],
                },
                InterestType: { value: 'Test' },
                Acquired: {
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
                HowAcquired: { value: 'Magic' },
                Cost: { value: '1000' },
                Value: { value: '1000' },
                Relinquished: {},
                RelinquishedNotApplicable: { applicable: false },
                Explanation: {},
                CoOwners: {
                  List: {
                    items: [
                      {
                        Item: {
                          Has: {
                            name: 'branchcollection',
                            value: 'No',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      }
      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, foreignDirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid list', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                InterestTypes: {
                  values: [
                    'Yourself',
                    'Spouse',
                    'Cohabitant',
                    'DependentChildren',
                  ],
                },
                InterestType: { value: 'Test' },
                Acquired: {
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
                HowAcquired: { value: 'Magic' },
                Cost: { value: '1000' },
                Value: { value: '1000' },
                Relinquished: {},
                RelinquishedNotApplicable: { applicable: false },
                Explanation: {},
                CoOwners: {
                  List: {
                    items: [
                      {
                        Item: {
                          Has: {
                            name: 'branchcollection',
                            value: 'No',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, foreignDirectControl))
        .toEqual(true)
    })
  })
})
