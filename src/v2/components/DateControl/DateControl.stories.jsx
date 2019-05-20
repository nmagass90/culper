/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import DateControl from './DateControl'

storiesOf('DateControl', module)
  .add('Default', () => (
    <DateControl />
  ))
  .add('Month and year', () => (
    <DateControl
      hideDay
    />
  ))
