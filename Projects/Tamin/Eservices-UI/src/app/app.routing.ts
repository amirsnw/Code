/*
  Created by: k_kaviani
  Revised by: a_amiri
*/

import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalMainComponent} from './component/portal-main/portal-main.component';
import {PortalLoginComponent} from './component/portal-login/portal-login.component';
import {PortalInsuredComponent} from './component/portal-insured/portal-insured.component';
import {PortalPensionerComponent} from './component/portal-pensioner/portal-pensioner.component';
import {PortalWorkshopComponent} from './component/portal-workshop/portal-workshop.component';
import {PortalMeComponent} from './component/portal-me/portal-me.component';
import {PersonalInfoComponent} from './component/registration/personal-info/personal-Info.component';
import {PersonalImageComponent} from './component/registration/personal-image/personal-image.component';
import {WorkshopFullInfoComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info.component';
import {HistoryComponent} from './component/history/history/history.component';
import {SalaryComponent} from './component/history/salary/salary.component';
import {CombinedComponent} from './component/history/combined/combined.component';
import {DeservedTreatmentComponent} from './component/deserved-treatment/deserved-treatment.component';
import {ElectronicPrescriptionComponent} from './component/individual/treatment/electronic-prescription/electronic-prescription.component';
import {MedicalBookletComponent} from './component/medical-booklet/medical-booklet.component';
import {BookletNewComponent} from './component/medical-booklet/booklet-new/booklet-new.component';
import {AccountComponent} from './component/registration/request-registration/account/account.component';
import {ContactComponent} from './component/registration/request-registration/contact/contact.component';
import {EducationComponent} from './component/registration/request-registration/education/education.component';
import {SpecialDiseasesComponent} from './component/registration/request-registration/special-diseases/special-diseases.component';
import {RequestComponent} from './component/request/request.component';
import {RequestEditComponent} from './component/request/request-edit/request-edit.component';
import {EdictPaymentComponent} from './component/pensioner/edict-payment/edict-payment.component';
import {InspectionComponent} from './component/inspection/inspection.component';
import {SubdomainNewComponent} from 'src/app/component/registration/request-registration/subdomain/subdomain-new/subdomain-new.component';
import {InspectionListComponent} from 'src/app/component/inspection/inspection-list/inspection-list.component';
import {InspectionObjectionComponent} from 'src/app/component/inspection/inspection-objection/inspection-objection.component';
import {ContractByWorkshopComponent} from 'src/app/component/workshop-registration/contract-by-workshop/contract-by-workshop.component';
import {WorkshopEditActivityComponent} from 'src/app/component/workshop-registration/workshop-edit-activity/workshop-edit-activity.component';
import {WorkshopEditAddressComponent} from 'src/app/component/workshop-registration/workshop-edit-address/workshop-edit-address.component';
import {WorkshopEditNameComponent} from 'src/app/component/workshop-registration/workshop-edit-name//workshop-edit-name.component';
import {ErecordsComponent} from 'src/app/component/erecords/erecords.component';
import {DocumentComponent} from './component/registration/request-registration/document/document.component';
import {ApproveComponent} from './component/registration/request-registration/approve/approve.component';
import {InspectionObjectionListComponent} from './component/inspection/inspection-objection-list/inspection-objection-list.component';
import {InspectionObjectionInsuredComponent} from './component/inspection/inspection-objection-insured/inspection-objection-insured.component';
import {EdictComponent} from './component/pensioner/edict/edict.component';
import {RegistrationContainerComponent} from './component/registration/request-registration/registration-container/registration-container.component';
import {RelationEditContainerComponent} from './component/registration/request-registration/relation-edit-container/relation-edit-container.component';
import {SubdominantComponent} from './component/registration/subdominant/subdominant.component';
import {SubdominantContainerComponent} from './component/registration/request-registration/subdominant-container/subdominant-container.component';
import {AnnouncementComponent} from './component/announcement/announcement.component';
import {AuthGuard} from './guards/auth.guard';
import {OccupationComponent} from './component/history/occupation/occupation.component';
import {ObjectionNotexistComponent} from './component/history/objection/objection-notexist/objection-notexist.component';
import {ObjectionConflictComponent} from './component/history/objection/objection-conflict/objection-conflict.component';
import {PayPalComponent} from './component/pay-pal/pay-pal.component';
import {PayPalEditComponent} from './component/pay-pal/pay-pal-edit/pay-pal-edit.component';
import {EdictDetailsComponent} from './component/pensioner/edict-details/edict-details.component';
import {RelationTaminComponent} from './component/registration/relation-tamin/relation-tamin.component';
import {PensionerGuard} from './services/pensioner.guard';
import {InsuredGuard} from './guards/insured.guard';
import {ConscriptionComponent} from './component/conscription/conscription.component';
import {WorkshopsDebitComponent} from './component/workshop-registration/workshops-debit/workshops-debit.component';
import {DownloadAppComponent} from './component/download-app/download-app.component';
import {AccountListComponent} from './component/registration/request-registration/account/account-list/account-list.component';
import {TwoLastYearHistoryComponent} from './component/history/two-last-year-history/two-last-year-history.component';
import {InstitutionsAnnouncementHistoryComponent} from './component/history/institutions-announcement-history/institutions-announcement-history.component';
import {PensionAccountComponent} from './component/pensioner/pension-account/pension-account.component';
import {ObjectionResponseComponent} from './component/history/occupation/objection-response/objection-response.component';
import {OfflineComponent} from './component/offline/offline.component';
import {RegistrationRelationGuard} from './services/registration/registration-relation.guard';
import {RegistrationPersonalGuard} from './services/registration/registration-personal.guard';
import {RegistrationViewComponent} from './component/registration/request-registration/registration-view/registration-view.component';
import {PaymentCertificateComponent} from 'src/app/component/pensioner/payment-certificate/payment-certificate.component';
import {ReleaseNoteComponent} from 'src/app/component/common/version/release-note/release-note.component';
import {BookletMapComponent} from './component/medical-booklet/booklet-map/booklet-map.component';
import {AllSsoLocationsComponent} from './component/map/all-sso-locations/all-sso-locations.component';
import {RequestFaqComponent} from './component/common/request-faq/request-faq.component';
import {RequestFaqViewComponent} from './component/common/request-faq/request-faq-view/request-faq-view.component';
import {EmployeeComponent} from './component/registration/employer/employee/employee.component';
import {EmployeeRegistrationContainerComponent} from './component/registration/employer/employee-registration-container/employee-registration-container.component';
import {TestComponent} from './component/common/test/test.component';
import {EmployeeApproveComponent} from './component/registration/employer/employee-approve/employee-approve.component';
import {ReloaderComponent} from './component/common/reloader/reloader.component';
import {PortalRegistrationNewComponent} from './component/portal-registration/portal-registration-new/portal-registration-new.component';
import {ClearanceCertificateMad38Component} from './component/workshop-registration/clearance-certificate-mad38/clearance-certificate-mad38.component';
import {ContactListComponent} from './component/registration/request-registration/contact/contact-list/contact-list.component';
import {SearchSsoLocationComponent} from './component/map/search-sso-location/search-sso-location.component';
import {AllSsoHealthCenterLocationsComponent} from './component/map/all-sso-health-center-locations/all-sso-health-center-locations.component';
import {PensionerIntroComponent} from 'src/app/component/pensioner/help/pensioner-intro/pensioner-intro.component';
import {PortalRegistrationPursueComponent} from './component/portal-registration/portal-registration-pursue/portal-registration-pursue.component';
import {RegisterPursueComponent} from './component/portal-registration/register-pursue/register-pursue.component';
import {RightelDeliveryComponent} from './component/rightel-delivery/rightel-delivery.component';
import {UploadImageComponent} from './component/medical-booklet/booklet-new/upload-image/upload-image.component';
import {BookletOrderComponent} from './component/medical-booklet/booklet-order/booklet-order.component';
import {BookletCartComponent} from './component/medical-booklet/booklet-cart/booklet-cart.component';
import {ConfirmCartComponent} from './component/medical-booklet/confirm-cart/confirm-cart.component';
import {WageAssignmentViewComponent} from './component/pensioner/wage-assignment/wage-assignment-view/wage-assignment-view.component';
import {WageAssignmentComponent} from './component/pensioner/wage-assignment/wage-assignment.component';
import {SsoDeservedTreatmentComponent} from './modules/sso/components/sso-deserved-treatment/sso-deserved-treatment.component';
import {BookletPaymentConfirmComponent} from './component/medical-booklet/booklet-payment-confirm/booklet-payment-confirm.component';
import {UserFeedbacksComponent} from './component/common/user-feedbacks/user-feedbacks.component';
import {PensionRequestComponent} from './component/pensioner/pension-request/pension-request.component';
import {WorkshopInsuranceProcrastinationComponent} from './component/workshop-registration/workshop-insurance-procrastination/workshop-insurance-procrastination.component';
import {PensionRequestViewComponent} from './component/pensioner/pension-request/pension-request-view/pension-request-view.component';
import {PensionRequestCombinedHistoryComponent} from './component/pensioner/pension-request/pension-request-combined-history/pension-request-combined-history.component';
import {PensionAgreementComponent} from './component/pensioner/pension-request/pension-agreement/pension-agreement.component';
import {PensionAccountEditComponent} from './component/pensioner/pension-account/pension-account-edit/pension-account-edit.component';
import {WorkshopPaymentSheetComponent} from './component/workshop-registration/workshop-payment-sheet/workshop-payment-sheet.component';
import {PensionAccountViewComponent} from './component/pensioner/pension-account/pension-account-view/pension-account-view.component';
import {ShowPaymentSheetComponent} from './component/special-insured/payment-sheet/show-payment-sheets/show-payment-sheet.component';
import {ClearanceCertificateMad38FAComponent} from './component/workshop-registration/clearance-certificate-mad38-fa/clearance-certificate-mad38-fa.component';
import {FractionAgeAndHistoryStatusComponent} from './component/special-insured/fraction-age-and-history-status/fraction-age-and-history-status.component';
import {FractionUpdateContactComponent} from './component/special-insured/fraction-update-contact/fraction-update-contact.component';
import {EmployerEservicesAgreementComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement.component';
import {EmployerEservicesAgreementAproveComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-aprove/employer-eservices-agreement-aprove.component';
import {EmployerEservicesAgreementAproveDisplayComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-aprove-display/employer-eservices-agreement-aprove-display.component';
import {EmployerEservicesAgreementComfirmComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-comfirm/employer-eservices-agreement-comfirm.component';
import {AssignersContractsComponent} from './component/workshop-registration/assigners-contracts/assigners-contracts.component';
import {SpecialDisplayContractComponent} from './component/special-insured/special-display-contract/special-display-contract.component';
import {SpecialInsuredContractComponent} from './component/special-insured/special-insured-contract/special-insured-contract.component';
import {PayPremiumComponent} from './component/special-insured/pay-premium/pay-premium.component';
import {AgeAndHistoryStatusComponent} from './component/special-insured/age-and-history-status/age-and-history-status.component';
import {ObjectionDebitComponent} from './component/objection/objection-debit/objection-debit.component';
import {ObjectionDebitNewComponent} from './component/objection/objection-debit-new/objection-debit-new.component';
import {ObjectionFollowComponent} from './component/objection/objection-follow/objection-follow.component';
import {ObjectionBadviNewComponent} from './component/objection/objection-badvi-new/objection-badvi-new.component';
import {ObjectionViewComponent} from './component/objection/objection-view/objection-view.component';
import {DebitManagementComponent} from './component/debit-management/debit-management.component';
import {DebitInvestigationComponent} from './component/debit-management/debit-investigation/debit-investigation.component';
import {FreelanceContractComponent} from './component/special-insured/freelance-contract/freelance-contract.component';
import {FreelanceAgeAndHistoryStatusComponent} from './component/special-insured/freelance-age-and-history-status/freelance-age-and-history-status.component';
import {FreelancePayPremiumComponent} from './component/special-insured/freelance-pay-premium/freelance-pay-premium.component';
import {FreelanceDisplayContractComponent} from './component/special-insured/freelance-display-contract/freelance-display-contract.component';
import {DisplayContractHistoryComponent} from './component/special-insured/display-contract-History/display-contract-history.component';
import {SelfContractStateComponent} from './component/special-insured/self-contract-state/self-contract-state.component';
import {EditDebitInvestigationComponent} from './component/debit-management/edit-debit-investigation/edit-debit-investigation.component';
import {GuardianRequestMotherComponent} from './component/guardian/guardian-request-mother/guardian-request-mother.component';
import {GuardianRequestChildComponent} from './component/guardian/guardian-request-child/guardian-request-child.component';
import {GuardianAgreementComponent} from './component/guardian/guardion-agreement/guardion-agreement.component';
import {SpecialSucssesRequestComponent} from './component/special-insured/special-sucsses-request/special-sucsses-request.component';
import {SpecialFaildRequestComponent} from './component/special-insured/special-faild-request/special-faild-request.component';
import {FractionOftheMoonContractComponent} from './component/special-insured/fraction-ofthe-moon-contract/fraction-ofthe-moon-contract.component';
import {FractionSetNationalcodeComponent} from './component/special-insured/fraction-set-nationalcode/fraction-set-nationalcode.component';
import {PensionSelfInquiryComponent} from './component/pensioner/pension-self-inquiry/pension-self-inquiry.component';
import {SubdomainNoPresenceComponent} from './component/registration/request-registration/subdomain/subdomain-no-presence/subdomain-no-presence.component';
import {GuardianRequestSpouseComponent} from './component/guardian/guardian-request-spouse/guardian-request-spouse.component';
import {SsoUserPipe} from './modules/sso/services/sso-user.pipe';
import {FractionPayPremiumComponent} from './component/special-insured/fraction-pay-premium/fraction-pay-premium.component';
import {FractionDisplayContractComponent} from './component/special-insured/fraction-display-contract/fraction-display-contract.component';
import {OccurrenceAgreementComponent} from './component/ocurrence/occurrence-agreement/occurrence-agreement.component';
import {MainOccurrenceComponent} from './component/ocurrence/main-occurence/main-occurrence.component';
import {GuardianRequestFatherComponent} from './component/guardian/guardian-request-father/guardian-request-father.component';
import {GuardianRequestBothComponent} from './component/guardian/guardian-request-both/guardian-request-both.component';
import {GuardianRequestCardBoardComponent} from './component/guardian/guardian-request-cardboard/guardian-request-cardboard.component';
import {DebitOnlinePaymentComponent} from './component/debit-management/debit-online-payment/debit-online-payment.component';
import {DebitOnlinePaymentInstallmentComponent} from './component/debit-management/debit-online-payment-installment/debit-online-payment-installment.component';
import {DebitOnlinePaymentFollowComponent} from './component/debit-management/debit-online-payment-follow/debit-online-payment-follow.component';
import {DebitInstallmentComponent} from './component/debit-management/debit-installment/debit-installment.component';
import {DebitInstallmentFollowComponent} from './component/debit-management/debit-installment-follow/debit-installment-follow.component';
import {DebitInstallmentPaymentComponent} from './component/debit-management/debit-installment-payment/debit-installment-payment.component';
import {GuardianRequestObjectionComponent} from './component/guardian/guardian-request-cardboard-objection/guardian-request-objection.component';
// import {NewWorkshopComponent} from './component/workshop-registration/registration/new-workshop/new-workshop.component';
// import {RegistrationComponent} from './component/workshop-registration/registration/registration.component';
import {PatientHistoryListDetailComponent} from './component/ep/patient-history-list-detail/patient-history-list-detail.component';
import {PatientHistoryComponent} from './component/ep/patient-history/patient-history.component';






import {DetailObjectionDebitComponent} from './component/objection/detail-objection-debit/detail-objection-debit.component';
import {MedicalCommitteeCardboardComponent} from './component/medical-committee/medical-committee-cardboard/medical-committee-cardboard.component';
import {MainCommitteeComponent} from './component/medical-committee/main-committee/main-committee.component';
import {CommitteeRequestListComponent} from './component/medical-committee/request-list/committee-request-list.component';
import {GuardianRevokeComponent} from './component/guardian/guardian-revoke/guardian-revoke.component';
import {CommitteeStageThreeMainComponent} from './component/medical-committee/stage-three/committee-stage-three-main.component';
import {CommitteeHelpComponent} from './component/medical-committee/committee-help/committee-help.component';



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
    data: {currentUrl: 'main'}
  },
  {
    path: 'reloader/:ref', component: ReloaderComponent
  },
  {
    path: 'main', component: PortalMainComponent
  },
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'registration', component: PortalRegistrationNewComponent
  },
  // {
  //   path: 'registration-new', component: PortalRegistrationNewComponent // OfflineComponent/*
  // },
  {
    path: 'login', component: PortalLoginComponent
  },
  {
    path: 'offline', component: OfflineComponent
  },
  {
    path: 'insured', component: PortalInsuredComponent
  },
  {
    path: 'pensioner', component: PortalPensionerComponent
  },
  {
    path: 'workshop', component: PortalWorkshopComponent
  },
  {
    path: 'download-app', component: DownloadAppComponent
  },
  {
    path: 'release-note', component: ReleaseNoteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'special-sucsess-request/:sysType',
    component: SpecialSucssesRequestComponent
    // canActivate: [AuthGuard]
  },

  {
    path: 'special-faild-request/:sysType',
    component: SpecialFaildRequestComponent
    // canActivate: [AuthGuard]
  },

  // {
  //   path: 'optional-contract/show-payment-history',
  //   component: SpecialDisplayContractComponent
  //   //canActivate: [AuthGuard]
  // },
  {
    path: 'request',
    component: RequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-request',
    component: RequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-announcement',
    component: AnnouncementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-feedback',
    component: UserFeedbacksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-response/:id',
    component: ObjectionResponseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'twolastyearhistory',
    component: TwoLastYearHistoryComponent,
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'institutionsannouncementhistory',
    component: InstitutionsAnnouncementHistoryComponent,
    canActivate: [InsuredGuard],
  }
  ,
  {
    path: 'detail-objection-debit',
    component: DetailObjectionDebitComponent,
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'conscription',
    component: ConscriptionComponent,
    canActivate: [AuthGuard]
    // resolve: {userData: UserDataResolve}
  },
  {
    path: 'medical-committee',
    component: MainCommitteeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-committee-help',
    component: CommitteeHelpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-committee-disease',
    component: CommitteeStageThreeMainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-committee-cardboard',
    component: MedicalCommitteeCardboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'committee-request-list',
    component: CommitteeRequestListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'occurrence/legal',
    component: MainOccurrenceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'occurrence/person',
    component: MainOccurrenceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'occurrence-agreement',
    component: OccurrenceAgreementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'request/edit/:id',
    component: RequestEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-management',
    component: DebitManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-investigation/:debitNumber/:workshopId/:brchCode',
    component: DebitInvestigationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-debit-investigation/:debitNumber/:workshopId/:brchCode',
    component: EditDebitInvestigationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-debit',
    component: ObjectionDebitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-debit-new/:debitNumber/:workshopId/:brchCode',
    component: ObjectionDebitNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-follow',
    component: ObjectionFollowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-badvi-new/:debitNumber/:workshopId/:brchCode',
    component: ObjectionBadviNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'objection-view/:id',
    component: ObjectionViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-installment',
    component: DebitInstallmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-installment-payment/:debitNumber',
    component: DebitInstallmentPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-installment-follow',
    component: DebitInstallmentFollowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-online-payment',
    component: DebitOnlinePaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-online-payment-installment/:debitNumber/:brchCode',
    component: DebitOnlinePaymentInstallmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-online-payment-follow',
    component: DebitOnlinePaymentFollowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paypal',
    component: PayPalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paypal/edit/:id',
    component: PayPalEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'me', component: PortalMeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'me/:requestid', component: PortalMeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [InsuredGuard],
  },
  {
    path: 'salary',
    component: SalaryComponent,
    canActivate: [InsuredGuard],
  },
  {
    path: 'combined',
    component: CombinedComponent,
    canActivate: [InsuredGuard],
  },
  {
    path: 'electronic-prescription',
    component: ElectronicPrescriptionComponent,
    canActivate: [InsuredGuard],
  },
  // {
  //   path: 'objection',
  //   component: ObjectionComponent,
  //   canActivate: [InsuredGuard],
  // },
  {
    path: 'objection-noexist',
    component: ObjectionNotexistComponent,
    canActivate: [InsuredGuard],
    data: {title: 'اعتراض به سابقه دارای مغایرت یا اشکال'}
  },
  {
    path: 'objection-deviation',
    component: ObjectionConflictComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'occupation',
    component: OccupationComponent,
    canActivate: [InsuredGuard],
  },
  {
    path: 'deserved-treatment',
    component: DeservedTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personal/:personalid',
    component: RegistrationContainerComponent,
    canActivate: [RegistrationPersonalGuard],
  },
  {
    path: 'personal-image',
    component: PersonalImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/contract-by-workshop',
    component: ContractByWorkshopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/paymentsheet-by-workshop',
    component: WorkshopPaymentSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/workshop-full-info',
    component: WorkshopFullInfoComponent,
    canActivate: [AuthGuard],
    // resolve: {userData: UserDataResolve}
  },
  {
    path: 'workshop-registration/workshop-edit-activity',
    component: WorkshopEditActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/workshop-edit-address',
    component: WorkshopEditAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/workshop-edit-name',
    component: WorkshopEditNameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/workshops-debit',
    component: WorkshopsDebitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/clearance-certificate-mad38',
    component: ClearanceCertificateMad38Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'sso/mad38-fa',
    component: ClearanceCertificateMad38FAComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/workshop-insurance-procrastination',
    component: WorkshopInsuranceProcrastinationComponent,
    canActivate: [AuthGuard],
    // resolve: {userData: UserDataResolve}
  },
  {
    path: 'workshop-registration/employer-eservices-agreement',
    component: EmployerEservicesAgreementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/employer-eservices-agreement-aprove',
    component: EmployerEservicesAgreementAproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/employer-eservices-agreement-aprove-display/:tiket/:phoneNumber',
    component: EmployerEservicesAgreementAproveDisplayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/employer-eservices-agreement-aprove-comfirm/:tiket/:phoneNumber',
    component: EmployerEservicesAgreementComfirmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workshop-registration/assigners-contracts',
    component: AssignersContractsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/:personalid',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact/:personalid',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education/:personalid',
    component: EducationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'special-diseases',
    component: SpecialDiseasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-relation-tamin/:personalid',
    component: RelationEditContainerComponent,
    canActivate: [RegistrationRelationGuard],
  },
  {
    path: 'inspection',
    component: InspectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inspection-list/:state',
    component: InspectionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inspection-objection/:id1/:id2',
    component: InspectionObjectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edict-payment',
    component: EdictPaymentComponent,
    canActivate: [PensionerGuard]
  },
  {
    path: 'edict',
    component: EdictComponent,
    canActivate: [PensionerGuard]
  },
  {
    path: 'pensioner-intro',
    component: PensionerIntroComponent
  },
  {
    path: 'wage-assignment',
    component: WageAssignmentComponent,
    // canActivate: [PensionerGuard]
  },
  {
    path: 'wage-assignment/:request-id',
    component: WageAssignmentViewComponent,
    // canActivate: [PensionerGuard]
  },
  {
    path: 'payment-certificate',
    component: PaymentCertificateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'erecords',
    component: ErecordsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subdomain/:personalid',
    component: SubdominantContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subdomainnew/:personalid',
    component: SubdomainNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subdomainnew',
    component: SubdomainNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'document/:personalid',
    component: DocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approve/:personalid',
    component: ApproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inspection-objection-list/:id',
    component: InspectionObjectionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-faq',
    component: RequestFaqComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-faq-view/:requestType/:requestStatus',
    component: RequestFaqViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inspection-objection-insured',
    component: InspectionObjectionInsuredComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approve',
    component: ApproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'announcement-objection',
  //   component: AnnouncementObjectionComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'subdominant',
    component: SubdominantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edict-calc',
    component: EdictDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'relation-tamin',
    component: RelationTaminComponent,
    canActivate: [InsuredGuard],
  }
  ,
  {
    path: 'accountlist',
    component: AccountListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-account/:personalid/:mode',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contactlist',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-contact/:personalid/:mode',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pension-account',
    component: PensionAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'optional-insurance',
    component: SpecialInsuredContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/contract',
    component: SpecialInsuredContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/contract/:status',
    component: SpecialInsuredContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/age-and-history',
    component: AgeAndHistoryStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/update-contact/:status',
    component: FractionUpdateContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/display-detail-pay-premiume',
    component: SpecialDisplayContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/contract',
    component: FreelanceContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/self-contract-state/:type',
    component: SelfContractStateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/display-contract-history/:type',
    component: DisplayContractHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/contract/:status',
    component: FreelanceContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/free-age-and-history',
    component: FreelanceAgeAndHistoryStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/freelance-detail-pay-premiume',
    component: FreelanceDisplayContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/freelance-pay-premium',
    component: FreelancePayPremiumComponent,
    canActivate: [AuthGuard]
  },
  /*{
    path: 'optional-insurance/examination/:type',
    component: ExaminationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/examination/:type/:job',
    component: ExaminationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/examination-history/:type',
    component: ExaminationHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/examination-display/:type',
    component: ExaminationDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/examination-display/:type/:number',
    component: ExaminationDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/examination-filing/:type',
    component: ExaminationFilingComponent,
    canActivate: [AuthGuard]
  },*/
  {
    path: 'optional-insurance/update-contact',
    component: FractionUpdateContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/pay-premium',
    component: PayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance-pay/pay-premium/:resNum',
    component: PayPremiumComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'all-sso-locations',
  //   component: AllSsoLocationsComponent
  // },
  /*{
    path: 'booklet',
    component: StepsContainerComponent,
    canActivate: [AuthGuard],
  },*/
  // {
  //   path: 'search-sso-location',
  //   component: SearchSsoLocationComponent
  // },
  {
    path: 'sso-healt-center-location',
    component: AllSsoHealthCenterLocationsComponent
  },
  {
    path: 'registration-pursue',
    component: PortalRegistrationPursueComponent
  },
  {
    path: 'register-pursue',
    component: RegisterPursueComponent
  },
  {
    path: 'booklet',
    children: [
      {
        path: '',
        component: MedicalBookletComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        component: BookletNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'test',
        component: BookletMapComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: 'workshop-registration/workshops-debit',
    component: WorkshopsDebitComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'workshop-registration/registration',
  //   component: RegistrationComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'registration-summary/:id',
    component: RegistrationViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employer-registration',
    children: [
      {
        path: 'personal-list',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
      },
      /* {
         path: 'personal-list/:workshopid/:organizationid',
         component: EmployeeComponent,
         canActivate: [AuthGuard],
       },*/
      {
        path: 'personal/:personalid',
        component: EmployeeRegistrationContainerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'personal/:workshopid/:organizationid',
        component: EmployeeRegistrationContainerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'summary/:requestid',
        component: EmployeeApproveComponent,
        canActivate: [AuthGuard],
      }
    ]

  },
  {
    path: 'rightel',
    component: RightelDeliveryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'booklet-upload-image/:nationalid',
    component: UploadImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: BookletOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: BookletCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirm-cart',
    component: ConfirmCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sso-deserved-treatment',
    component: SsoDeservedTreatmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirm-payment',
    component: BookletPaymentConfirmComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'contract-assigner-cartabl', component: ContractAssignerCartablComponent
  // },
  {
    path: 'pension-request',
    component: PensionRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pension-request-view/:request-id',
    component: PensionRequestViewComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'sso-health-center-location',
  //   component: AllSsoHealthCenterLocationsComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'pension-history-view',
    component: PensionRequestCombinedHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pension-agreement',
    component: PensionAgreementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pension-account-edit',
    component: PensionAccountEditComponent,
    canActivate: [PensionerGuard]
  },
  {
    path: 'pension-account-view/:request-id',
    component: PensionAccountViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'showPaymentSheets',
    component: ShowPaymentSheetComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'optional-insurance/fraction-age-and-history',
    component: FractionAgeAndHistoryStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/pay-premium',
    component: PayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/contract',
    component: SpecialInsuredContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subdominant-no-presence',
    component: SubdomainNoPresenceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'optional-freelance/contract',
    component: FreelanceContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/contract/:status',
    component: FreelanceContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-freelance/free-age-and-history',
    component: FreelanceAgeAndHistoryStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/freelance-detail-pay-premiume',
    component: FreelanceDisplayContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance-pay/freelance-pay-premium/:resNum',
    component: FreelancePayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/freelance-pay-premium',
    component: FreelancePayPremiumComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'optional-insurance/fraction',
    component: FractionOftheMoonContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/fraction/:status',
    component: FractionOftheMoonContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/set-nationalcode',
    component: FractionSetNationalcodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/fraction-age-and-history',
    component: FractionAgeAndHistoryStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subdominant-new',
    component: SubdomainNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'optional-insurance/fraction-pay-premium',
    component: FractionPayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance-pay/fraction-pay-premium-pay/:resNum',
    component: FractionPayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/fraction-detail-pay-premiume',
    component: FractionDisplayContractComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'optional-insurance/pay-premium',
    component: PayPremiumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subdominant-new/:personalId',
    component: SubdomainNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subdominant-no-presence',
    component: SubdomainNoPresenceComponent,
    canActivate: [AuthGuard],
  },
  {

    path: 'pension-self-inquiry',
    component: PensionSelfInquiryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-request',
    component: GuardianRequestBothComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-agreement',
    component: GuardianAgreementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-request-spouse',
    component: GuardianRequestSpouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-request-father',
    component: GuardianRequestFatherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-request-mother',
    component: GuardianRequestMotherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-request-child',
    component: GuardianRequestChildComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-cardboard/:id',
    component: GuardianRequestCardBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-objection',
    component: GuardianRequestObjectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guardian-revoke',
    component: GuardianRevokeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient-history',
    component: PatientHistoryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'patient-history-detail',
    component: PatientHistoryListDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient-history',
    component: PatientHistoryComponent,
    canActivate: [AuthGuard]
  },

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
