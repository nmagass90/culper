import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DateControl from './DateControl'

storiesOf('DateControl', module)
  .add('Default', () => (
    <DateControl
    ></DateControl>
  ))
  .add('Month and year', () => (
    <DateControl
    	dayHide
    ></DateControl>
  ))