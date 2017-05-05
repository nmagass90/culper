import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Field, Radio, RadioGroup, Show, Checkbox, CheckboxGroup, Textarea } from '../../../../Form'
import OneTimeBenefit from './OneTimeBenefit'
import FutureBenefit from './FutureBenefit'
import ContinuingBenefit from './ContinuingBenefit'

export default class Benefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateBenefitType = this.updateBenefitType.bind(this)
    this.updateOtherBenefitType = this.updateOtherBenefitType.bind(this)
    this.updateBenefitFrequency = this.updateBenefitFrequency.bind(this)
    this.updateOneTimeBenefit = this.updateOneTimeBenefit.bind(this)
    this.updateFutureBenefit = this.updateFutureBenefit.bind(this)
    this.updateContinuingBenefit = this.updateContinuingBenefit.bind(this)
    this.updateOtherBenefit = this.updateOtherBenefit.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        InterestTypes: this.props.InterestTypes,
        BenefitType: this.props.BenefitType,
        OtherBenefitType: this.props.OtherBenefitType,
        BenefitFrequency: this.props.BenefitFrequency,
        OneTimeBenefit: this.props.OneTimeBenefit,
        FutureBenefit: this.props.FutureBenefit,
        ContinuingBenefit: this.props.ContinuingBenefit,
        OtherBenefit: this.props.OtherBenefit,
        [field]: values
      })
    }
  }

  updateInterestTypes (event) {
    let interestType = event.target.value
    let selected = [...(this.props.InterestTypes || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update('InterestTypes', selected)
  }

  updateBenefitType (cb) {
    this.update('BenefitType', cb.target.value)
  }

  updateOtherBenefitType (values) {
    this.update('OtherBenefitType', values)
  }

  updateBenefitFrequency (cb) {
    this.update('BenefitFrequency', cb.target.value)
  }

  updateOneTimeBenefit (values) {
    this.update('OneTimeBenefit', values)
  }

  updateFutureBenefit (values) {
    this.update('FutureBenefit', values)
  }

  updateContinuingBenefit (values) {
    this.update('ContinuingBenefit', values)
  }

  updateOtherBenefit (values) {
    this.update('OtherBenefit', values)
  }

  render () {
    return (
      <div className="benefit">
        <Field title={i18n.t('foreign.activities.benefit.heading.interestTypes')}
          help={'foreign.activities.benefit.help.interestType'}
          adjustFor="big-buttons">

          <p>{i18n.t('foreign.activities.benefit.para.checkAll')}</p>
          <CheckboxGroup className="interest-types"
            selectedValues={this.props.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.m('foreign.activities.benefit.label.interestTypes.yourself')}
              value="Yourself"
              className="yourself"
              onChange={this.updateInterestTypes}
              onValidate={this.props.onValidate}
            />
            <Checkbox name="interest-type"
              label={i18n.m('foreign.activities.benefit.label.interestTypes.spouse')}
              value="Spouse"
              className="spouse"
              onChange={this.updateInterestTypes}
              onValidate={this.props.onValidate}
            />
            <Checkbox name="interest-type"
              label={i18n.m('foreign.activities.benefit.label.interestTypes.cohabitant')}
              value="Cohabitant"
              className="cohabitant"
              onChange={this.updateInterestTypes}
              onValidate={this.props.onValidate}
            />
            <Checkbox name="interest-type"
              label={i18n.m('foreign.activities.benefit.label.interestTypes.dependentChildren')}
              value="DependentChildren"
              className="dependent-children"
              onChange={this.updateInterestTypes}
              onValidate={this.props.onValidate}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.heading.benefitType')}
          help={'foreign.activities.benefit.help.benefitType'}>
          <RadioGroup className="benefit-types" selectedValue={this.props.BenefitType}>
            <Radio name="benefit_type"
              label={i18n.m('foreign.activities.benefit.label.benefitTypes.educational')}
              value="Educational"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.m('foreign.activities.benefit.label.benefitTypes.medical')}
              value="Medical"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.m('foreign.activities.benefit.label.benefitTypes.retirement')}
              value="Retirement"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.m('foreign.activities.benefit.label.benefitTypes.other')}
              value="Other"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
          <Show when={this.props.BenefitType === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.label.otherBenefitType')}
              <Textarea name="OtherBenefitType"
                {...this.props.OtherBenefitType}
                onUpdate={this.updateOtherBenefitType}
                onValidate={this.props.onValidate}
              />
            </div>
          </Show>
        </RadioGroup>
      </Field>

        <Field title={i18n.t('foreign.activities.benefit.heading.benefitFrequency')}
          help={'foreign.activities.benefit.help.benefitFrequency'}>
          <RadioGroup className="benefit-frequency" selectedValue={this.props.BenefitFrequency}>
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.label.benefitFrequency.oneTime')}
              value="OneTime"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.label.benefitFrequency.future')}
              value="Future"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.label.benefitFrequency.continuing')}
              value="Continuing"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.label.benefitFrequency.other')}
              value="Other"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
          <Show when={this.props.BenefitFrequency === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.label.otherBenefit')}
              <Textarea name="OtherBenefit"
                {...this.props.OtherBenefit}
                onUpdate={this.updateOtherBenefit}
                onValidate={this.props.onValidate}
              />
            </div>
          </Show>
        </Field>

        <Show when={this.props.BenefitFrequency === 'OneTime'}>
          <OneTimeBenefit name="OneTimeBenefit"
            {...this.props.OneTimeBenefit}
            onUpdate={this.updateOneTimeBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>

        <Show when={this.props.BenefitFrequency === 'Future'}>
          <FutureBenefit name="FutureBenefit"
            {...this.props.FutureBenefit}
            onUpdate={this.updateFutureBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>

        <Show when={this.props.BenefitFrequency === 'Continuing'}>
          <ContinuingBenefit name="ContinuingBenefit"
            {...this.props.ContinuingBenefit}
            onUpdate={this.updateContinuingBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>
      </div>
    )
  }
}

Benefit.defaultProps = {
  InterestTypes: [],
  BenefitType: '',
  BenefitFrequency: ''
}
