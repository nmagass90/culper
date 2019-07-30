import { validateModel } from 'models/validate'
import militaryDisciplinaryProcedures from 'models/sections/militaryDisciplinaryProcedures'

describe('The military disciplinary prodecures section', () => {
  describe('HasDisciplinary', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = [
        'HasDisciplinary.required',
      ]

      expect(validateModel(testData, militaryDisciplinaryProcedures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('errors on invalid value', () => {
      const testData = {
        HasDisciplinary: { value: 'Invalid' },
      }
      const expectedErrors = [
        'HasDisciplinary.hasValue',
      ]

      expect(validateModel(testData, militaryDisciplinaryProcedures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates on valid value', () => {
      const testData = {
        HasDisciplinary: { value: 'No' },
      }

      expect(validateModel(testData, militaryDisciplinaryProcedures)).toEqual(true)
    })
  })

  describe('List', () => {
    it('requires a list if HasDisciplinary', () => {
      const testData = {
        HasDisciplinary: { value: 'Yes' },
      }
      const expectedErrors = ['List.required']

      expect(validateModel(testData, militaryDisciplinaryProcedures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid list if HasDisciplinary', () => {
      const testData = {
        HasDisciplinary: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {},
            },
          ],
        },
      }
      const expectedErrors = ['List.accordion']

      expect(validateModel(testData, militaryDisciplinaryProcedures))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid list', () => {
      const testData = {
        HasDisciplinary: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Date: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                Offenses: {
                  value: 'Littering',
                },
                Name: {
                  value: 'Local law',
                },
                Court: {
                  value: 'In the Congo',
                },
                Outcome: {
                  value: 'Lost my right hand',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, militaryDisciplinaryProcedures))
        .toEqual(true)
    })
  })
})
