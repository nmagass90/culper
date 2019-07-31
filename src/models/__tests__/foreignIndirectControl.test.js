import { validateModel } from 'models/validate'
import foreignIndirectControl from 'models/sections/foreignIndirectControl'

describe('The foreign indirect control section', () => {
  describe('HasInterests', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = [
        'HasInterests.required',
      ]

      expect(validateModel(testData, foreignIndirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasInterests: { value: 'Invalid' },
      }
      const expectedErrors = [
        'HasInterests.hasValue',
      ]

      expect(validateModel(testData, foreignIndirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasInterests: { value: 'No' },
      }

      expect(validateModel(testData, foreignIndirectControl)).toEqual(true)
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

      expect(validateModel(testData, foreignIndirectControl))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid list', () => {
      const testData = {
        HasInterests: { value: 'Yes' },
        List: {
          branch: { value: '' },
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
                InterestType: { value: 'Property' },
                Firstname: { value: 'John' },
                Lastname: { value: 'Doe' },
                Acquired: {
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
                Relationship: { value: 'met him randomly' },
                HowAcquired: { value: 'gift' },
                Cost: { value: '1000' },
                Value: { value: '1000' },
                Sold: {
                  month: '12',
                  day: '12',
                  year: '2018',
                  estimated: false,
                },
                SoldNotApplicable: { applicable: true },
                Explanation: { value: 'testing' },
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

      expect(validateModel(testData, foreignIndirectControl))
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
                InterestType: { value: 'Property' },
                Firstname: { value: 'John' },
                Lastname: { value: 'Doe' },
                Acquired: {
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
                Relationship: { value: 'met him randomly' },
                HowAcquired: { value: 'gift' },
                Cost: { value: '1000' },
                Value: { value: '1000' },
                Sold: {
                  month: '12',
                  day: '12',
                  year: '2018',
                  estimated: false,
                },
                SoldNotApplicable: { applicable: true },
                Explanation: { value: 'testing' },
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

      expect(validateModel(testData, foreignIndirectControl))
        .toEqual(true)
    })
  })
})
