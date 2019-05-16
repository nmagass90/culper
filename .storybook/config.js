import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

import './storybook.css'
import '../src/eqip.scss'
import '../src/v2/v2.scss'

addDecorator(withA11y)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.jsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
