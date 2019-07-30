import { validateModel } from 'models/validate'
import militaryForeignMilitary from 'models/sections/militaryForeignMilitary'

describe('The military foreign military section', () => {
  it('requires a list', () => {
    const testData = {}
    const expectedErorrs = ['List.required']

    expect(validateModel(testData, militaryForeignMilitary))
      .toEqual(expect.arrayContaining(expectedErorrs))
  })

  it('requires a valid branch collection', () => {
    const testData = {
      List: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Organization: { value: 'Military' },
              Name: { value: 'Army' },
              Dates: {
                name: 'Dates',
                from: {
                  name: 'from',
                  month: '12',
                  day: '12',
                  year: '2010',
                  estimated: false,
                },
                to: {
                  name: 'to',
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
              },
              Country: { value: ['Cambodia'] },
              Rank: { value: 'Test' },
              Division: { value: 'Test' },
              Circumstances: { value: 'Test' },
              ReasonLeft: { value: 'Test' },
              MaintainsContact: { value: 'No' },
            },
          },
        ],
      },
    }
    const expectedErorrs = ['List.branchCollection']

    expect(validateModel(testData, militaryForeignMilitary))
      .toEqual(expect.arrayContaining(expectedErorrs))
  })

  it('validates a valid branch collection', () => {
    const testData = {
      List: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Organization: { value: 'Military' },
              Name: { value: 'Army' },
              Dates: {
                name: 'Dates',
                from: {
                  name: 'from',
                  month: '12',
                  day: '12',
                  year: '2010',
                  estimated: false,
                },
                to: {
                  name: 'to',
                  month: '12',
                  day: '12',
                  year: '2015',
                  estimated: false,
                },
              },
              Country: { value: ['Cambodia'] },
              Rank: { value: 'Test' },
              Division: { value: 'Test' },
              Circumstances: { value: 'Test' },
              ReasonLeft: { value: 'Test' },
              MaintainsContact: { value: 'No' },
            },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }

    expect(validateModel(testData, militaryForeignMilitary))
      .toEqual(true)
  })
})
