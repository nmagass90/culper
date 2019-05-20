/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import DateControl from './DateControl'

storiesOf('DateControl', module)
  .add('Default', () => (
    <DateControl
      legend="Provide your date of birth"
    />
  ))
  .add('Month and year', () => (
    <DateControl
      legend="Provide your date of birth"
      hideDay
    />
  ))
