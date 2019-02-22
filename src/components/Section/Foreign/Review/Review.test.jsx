import React from 'react'
import { shallow } from 'enzyme'
import Review from './Review'

describe('Foreign Review', () => {
  it('renders without crashing', () => {
    shallow(<Review />)
  })
})
