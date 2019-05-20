/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import DateRange from './DateRange'

storiesOf('DateRange', module)
  .add('Default', () => (
    <DateRange
      legend="Dates of residence"
    />
  ))
