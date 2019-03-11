import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SectionList from './SectionList'

describe('The SectionList component', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const mountSection = (sections) => {
    const store = mockStore({
      authentication: { authenticated: true, formType: 'SF86' },
      application: { Errors: {}, Completed: {} },
    })

    return mount(
      <Provider store={store}>
        <MemoryRouter>
          <SectionList sections={sections} />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders a link', () => {
    const sections = [
      {
        name: 'blah',
        url: 'blah',
      },
    ]

    const component = mountSection(sections)
    expect(component.find('a').length).toBe(1)
  })
})
