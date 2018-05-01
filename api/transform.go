package api

// transform provides a library of possible transformations to
// be made on a JSON structure converting it in to an Entity
// interface.
var transform = map[string]func() (Entity, bool){
	"benefit":                                         func() (Entity, bool) { return &Benefit{}, false },
	"branch":                                          func() (Entity, bool) { return &Branch{}, false },
	"checkbox":                                        func() (Entity, bool) { return &Checkbox{}, false },
	"checkboxgroup":                                   func() (Entity, bool) { return &CheckboxGroup{}, false },
	"civilunion":                                      func() (Entity, bool) { return &CivilUnion{}, false },
	"clearancelevel":                                  func() (Entity, bool) { return &ClearanceLevel{}, false },
	"collection":                                      func() (Entity, bool) { return &Collection{}, false },
	"contacts":                                        func() (Entity, bool) { return &Contacts{}, false },
	"coowners":                                        func() (Entity, bool) { return &CoOwners{}, false },
	"country":                                         func() (Entity, bool) { return &Country{}, false },
	"datecontrol":                                     func() (Entity, bool) { return &DateControl{}, false },
	"daterange":                                       func() (Entity, bool) { return &DateRange{}, false },
	"email":                                           func() (Entity, bool) { return &Email{}, false },
	"employmentactivity":                              func() (Entity, bool) { return &EmploymentActivity{}, false },
	"foreignborndocument":                             func() (Entity, bool) { return &ForeignBornDocument{}, false },
	"height":                                          func() (Entity, bool) { return &Height{}, false },
	"location":                                        func() (Entity, bool) { return &Location{}, false },
	"name":                                            func() (Entity, bool) { return &Name{}, false },
	"notapplicable":                                   func() (Entity, bool) { return &NotApplicable{}, false },
	"number":                                          func() (Entity, bool) { return &Number{}, false },
	"physicaladdress":                                 func() (Entity, bool) { return &PhysicalAddress{}, false },
	"radio":                                           func() (Entity, bool) { return &Radio{}, false },
	"reasonleft":                                      func() (Entity, bool) { return &ReasonLeft{}, false },
	"sentence":                                        func() (Entity, bool) { return &Sentence{}, false },
	"signature":                                       func() (Entity, bool) { return &Signature{}, false },
	"ssn":                                             func() (Entity, bool) { return &SSN{}, false },
	"supervisor":                                      func() (Entity, bool) { return &Supervisor{}, false },
	"telephone":                                       func() (Entity, bool) { return &Telephone{}, false },
	"text":                                            func() (Entity, bool) { return &Text{}, false },
	"textarea":                                        func() (Entity, bool) { return &Textarea{}, false },
	"identification.name":                             func() (Entity, bool) { return &IdentificationName{}, true },
	"identification.contacts":                         func() (Entity, bool) { return &IdentificationContacts{}, true },
	"identification.othernames":                       func() (Entity, bool) { return &IdentificationOtherNames{}, true },
	"identification.birthdate":                        func() (Entity, bool) { return &IdentificationBirthDate{}, true },
	"identification.birthplace":                       func() (Entity, bool) { return &IdentificationBirthPlace{}, true },
	"identification.ssn":                              func() (Entity, bool) { return &IdentificationSSN{}, true },
	"identification.physical":                         func() (Entity, bool) { return &IdentificationPhysical{}, true },
	"identification.comments":                         func() (Entity, bool) { return &IdentificationComments{}, true },
	"financial.bankruptcy":                            func() (Entity, bool) { return &FinancialBankruptcy{}, true },
	"financial.gambling":                              func() (Entity, bool) { return &FinancialGambling{}, true },
	"financial.taxes":                                 func() (Entity, bool) { return &FinancialTaxes{}, true },
	"financial.card":                                  func() (Entity, bool) { return &FinancialCard{}, true },
	"financial.credit":                                func() (Entity, bool) { return &FinancialCredit{}, true },
	"financial.delinquent":                            func() (Entity, bool) { return &FinancialDelinquent{}, true },
	"financial.nonpayment":                            func() (Entity, bool) { return &FinancialNonpayment{}, true },
	"financial.comments":                              func() (Entity, bool) { return &FinancialComments{}, true },
	"history.residence":                               func() (Entity, bool) { return &HistoryResidence{}, true },
	"history.employment":                              func() (Entity, bool) { return &HistoryEmployment{}, true },
	"history.education":                               func() (Entity, bool) { return &HistoryEducation{}, true },
	"history.federal":                                 func() (Entity, bool) { return &HistoryFederal{}, true },
	"history.comments":                                func() (Entity, bool) { return &HistoryComments{}, true },
	"relationships.status.marital":                    func() (Entity, bool) { return &RelationshipsMarital{}, true },
	"relationships.status.cohabitant":                 func() (Entity, bool) { return &RelationshipsCohabitants{}, true },
	"relationships.people":                            func() (Entity, bool) { return &RelationshipsPeople{}, true },
	"relationships.relatives":                         func() (Entity, bool) { return &RelationshipsRelatives{}, true },
	"relationships.comments":                          func() (Entity, bool) { return &RelationshipsComments{}, true },
	"citizenship.status":                              func() (Entity, bool) { return &CitizenshipStatus{}, true },
	"citizenship.multiple":                            func() (Entity, bool) { return &CitizenshipMultiple{}, true },
	"citizenship.passports":                           func() (Entity, bool) { return &CitizenshipPassports{}, true },
	"citizenship.comments":                            func() (Entity, bool) { return &CitizenshipComments{}, true },
	"military.selective":                              func() (Entity, bool) { return &MilitarySelective{}, true },
	"military.history":                                func() (Entity, bool) { return &MilitaryHistory{}, true },
	"military.disciplinary":                           func() (Entity, bool) { return &MilitaryDisciplinary{}, true },
	"military.foreign":                                func() (Entity, bool) { return &MilitaryForeign{}, true },
	"military.comments":                               func() (Entity, bool) { return &MilitaryComments{}, true },
	"foreign.passport":                                func() (Entity, bool) { return &ForeignPassport{}, true },
	"foreign.contacts":                                func() (Entity, bool) { return &ForeignContacts{}, true },
	"foreign.travel":                                  func() (Entity, bool) { return &ForeignTravel{}, true },
	"foreign.activities.benefits":                     func() (Entity, bool) { return &ForeignActivitiesBenefits{}, true },
	"foreign.activities.direct":                       func() (Entity, bool) { return &ForeignActivitiesDirect{}, true },
	"foreign.activities.indirect":                     func() (Entity, bool) { return &ForeignActivitiesIndirect{}, true },
	"foreign.activities.realestate":                   func() (Entity, bool) { return &ForeignActivitiesRealEstate{}, true },
	"foreign.activities.support":                      func() (Entity, bool) { return &ForeignActivitiesSupport{}, true },
	"foreign.business.advice":                         func() (Entity, bool) { return &ForeignBusinessAdvice{}, true },
	"foreign.business.conferences":                    func() (Entity, bool) { return &ForeignBusinessConferences{}, true },
	"foreign.business.contact":                        func() (Entity, bool) { return &ForeignBusinessContact{}, true },
	"foreign.business.employment":                     func() (Entity, bool) { return &ForeignBusinessEmployment{}, true },
	"foreign.business.family":                         func() (Entity, bool) { return &ForeignBusinessFamily{}, true },
	"foreign.business.political":                      func() (Entity, bool) { return &ForeignBusinessPolitical{}, true },
	"foreign.business.sponsorship":                    func() (Entity, bool) { return &ForeignBusinessSponsorship{}, true },
	"foreign.business.ventures":                       func() (Entity, bool) { return &ForeignBusinessVentures{}, true },
	"foreign.business.voting":                         func() (Entity, bool) { return &ForeignBusinessVoting{}, true },
	"foreign.comments":                                func() (Entity, bool) { return &ForeignComments{}, true },
	"substance.drugs.clearance":                       func() (Entity, bool) { return &SubstanceDrugClearance{}, true },
	"substance.drugs.misuse":                          func() (Entity, bool) { return &SubstanceDrugMisuse{}, true },
	"substance.drugs.ordered":                         func() (Entity, bool) { return &SubstanceDrugOrdered{}, true },
	"substance.drugs.publicsafety":                    func() (Entity, bool) { return &SubstanceDrugPublicSafety{}, true },
	"substance.drugs.purchase":                        func() (Entity, bool) { return &SubstanceDrugPurchase{}, true },
	"substance.drugs.usage":                           func() (Entity, bool) { return &SubstanceDrugUsage{}, true },
	"substance.drugs.voluntary":                       func() (Entity, bool) { return &SubstanceDrugVoluntary{}, true },
	"substance.alcohol.negative":                      func() (Entity, bool) { return &SubstanceAlcoholNegative{}, true },
	"substance.alcohol.ordered":                       func() (Entity, bool) { return &SubstanceAlcoholOrdered{}, true },
	"substance.alcohol.voluntary":                     func() (Entity, bool) { return &SubstanceAlcoholVoluntary{}, true },
	"substance.alcohol.additional":                    func() (Entity, bool) { return &SubstanceAlcoholAdditional{}, true },
	"substance.comments":                              func() (Entity, bool) { return &SubstanceComments{}, true },
	"legal.associations.activities-to-overthrow":      func() (Entity, bool) { return &LegalAssociationsActivitiesToOverthrow{}, true },
	"legal.associations.advocating":                   func() (Entity, bool) { return &LegalAssociationsAdvocating{}, true },
	"legal.associations.engaged-in-terrorism":         func() (Entity, bool) { return &LegalAssociationsEngagedInTerrorism{}, true },
	"legal.associations.membership-overthrow":         func() (Entity, bool) { return &LegalAssociationsMembershipOverthrow{}, true },
	"legal.associations.membership-violence-or-force": func() (Entity, bool) { return &LegalAssociationsMembershipViolence{}, true },
	"legal.associations.terrorism-association":        func() (Entity, bool) { return &LegalAssociationsTerrorismAssociation{}, true },
	"legal.associations.terrorist-organization":       func() (Entity, bool) { return &LegalAssociationsTerroristOrganization{}, true },
	"legal.court":                                     func() (Entity, bool) { return &LegalCourt{}, true },
	"legal.investigations.debarred":                   func() (Entity, bool) { return &LegalInvestigationsDebarred{}, true },
	"legal.investigations.history":                    func() (Entity, bool) { return &LegalInvestigationsHistory{}, true },
	"legal.investigations.revoked":                    func() (Entity, bool) { return &LegalInvestigationsRevoked{}, true },
	"legal.police.additionaloffenses":                 func() (Entity, bool) { return &LegalPoliceAdditionalOffenses{}, true },
	"legal.police.domesticviolence":                   func() (Entity, bool) { return &LegalPoliceDomesticViolence{}, true },
	"legal.police.offenses":                           func() (Entity, bool) { return &LegalPoliceOffenses{}, true },
	"legal.technology.manipulating":                   func() (Entity, bool) { return &LegalTechnologyManipulating{}, true },
	"legal.technology.unauthorized":                   func() (Entity, bool) { return &LegalTechnologyUnauthorized{}, true },
	"legal.technology.unlawful":                       func() (Entity, bool) { return &LegalTechnologyUnlawful{}, true },
	"legal.comments":                                  func() (Entity, bool) { return &LegalComments{}, true },
	"psychological.competence":                        func() (Entity, bool) { return &PsychologicalCompetence{}, true },
	"psychological.consultations":                     func() (Entity, bool) { return &PsychologicalConsultations{}, true },
	"psychological.diagnoses":                         func() (Entity, bool) { return &PsychologicalDiagnoses{}, true },
	"psychological.conditions":                        func() (Entity, bool) { return &PsychologicalExisting{}, true },
	"psychological.hospitalizations":                  func() (Entity, bool) { return &PsychologicalHospitalizations{}, true },
	"psychological.comments":                          func() (Entity, bool) { return &PsychologicalComments{}, true },
	"psychological.treatment":                         func() (Entity, bool) { return &Treatment{}, false },
	"submission.releases":                             func() (Entity, bool) { return &Submission{}, true },
	"package.submit":                                  func() (Entity, bool) { return &Submission{}, true },
	"submission.additionalcomments":                   func() (Entity, bool) { return &SubmissionAdditionalComments{}, true },
	"submission.general":                              func() (Entity, bool) { return &SubmissionGeneral{}, true },
	"submission.medical":                              func() (Entity, bool) { return &SubmissionMedical{}, true },
	"submission.credit":                               func() (Entity, bool) { return &SubmissionCredit{}, true },
	"submission.attachments":                          func() (Entity, bool) { return &SubmissionAttachments{}, true },
}
