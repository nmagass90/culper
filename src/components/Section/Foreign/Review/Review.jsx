import React from 'react'
import Passport from 'components/Section/Foreign/Passport'
import Contacts from 'components/Section/Foreign/Contacts'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support
} from 'components/Section/Foreign/Activities'
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
} from 'components/Section/Foreign/Business'
import Travel from 'components/Section/Foreign/Travel'

const Review = () => {
  return (
    <div>
      <Passport
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Contacts
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <DirectActivity
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <IndirectActivity
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <RealEstateActivity
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <BenefitActivity
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Support
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Advice
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Family
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Employment
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Ventures
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Conferences
        required={true}
        scrollIntoView={false}
      />
      <hr className="section-divider" />
      <Contact
        required={true}
        scrollIntoView={false}
      />

      <hr className="section-divider" />
      <Sponsorship
        required={true}
        scrollIntoView={false}
      />

      <hr className="section-divider" />
      <Political
        required={true}
        scrollIntoView={false}
      />

      <hr className="section-divider" />
      <Voting
        required={true}
        scrollIntoView={false}
      />

      <hr className="section-divider" />
      <Travel
        required={true}
        scrollIntoView={false}
      />
    </div>
  )
}

export default Review
