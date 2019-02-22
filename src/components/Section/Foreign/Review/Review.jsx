import React from 'react'
import Passport from '@components/Section/Foreign/Passport'
import Contacts from '@components/Section/Foreign/Contacts'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support
} from '@components/Section/Foreign/Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting
} from '@components/Section/Foreign/Business'
import Travel from '@components/Section/Foreign/Travel'

const Review = () => {
  return (
    <div>
      <Passport
        name="passport"
        {...this.props.Passport}
        section="foreign"
        subsection="passport"
        dispatch={this.props.dispatch}
        onUpdate={this.updatePassport}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Contacts
        name="contacts"
        {...this.props.Contacts}
        section="foreign"
        subsection="contacts"
        applicantBirthdate={this.props.applicantBirthdate}
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateContacts}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <DirectActivity
        name="directActivity"
        {...this.props.DirectActivity}
        section="foreign"
        subsection="activities/direct"
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateDirectActivity}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <IndirectActivity
        name="indirectActivity"
        {...this.props.IndirectActivity}
        section="foreign"
        subsection="activities/indirect"
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateIndirectActivity}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <RealEstateActivity
        name="realEstateActivity"
        {...this.props.RealEstateActivity}
        section="foreign"
        subsection="activities/realestate"
        dispatch={this.props.dispatch}
        onUpdate={this.updateRealEstateActivity}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <BenefitActivity
        name="benefitActivity"
        {...this.props.BenefitActivity}
        section="foreign"
        subsection="activities/benefits"
        dispatch={this.props.dispatch}
        onUpdate={this.updateBenefitActivity}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Support
        name="support"
        {...this.props.Support}
        section="foreign"
        subsection="activities/support"
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateSupport}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Advice
        name="advice"
        {...this.props.Advice}
        section="foreign"
        subsection="business/advice"
        dispatch={this.props.dispatch}
        onUpdate={this.updateAdvice}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Family
        name="family"
        {...this.props.Family}
        section="foreign"
        subsection="business/family"
        dispatch={this.props.dispatch}
        onUpdate={this.updateFamily}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Employment
        name="employment"
        {...this.props.Employment}
        section="foreign"
        subsection="business/employment"
        dispatch={this.props.dispatch}
        onUpdate={this.updateEmployment}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Ventures
        name="ventures"
        {...this.props.Ventures}
        section="foreign"
        subsection="business/ventures"
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateVentures}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Conferences
        name="Conferences"
        {...this.props.Conferences}
        section="foreign"
        subsection="business/conferences"
        dispatch={this.props.dispatch}
        onUpdate={this.updateConferences}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Contact
        name="Contact"
        {...this.props.Contact}
        section="foreign"
        subsection="business/contact"
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateContact}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Sponsorship
        name="Sponsorship"
        {...this.props.Sponsorship}
        section="foreign"
        subsection="business/sponsorship"
        applicantBirthdate={this.props.applicantBirthdate}
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.updateSponsorship}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Political
        name="Political"
        {...this.props.Political}
        section="foreign"
        subsection="business/political"
        dispatch={this.props.dispatch}
        onUpdate={this.updatePolitical}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Voting
        name="Voting"
        {...this.props.Voting}
        section="foreign"
        subsection="business/voting"
        dispatch={this.props.dispatch}
        onUpdate={this.updateVoting}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Travel
        name="Travel"
        {...this.props.Travel}
        section="foreign"
        subsection="business/travel"
        dispatch={this.props.dispatch}
        onUpdate={this.updateTravel}
        onError={this.handleError}
        required={true}
        scrollIntoView={false}
      />
    </div>
  )
}

export default Review
