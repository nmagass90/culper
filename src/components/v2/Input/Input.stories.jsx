/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import Input, { InputWithFormField } from './index'

storiesOf('Input', module)
  .add('default', () => (
    <Input
      label="My Form Field"
      name="formField"
    />
  ))
  .add('with a value', () => (
    <Input
      label="My Form Field"
      name="formField"
      value="Test value"
    />
  ))
  .add('with FormField', () => (
    <InputWithFormField
      label="My Form Field"
      name="formField"
      value="Test value"
    />
  ))
  .add('with FormField and errors', () => (
    <InputWithFormField
      label="My Form Field"
      name="formField"
      value="Test value"
      isError
      errors={['This field is required', 'Invalid value']}
    />
  ))
  .add('with FormField and help text', () => (
    <InputWithFormField
      label="My Form Field"
      name="formField"
      value="Test value"
      helptext="Help text"
    />
  ))
  .add('with FormField and errors and help text', () => (
    <InputWithFormField
      label="My Form Field"
      name="formField"
      value="Test value"
      helptext="Help text"
      isError
      errors={['This field is required', 'Invalid value']}
    />
  ))
