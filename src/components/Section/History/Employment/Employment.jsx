import React from 'react'
import i18n from 'util/i18n'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'
import { Accordion, Branch } from 'components/Form'
import { openState } from 'components/Form/Accordion/Accordion'
import { newGuid } from 'components/Form/ValidationElement'
import {
  today, daysAgo, extractDate, validDate,
} from 'components/Section/History/dateranges'
import { InjectGaps, EmploymentCustomSummary } from 'components/Section/History/summaries'
import EmploymentItem from 'components/Section/History/Employment/EmploymentItem'
import { Gap } from 'components/Section/History/Gap'

import { getYearsString } from 'helpers/text'

import { HISTORY, HISTORY_EMPLOYMENT } from 'config/formSections/history'

const sectionConfig = {
  key: HISTORY_EMPLOYMENT.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_EMPLOYMENT.name,
  storeKey: HISTORY_EMPLOYMENT.storeKey,
}

const byline = (item, index, initial, translation, required, isValid) => {
  // If item is required and not currently opened and is not valid, show message
  switch (true) {
    case required && !item.open && !isValid:
    case !item.open && !initial && item.Item && !isValid:
      return (
        <div className={`byline ${openState(item, initial)} fade in`.trim()}>
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h5 className="usa-alert-heading">{i18n.m(translation)}</h5>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

export class Employment extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.employment = null
  }

  customEmploymentByline = (item, index, initial) => {
    const { required, errors, overrideInitial } = this.props

    const newInitial = overrideInitial ? false : initial
    const itemHasErrors = errors && errors.filter(e => e.indexOf(item.uuid) > -1).length > 0

    return byline(
      item,
      index,
      newInitial,
      'history.employment.default.collection.summary.incomplete',
      required,
      !itemHasErrors,
    )
  }

  sortEmploymentItems = employmentItems => (
    employmentItems.sort((a, b) => {
      if (a.type === 'Gap') { return 1 }
      if (b.type === 'Gap') { return -1 }

      if (
        a.Item && a.Item.Dates && validDate(a.Item.Dates.to)
        && b.Item && b.Item.Dates && validDate(b.Item.Dates.to)
      ) {
        const aDateObj = a.Item.Dates.to
        const bDateObj = b.Item.Dates.to
        const aDate = extractDate(aDateObj)
        const bDate = extractDate(bDateObj)

        return bDate.getTime() - aDate.getTime()
      }

      return 0
    })
  )

  update = (queue) => {
    const updatedValues = {
      List: this.props.List,
      EmploymentRecord: this.props.EmploymentRecord,
      ...queue,
    }

    if (queue.List) {
      updatedValues.List = {
        ...queue.List,
        items: this.sortEmploymentItems(queue.List.items),
      }
    }

    this.props.onUpdate('Employment', updatedValues)
  }

  fillGap = () => {
    const items = [...this.props.List.items]
    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        name: 'Item',
        Dates: {
          name: 'Dates',
          receiveProps: true,
          present: false,
        },
      },
    })

    this.update({
      List: {
        items: InjectGaps(items, daysAgo(365 * this.props.totalYears))
          .sort(this.sort)
          .filter(item => !item.type || (item.type && item.type !== 'Gap')),
        branch: {},
      },
    })
  }

  customEmploymentDetails = (item, index, initial, callback) => {
    const { totalYears } = this.props

    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap
          title={i18n.t('history.employment.gap.title')}
          para={i18n.t('history.employment.gap.para', { years: totalYears })}
          btnText={i18n.t('history.employment.gap.btnText')}
          first={index === 0}
          dates={dates}
          onClick={() => { this.fillGap(dates) }}
        />
      )
    }

    return callback()
  }

  inject = items => InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))

  render() {
    const { recordYears, errors } = this.props
    const recordYearsString = getYearsString(recordYears)
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content employment"
        data-section={HISTORY.key}
        data-subsection={HISTORY_EMPLOYMENT.key}
      >
        <Accordion
          scrollToTop={this.props.scrollToTop}
          defaultState={this.props.defaultState}
          {...this.props.List}
          ref={(el) => { this.employment = el }}
          sort={this.props.sort}
          inject={this.inject}
          realtime={this.props.realtime}
          onUpdate={(values) => {
            this.update({ List: values })
          }}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customEmploymentByline}
          customSummary={EmploymentCustomSummary}
          customDetails={this.customEmploymentDetails}
          description={i18n.t(
            'history.employment.default.collection.summary.title',
          )}
          appendTitle={i18n.t(
            'history.employment.default.collection.appendTitle',
          )}
          appendLabel={i18n.t('history.employment.default.collection.append')}
          appendClass="no-margin-bottom"
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          errors={accordionErrors}
        >
          <EmploymentItem
            bind={true}
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            recordYears={recordYears}
          />
        </Accordion>
        <hr className="section-divider" />
        <Branch
          label={i18n.t('history.employment.default.employmentRecord.title', { years: recordYears, yearsString: recordYearsString })}
          className="employment-record"
          labelSize="h4"
          {...this.props.EmploymentRecord}
          onUpdate={(values) => {
            if (values.value === 'Yes') {
              this.employment.add()
              return
            }

            this.update({
              EmploymentRecord: values,
            })
          }}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('history.employment.default.employmentRecord.list')}
          {i18n.m('history.employment.default.employmentRecord.para')}
        </Branch>
      </div>
    )
  }
}

Employment.defaultProps = {
  List: Accordion.defaultList,
  EmploymentRecord: {},
  scrollIntoView: false,
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  recordYears: 7,
  overrideInitial: false,
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'history',
  subsection: 'employment',
  addressBooks: {},
  dispatch: () => {},
  errors: [],
}

export default connectSubsection(Employment, sectionConfig)
