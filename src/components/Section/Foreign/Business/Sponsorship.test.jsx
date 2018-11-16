import React from 'react'
import { mount } from 'enzyme'
import Sponsorship from './Sponsorship'
import { i18n } from '../../../../config'

describe('The foreign business sponsorship component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'No' }
    }
    const component = mount(<Sponsorship {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' }
    }
    const component = mount(<Sponsorship {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      }
    }
    const component = mount(<Sponsorship {...expected} />)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' },
      List: {
        items: [
          {
            Name: {},
            Birthdate: {},
            Birthplace: {},
            Address: {},
            Citizenship: {},
            Organization: {},
            Dates: {},
            Residence: {},
            Stay: {},
            Sponsorship: {}
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Sponsorship {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component
      .find('.foreign-business-sponsorship-name .first input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-birthdate .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-address .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-citizenship input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-organization input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-residence .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-stay textarea')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-sponsorship textarea')
      .simulate('change')
    expect(updates).toBe(9)
  })

  describe('handles dates', () => {
    it('with good data', () => {
      const props = {
        name: "Sponsorship",
        HasForeignSponsorship: {
          value: 'Yes'
        },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        List: {
          items: [{
            Item: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "Birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              Dates: {
                from: {
                  estimated: false,
                  day: "1",
                  month: "1",
                  name: "from",
                  year: "1990",
                  date: new Date("1990", "1", "1")
                },
              },
          },
          open: true
        }]
      },
        valid: true
      }

      const component = mount(<Sponsorship {...props} />)
      expect(component.find('.error-messages [data-i18n="error.daterange.from.min"]').children().length).toEqual(0)
    })
    it('with bad data', () => {
      const props = {
        name: "Sponsorship",
        HasForeignSponsorship: {
          value: 'Yes'
        },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        List: {
          items: [{
            Item: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "Birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              Dates: {
                from: {
                  estimated: false,
                  day: "1",
                  month: "1",
                  name: "from",
                  year: "1950",
                  date: new Date("1950", "1", "1")
                },
              },
          },
          open: true
        }]
      },
        valid: false
      }

      const component = mount(<Sponsorship {...props} />)
      expect(component.find('.error-messages [data-i18n="error.daterange.from.min"]').text()).toEqual(
        `${i18n.t('error.daterange.from.min.title')}${i18n.t('error.daterange.from.min.message')}`
      )
    })
  })


})
