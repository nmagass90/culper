import React from 'react'

import i18n from 'util/i18n'
import {
  Field,
  DateControl,
  Name,
  BranchCollection,
  ForeignBornDocuments,
  SSN,
  ValidationElement,
  Suggestions,
  Show,
  Country,
  Location,
} from 'components/Form'
import { pickDate } from 'validators/helpers'
import { countryString } from 'validators/location'

import OtherName from './OtherName'

export default class Cohabitant extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherNames = this.updateOtherNames.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateCohabitationBegan = this.updateCohabitationBegan.bind(this)
    this.renderSpouseSuggestion = this.renderSpouseSuggestion.bind(this)
    this.dismissSpouseSuggestion = this.dismissSpouseSuggestion.bind(this)
    this.onSpouseSuggestion = this.onSpouseSuggestion.bind(this)
    this.clear = this.clear.bind(this)
    this.isForeignBornDocumentationDisplayed = this.isForeignBornDocumentationDisplayed.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      BirthPlace: this.props.BirthPlace,
      ForeignBornDocument: this.props.ForeignBornDocument,
      SSN: this.props.SSN,
      OtherNames: this.props.OtherNames,
      Citizenship: this.props.Citizenship,
      CohabitationBegan: this.props.CohabitationBegan,
      SameSpouse: this.props.SameSpouse,
      ...queue,
    })
  }

  clear() {
    const state = {
      Name: {},
      Birthdate: null,
      BirthPlace: null,
      ForeignBornDocument: null,
      SSN: null,
      OtherNames: null,
      Citizenship: null,
      CohabitationBegan: null,
      SameSpouse: false,
      SameSpouseConfirmed: false,
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(state)
    }
  }

  updateName(values) {
    if (this.props.SameSpouseConfirmed) {
      return
    }

    const similarSpouse = this.hasSimilarSpouse(values)

    this.update({
      Name: values,
      SameSpouse: similarSpouse,
    })
  }

  hasSimilarSpouse = (data) => {
    const { spouse } = this.props

    if (!data || !spouse) return false

    const { first, middle, last } = data
    if (first === spouse.first
      && middle === spouse.middle
      && last === spouse.last) return true

    return false
  }

  updateBirthdate(values) {
    this.update({
      Birthdate: values,
    })
  }

  updateBirthPlace(values) {
    this.update({
      BirthPlace: values,
    })
  }

  updateForeignBornDocument(values) {
    this.update({
      ForeignBornDocument: values,
    })
  }

  updateSSN(values) {
    this.update({
      SSN: values,
    })
  }

  updateOtherNames(values) {
    this.update({
      OtherNames: values,
    })
  }

  updateCitizenship(values) {
    this.update({
      Citizenship: values,
    })
  }

  updateCohabitationBegan(values) {
    this.update({
      CohabitationBegan: values,
    })
  }

  renderSpouseSuggestion() {
    const { spouse } = this.props
    const name = spouse
      ? `${spouse.first || ''} ${spouse.middle || ''} ${spouse.last
          || ''}`.trim()
      : ''
    return <div>{name}</div>
  }

  onSpouseSuggestion() {
    this.clear()
  }

  dismissSpouseSuggestion() {
    this.update({
      SameSpouseConfirmed: true,
      SameSpouse: false,
    })
  }

  isForeignBornDocumentationDisplayed() {
    const country = countryString(this.props.BirthPlace.country)

    switch (country) {
      case 'United States':
        return false
      case '':
      // '' means that 'Outside the U.S.' is selected, but no country entered yet
        return true
      case undefined:
      // undefined means the form is clean and untouched
        return false
      default:
      // only other options should be a typed country other than 'United States'
        return true
    }
  }

  render() {
    const { requireRelationshipMaritalForeignBornDocExpiration } = this.props
    const cohabitationBeganMinDate = pickDate([this.props.applicantBirthdate, this.props.Birthdate])
    return (
      <div className="cohabitant">
        <Suggestions
          className="spouse-suggestion"
          suggestionTitle={i18n.t('relationships.cohabitant.suggestion.title')}
          suggestionParagraph={i18n.m(
            'relationships.cohabitant.suggestion.paragraph'
          )}
          suggestionDismissLabel={i18n.t(
            'relationships.cohabitant.suggestion.dismissLabel'
          )}
          suggestionLabel={i18n.t('relationships.cohabitant.suggestion.label')}
          suggestionUseLabel={i18n.t(
            'relationships.cohabitant.suggestion.useLabel'
          )}
          suggestions={[this.props.spouse]}
          renderSuggestion={this.renderSpouseSuggestion}
          withSuggestions={false}
          show={this.props.SameSpouse}
          onDismiss={this.dismissSpouseSuggestion}
          onSuggestion={this.onSpouseSuggestion}
        />
        <Field
          title={i18n.t('relationships.cohabitant.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Name
            name="Name"
            className="cohabitant-name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          help="relationships.cohabitant.help.birthdate"
          title={i18n.t('relationships.cohabitant.heading.birthdate')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="datecontrol"
        >
          <DateControl
            name="birthdate"
            className="birthdate"
            {...this.props.Birthdate}
            relationship="Other"
            onUpdate={this.updateBirthdate}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.cohabitant.heading.birthplace')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="birthplace"
            {...this.props.BirthPlace}
            layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
            className="birthplace"
            label={i18n.t('relationships.cohabitant.label.birthplace')}
            onUpdate={this.updateBirthPlace}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Show when={this.isForeignBornDocumentationDisplayed()}>
          <ForeignBornDocuments
            name="foreignBornDocument"
            title={i18n.t(
              'relationships.cohabitant.heading.foreignBornDocument'
            )}
            {...this.props.ForeignBornDocument}
            onUpdate={this.updateForeignBornDocument}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            requireExpirationDate={requireRelationshipMaritalForeignBornDocExpiration}
          />
        </Show>

        <Field
          title={i18n.t('relationships.cohabitant.heading.ssn')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <SSN
            name="ssn"
            {...this.props.SSN}
            onUpdate={this.updateSSN}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <BranchCollection
          label={i18n.t('relationships.cohabitant.heading.othernames')}
          className="cohabitant-othernames"
          appendLabel={i18n.t(
            'relationships.cohabitant.heading.appendOthernames'
          )}
          {...this.props.OtherNames}
          onError={this.props.onError}
          onUpdate={this.updateOtherNames}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        >
          <OtherName
            name="Item"
            bind={true}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </BranchCollection>

        <Field
          title={i18n.t('relationships.cohabitant.heading.citizenship')}
          help="relationships.cohabitant.help.citizenship"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="country"
        >
          <Country
            name="Citizenship"
            {...this.props.Citizenship}
            multiple={true}
            className="relationships-cohabitant-citizenship"
            onUpdate={this.updateCitizenship}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          help="relationships.cohabitant.help.cohabitationBegan"
          title={i18n.t('relationships.cohabitant.heading.cohabitationBegan')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="datecontrol"
        >
          <DateControl
            name="cohabitationBegan"
            className="cohabitation-began"
            prefix="cohabitant"
            minDate={cohabitationBeganMinDate}
            {...this.props.CohabitationBegan}
            minDateEqualTo={true}
            onUpdate={this.updateCohabitationBegan}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Cohabitant.defaultProps = {
  Name: {},
  Birthdate: {},
  BirthPlace: {},
  ForeignBornDocument: {},
  SSN: {},
  OtherNames: { items: [] },
  Citizenship: {},
  CohabitationBegan: {},
  SameSpouse: false,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  requireRelationshipMaritalForeignBornDocExpiration: true,
}
