/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RadioGroup from './RadioGroup'
import Radio from '../Radio/Radio'

storiesOf('RadioGroup', module)
  .add('Default', () => (
    <RadioGroup
      legend="Radio group New"
    >
      <Radio
        id="radio1"
        label="Yes"
        value="yes"
        name="radioGroup1"
      />
      <Radio
        id="radio2"
        label="No"
        value="no"
        name="radioGroup1"
      />
    </RadioGroup>
  ))
  .add('Disabled', () => (
    <RadioGroup
      legend="Radio group New"
    >
      <Radio
        id="radio1"
        label="Yes"
        value="yes"
        name="radioGroup1"
        disabled
      />
      <Radio
        id="radio2"
        label="No"
        value="no"
        name="radioGroup1"
        disabled
      />
    </RadioGroup>
  ))
  .add('With error', () => (
    <RadioGroup
      legend="Radio group New"
      error
    >
      <Radio
        id="radio1"
        label="Yes"
        value="yes"
        name="radioGroup1"
      />
      <Radio
        id="radio2"
        label="No"
        value="no"
        name="radioGroup1"
      />
    </RadioGroup>
  ))