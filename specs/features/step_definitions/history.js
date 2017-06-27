const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

const filenum = () => {
  const size = 4
  const num = counter++

  let s = '' + num
  while (s.length < size) {
    s = '0' + s
  }

  return s
}

let range = 10

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the history section$/, () => {
    return navigateToSection('history')
  })

  When(/^I go to the history (.*?) section$/, (subsection) => {
    const section = 'history'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the history (.*?) section$/, (subsection) => {
    const section = 'history'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'residence':
      return completeResidence(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the history (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('history', subsection)
  })
})

const completeResidence = (promise) => {
  return promise
    .then(() => { return setDomesticAddress('.residence .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return checkValue('.history .stats .fraction .completed', '0') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setOption('.residence .daterange .from-present .block label') })
    .then(() => { return setOption('.residence .role.option-list .block label') })
    .then(() => { return checkValue('.history .stats .fraction .completed', range) })
    .then(() => { return setText('.residence .reference .first input', 'John') })
    .then(() => { return setText('.residence .reference .middle input', 'Q') })
    .then(() => { return setText('.residence .reference .last input', 'Public') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.month input', '1') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.day input', '1') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.year input', getCurrentYear()-range) })
    .then(() => { return setOption('.residence .relationship .block label') })
    .then(() => { return setDomesticTelephone('.residence .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setText('.residence .reference-email input', 'test@test.com') })
    .then(() => { return setDomesticAddress('.residence .reference-address .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
}

const navigateToSection = (section) => {
  const selector = '.section a[href="/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .mailing input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-telephone.png')
}

const tab = (selector) => {
  return client
    .assert.visible(selector)
    .sendKeys(selector, client.Keys.TAB)
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-text.png')
}

const click = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-click.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-date.png')
}

const checkValue = (selector, value) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .assert.containsText(selector, value)
    .saveScreenshot('./screenshots/History/' + filenum() + '-check-value.png')
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}
