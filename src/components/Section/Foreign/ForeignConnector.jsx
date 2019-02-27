import React from 'react'
	import PropTypes from 'prop-types'
	import { connect } from 'react-redux'

	import {
	  updateApplication,
	  reportErrors
	} from '@actions/ApplicationActions'

	const connectForeignSection = (Component, { section, subsection, store, storeKey }) => {
	  class ConnectedForeignSection extends React.Component {
	    constructor(props) {
	      super(props)

	      this.section = section
	      this.subsection = subsection
	      this.store = store

	    }

	    handleError = (value, arr) => {
	      const action = reportErrors(this.section, this.subsection, arr)
	      this.props.dispatch(action)
	      return arr
	    }

	    handleUpdate = (field, values) => {
	      this.props.dispatch(updateApplication(this.store, field, values))
	    }

	    render () {
	      return (
	        <Component
	          onUpdate={this.handleUpdate}
	          onError={this.handleError}
	          {...this.props}
	        />
	      )
	    }
	  }

	  ConnectedForeignSection.propTypes = {
	    Comments: PropTypes.object,
	    update: PropTypes.func,
	    validator: PropTypes.func,
	    dispatch: PropTypes.func, // Passed in via connect (below)
	  }

	  const mapStateToProps = (state) => {
	    const app = state.application || {}
	    const foreign = app.Foreign || {}
	    const errors = app.Errors || {}
	    const completed = app.Completed || {}

	    switch (storeKey) {
	      case 'Passport':
	        return { ...foreign.Passport } || {}
	      case 'Contacts':
	        return { ...foreign.Contacts } || {}
	      case 'DirectActivity':
          return { ...foreign.DirectActivity } || {}
        case 'IndirectActivity':
          return { ...foreign.IndirectActivity } || {}
        case 'RealEstateActivity':
          return { ...foreign.RealEstateActivity } || {}
        case 'BenefitActivity':
          return { ...foreign.BenefitActivity } || {}
        case 'Support':
          return { ...foreign.Support } || {}
        case 'Advice':
          return { ...foreign.Advice } || {}
        case 'Family':
          return { ...foreign.Family } || {}
        case 'Employment':
          return { ...foreign.Employment } || {}
        case 'Ventures':
          return { ...foreign.Ventures } || {}
        case 'Conferences':
          return { ...foreign.Conferences } || {}
        case 'Contact':
          return { ...foreign.Contact } || {}
        case 'Sponsorship':
          return { ...foreign.Sponsorship } || {}
        case 'Political':
          return { ...foreign.Political } || {}
        case 'Voting':
          return { ...foreign.Voting } || {}
        case 'Travel':
          return { ...foreign.Travel } || {}
	      default:
	        return {
	          Application: app,
	          Foreign: foreign,
            Passport: foreign.Passport,
            Contacts: foreign.Contacts,
            DirectActivity: foreign.DirectActivity,
            IndirectActivity: foreign.IndirectActivity,
            RealEstateActivity: foreign.RealEstateActivity,
            BenefitActivity: foreign.BenefitActivity,
            Support: foreign.Support,
            Advice: foreign.Advice,
            Family: foreign.Family,
            Employment: foreign.Employment,
            Ventures: foreign.Ventures,
            Conferences: foreign.Ventures,
            Contact: foreign.Contact,
            Sponsorship: foreign.Sponsorship,
            Political: foreign.Political,
            Voting: foreign.Voting,
            Travel: foreign.Travel,
	          Errors: errors.foreign || [],
	          Completed: completed.foreign || []
	        }
	    }
	  }

	  return connect(mapStateToProps)(ConnectedForeignSection)
	}

	export default connectForeignSection