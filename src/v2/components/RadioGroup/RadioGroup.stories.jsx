/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RadioGroup from './RadioGroup'

export const optionsDefault = [
      {
        label: "Owned by you",
        id: "owned",
        name: "residence-type"
      }, {
        label: "Rented or leased by you",
        id: "rented",
        name: "residence-type"
      }, {
        label: "Military housing",
        id: "military",
        name: "residence-type"
      }, {
        label: "Other",
        id: "other",
        name: "residence-type"
      }
    ]

export const optionsDisabled = [
      {
        label: "Owned by you",
        id: "owned",
        name: "residence-type",
        disabled: true
      }, {
        label: "Rented or leased by you",
        id: "rented",
        name: "residence-type",
        disabled: true
      }, {
        label: "Military housing",
        id: "military",
        name: "residence-type",
        disabled: true
      }, {
        label: "Other",
        id: "other",
        name: "residence-type",
        disabled: true
      }
    ]

export const optionsBranch = [
      {
        label: "Yes",
        id: "yes",
        name: "branch"
      }, {
        label: "No",
        id: "no",
        name: "branch"
      }
    ]

storiesOf('RadioGroup', module)
  .add('Default', () => (
    <RadioGroup
      legend="Is/was this residence"
      option={optionsDefault}
    >
    </RadioGroup>
  ))
  .add('Disabled', () => (
    <RadioGroup
      legend="Is/was this residence"
      option={optionsDisabled}
    >
    </RadioGroup>
  ))
  .add('With error', () => (
    <RadioGroup
      legend="Is/was this residence"
      option={optionsDefault}
      error
    >
    </RadioGroup>
  ))
  .add('yes/no branch', () => (
    <RadioGroup
      legend="Do you have former federal civilian employment, excluding military service, NOT indicated previously, to report?"
      option={optionsBranch}
      branch
    >
    </RadioGroup>
  ))