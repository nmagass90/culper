import { validateModel } from 'models/validate'
import foreignContacts from 'models/sections/foreignContacts'

describe('The foreign contact model', () => {
  describe('HasForeignContacts', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = [
        'HasForeignContacts.required',
      ]

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasForeignContacts: { value: 'Invalid' },
      }
      const expectedErrors = [
        'HasForeignContacts.hasValue',
      ]

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasForeignContacts: { value: 'No' },
      }

      expect(validateModel(testData, foreignContacts)).toEqual(true)
    })
  })

  describe('List', () => {
    it('requires a List when HasForeignContacts', () => {
      const testData = {
        HasForeignContacts: { value: 'Yes' },
      }
      const expectedErrors = ['List.required']

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid List', () => {
      const testData = {
        HasForeignContacts: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                Name: {
                  first: 'John',
                  firstInitialOnly: false,
                  last: 'Doe',
                  middle: 'Smith',
                  middleInitialOnly: false,
                  hideMiddleName: false,
                  noMiddleName: false,
                  suffix: '',
                  suffixOther: '',
                },
                NameNotApplicable: { applicable: true },
                NameExplanation: {},
                FirstContact: {
                  month: '12',
                  day: '12',
                  year: '2005',
                  estimated: false,
                },
                LastContact: {
                  month: '12',
                  day: '12',
                  year: '2018',
                  estimated: false,
                },
                Methods: { values: ['In person'] },
                MethodsExplanation: {},
                Frequency: { value: 'Daily' },
                FrequencyExplanation: {},
                Relationship: { values: ['Professional'] },
                RelationshipExplanation: {},
                Aliases: {
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
                Citizenship: {
                  name: 'Citizenship',
                  value: ['Cambodia'],
                },
                Birthdate: {
                  name: 'Birthdate',
                  month: '12',
                  day: '12',
                  year: '2000',
                  estimated: false,
                },
                BirthdateNotApplicable: { applicable: true },
                Birthplace: {
                  city: 'Hanoi',
                  zipcode: '',
                  state: '',
                  country: {
                    name: 'country',
                    value: ['Vietnam'],
                  },
                  layout: 'City, Country',
                },
                BirthplaceNotApplicable: { applicable: true },
                Address: {},
                AddressNotApplicable: { applicable: false },
                Employer: {},
                EmployerNotApplicable: { applicable: false },
                EmployerAddress: {},
                EmployerAddressNotApplicable: { applicable: false },
                HasAffiliations: { value: 'No' },
                Affiliations: {},
                AlternateAddress: {
                  Address: {},
                  HasDifferentAddress: { value: 'No' },
                  Telephone: {},
                },
              },
            },
          ],
        },
      }
      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, foreignContacts))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid List', () => {
      const testData = {
        HasForeignContacts: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Name: {
                  first: 'John',
                  firstInitialOnly: false,
                  last: 'Doe',
                  middle: 'Smith',
                  middleInitialOnly: false,
                  hideMiddleName: false,
                  noMiddleName: false,
                  suffix: '',
                  suffixOther: '',
                },
                NameNotApplicable: { applicable: true },
                NameExplanation: {},
                FirstContact: {
                  month: '12',
                  day: '12',
                  year: '2005',
                  estimated: false,
                },
                LastContact: {
                  month: '12',
                  day: '12',
                  year: '2018',
                  estimated: false,
                },
                Methods: { values: ['In person'] },
                MethodsExplanation: {},
                Frequency: { value: 'Daily' },
                FrequencyExplanation: {},
                Relationship: { values: ['Professional'] },
                RelationshipExplanation: {},
                Aliases: {
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
                Citizenship: {
                  name: 'Citizenship',
                  value: ['Cambodia'],
                },
                Birthdate: {
                  name: 'Birthdate',
                  month: '12',
                  day: '12',
                  year: '2000',
                  estimated: false,
                },
                BirthdateNotApplicable: { applicable: true },
                Birthplace: {
                  city: 'Hanoi',
                  zipcode: '',
                  state: '',
                  country: {
                    name: 'country',
                    value: ['Vietnam'],
                  },
                  layout: 'City, Country',
                },
                BirthplaceNotApplicable: { applicable: true },
                Address: {},
                AddressNotApplicable: { applicable: false },
                Employer: {},
                EmployerNotApplicable: { applicable: false },
                EmployerAddress: {},
                EmployerAddressNotApplicable: { applicable: false },
                HasAffiliations: { value: 'No' },
                Affiliations: {},
                AlternateAddress: {
                  Address: {},
                  HasDifferentAddress: { value: 'No' },
                  Telephone: {},
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, foreignContacts))
        .toEqual(true)
    })
  })
})
