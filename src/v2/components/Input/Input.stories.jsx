/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from './Input'

storiesOf('Inputs', module)
  .add('Text input (default)', () => (
    <Input
      label="First name"
      type="text"
    />
  ))
  .add('Email input', () => (
    <Input
      label="Home email address"
      type="email"
    />
  ))
  .add('Number input', () => (
    <Input
      label="How many homes have you had?"
      type="number"
    />
  ))
  .add('Input with error', () => (
    <Input
      label="First name"
      type="text"
      error
    />
  ))
  .add('Input with success', () => (
    <Input
      label="First name"
      type="text"
      success
    />
  ))
