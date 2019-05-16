/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import CheckboxGroup from './CheckboxGroup'

export const optionsDefault = [
      {
        label: "Neighbor",
        id: "neighbor",
        name: "relationship"
      }, {
        label: "Friend",
        id: "friend",
        name: "relationship"
      }, {
        label: "Landlord",
        id: "landlord",
        name: "relationship"
      }, {
        label: "Other",
        id: "other",
        name: "relationship"
      }
    ]

export const optionsDisabled = [
      {
        label: "Neighbor",
        id: "neighbor",
        name: "relationship",
        disabled: true
      }, {
        label: "Friend",
        id: "friend",
        name: "relationship",
        disabled: true
      }, {
        label: "Landlord",
        id: "landlord",
        name: "relationship",
        disabled: true
      }, {
        label: "Other",
        id: "other",
        name: "relationship",
        disabled: true
      }
    ]

storiesOf('CheckboxGroup', module)
  .add('Default', () => (
    <CheckboxGroup
      legend="Relationship"
      option={optionsDefault}
    >
    </CheckboxGroup>
  ))
  .add('Disabled', () => (
    <CheckboxGroup
      legend="Relationship"
      option={optionsDisabled}
    >
    </CheckboxGroup>
  ))
  .add('With error', () => (
    <CheckboxGroup
      legend="Relationship"
      option={optionsDefault}
      error
    >
    </CheckboxGroup>
  ))