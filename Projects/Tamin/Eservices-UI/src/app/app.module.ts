import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorService, CallbackPipe, GenericRestService, ITaminApplicationConfig, OverlayService, PersianDateTimePipe, PersianNumberPipe, TaminFrameworkModule, TaminLazyLoadService, TaminRestService, TaminSecurityService} from 'tamin-framework';
import {AppComponent} from './component/app/app.component';
import {routing} from './app.routing';
import {GovernmentModule} from './modules/government/government.module';
import {SsoModule} from './modules/sso/sso.module';
import {PortalMainComponent} from './component/portal-main/portal-main.component';
import {PortalLoginComponent} from './component/portal-login/portal-login.component';
import {PortalInsuredComponent} from './component/portal-insured/portal-insured.component';
import {PortalPensionerComponent} from './component/portal-pensioner/portal-pensioner.component';
import {PortalWorkshopComponent} from './component/portal-workshop/portal-workshop.component';
import {PortalMeComponent} from './component/portal-me/portal-me.component';
import {PortalRegistrationComponent} from './component/portal-registration/portal-registration.component';
import {PortalRegistrationConfirmComponent} from './component/portal-registration/portal-registration-confirm/portal-registration-confirm.component';
import {RelationTaminComponent} from './component/registration/relation-tamin/relation-tamin.component';
import {RelationTaminListComponent} from './component/registration/relation-tamin/relation-tamin-list/relation-tamin-list.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PersonalInfoComponent} from './component/registration/personal-info/personal-Info.component';
import {HistoryListComponent} from './component/history/history/history-list/history-list.component';
import {HistorySearchComponent} from './component/history/history/history-search/history-search.component';
import {HistoryEditComponent} from './component/history/history/history-edit/history-edit.component';
import {HistoryViewComponent} from './component/history/history/history-view/history-view.component';
import {HistoryComponent} from './component/history/history/history.component';
import {DeservedTreatmentComponent} from './component/deserved-treatment/deserved-treatment.component';
import {MedicalBookletComponent} from './component/medical-booklet/medical-booklet.component';
import {BookletListComponent} from './component/medical-booklet/booklet-list/booklet-list.component';
import {BookletSearchComponent} from './component/medical-booklet/booklet-search/booklet-search.component';
import {BookletNewComponent} from './component/medical-booklet/booklet-new/booklet-new.component';
import {SalaryComponent} from './component/history/salary/salary.component';
import {SalarySearchComponent} from './component/history/salary/salary-search/salary-search.component';
import {SalaryViewComponent} from './component/history/salary/salary-view/salary-view.component';
import {SalaryListComponent} from './component/history/salary/salary-list/salary-list.component';
import {OccupationComponent} from './component/history/occupation/occupation.component';
import {OccupationViewComponent} from './component/history/occupation/occupation-view/occupation-view.component';
import {OccupationListComponent} from './component/history/occupation/occupation-list/occupation-list.component';
import {PersonalComponent} from './component/registration/request-registration/personal/personal.component';
import {PersonalImageComponent} from './component/registration/personal-image/personal-image.component';
import {RequestRelationTaminComponent} from './component/registration/request-registration/request-relation-tamin/request-relation-tamin.component';
import {AccountComponent} from './component/registration/request-registration/account/account.component';
import {ContactComponent} from './component/registration/request-registration/contact/contact.component';
import {EducationComponent} from './component/registration/request-registration/education/education.component';
import {SpecialDiseasesComponent} from './component/registration/request-registration/special-diseases/special-diseases.component';
import {EdictPaymentListComponent} from './component/pensioner/edict-payment/edict-payment-list/edict-payment-list.component';
import {EdictPaymentViewComponent} from './component/pensioner/edict-payment/edict-payment-view/edict-payment-view.component';
import {EdictPaymentComponent} from './component/pensioner/edict-payment/edict-payment.component';
import {EdictPaymentSearchComponent} from './component/pensioner/edict-payment/edict-payment-search/edict-payment-search.component';
import {ObjectionConflictComponent} from './component/history/objection/objection-conflict/objection-conflict.component';
import {ObjectionNotexistComponent} from './component/history/objection/objection-notexist/objection-notexist.component';
import {ObjectionNotexistNewEditComponent} from './component/history/objection/objection-notexist-new-edit/objection-notexist-new-edit.component';
import {ContractByWorkshopComponent} from './component/workshop-registration/contract-by-workshop/contract-by-workshop.component';
import {ContractByWorkshopListComponent} from './component/workshop-registration/contract-by-workshop/contract-by-workshop-list/contract-by-workshop-list.component';
import {ContractByWorkhsopSearchComponent} from './component/workshop-registration/contract-by-workshop/contract-by-workhsop-search/contract-by-workhsop-search.component';
import {SubdomainComponent} from './component/registration/request-registration/subdomain/subdomain.component';
import {SubdomainListComponent} from './component/registration/request-registration/subdomain/subdomain-list/subdomain-list.component';
import {SubdomainNewComponent} from './component/registration/request-registration/subdomain/subdomain-new/subdomain-new.component';
import {ErecordsComponent} from './component/erecords/erecords.component';
import {DoclistComponent} from './component/erecords/doclist/doclist.component';
import {RequestComponent} from './component/request/request.component';
import {RequestEditComponent} from './component/request/request-edit/request-edit.component';
import {InspectionComponent} from './component/inspection/inspection.component';
import {RequestSearchComponent} from './component/request/request-search/request-search.component';
import {RequestListComponent} from './component/request/request-list/request-list.component';
import {CombinedComponent} from './component/history/combined/combined.component';
import {CombinedListComponent} from './component/history/combined/combined-list/combined-list.component';
import {CombinedViewComponent} from './component/history/combined/combined-view/combined-view.component';
import {CombinedSearchComponent} from './component/history/combined/combined-search/combined-search.component';
import {WorkshopFullInfoComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info.component';
import {InspectionListComponent} from 'src/app/component/inspection/inspection-list/inspection-list.component';
import {InspectionRequestComponent} from 'src/app/component/inspection/inspection-request/inspection-request.component';
import {InspectionObjectionComponent} from 'src/app/component/inspection/inspection-objection/inspection-objection.component';
import {AgreementComponent} from './component/common/agreement/agreement.component';
import {DocumentComponent} from './component/registration/request-registration/document/document.component';
import {ApproveComponent} from './component/registration/request-registration/approve/approve.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {InspectionObjectionListComponent} from './component/inspection/inspection-objection-list/inspection-objection-list.component';
import {InspectionObjectionInsuredComponent} from './component/inspection/inspection-objection-insured/inspection-objection-insured.component';
import {EdictComponent} from './component/pensioner/edict/edict.component';
import {RequestModalComponent} from './component/request/request-modal/request-modal.component';
import {WorkshopFullInfoSearchComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info-search/workshop-full-info-search.component';
import {WorkshopFullInfoMemberSearchComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info-member-search/workshop-full-info-member-search.component';
import {WorkshopFullInfoEmployerListComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info-employer-list/workshop-full-info-employer-list.component';
import {WorkshopFullInfoListComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info-list/workshop-full-info-list.component';
import {WorkshopFullInfoMembersListComponent} from './component/workshop-registration/workshop-full-info/workshop-full-info-members-list/workshop-full-info-members-list.component';
import {RegistrationContainerComponent} from './component/registration/request-registration/registration-container/registration-container.component';
import {PasswordMeterComponent} from './component/common/password-meter/password-meter.component';
import {CommuniqueComponent} from './component/communique/communique.component';
import {PersonalInformationComponent} from './component/registration/request-registration/personal-information/personal-information.component';
import {RelationEditContainerComponent} from './component/registration/request-registration/relation-edit-container/relation-edit-container.component';
import {SubdominantComponent} from './component/registration/subdominant/subdominant.component';
import {PersonalFullInfoComponent} from './component/registration/personal-full-info/personal-full-info.component';
import {QuestionnaireComponent} from './component/registration/request-registration/questionnaire/questionnaire.component';
import {PortalMainWebComponent} from './component/portal-main/portal-main-web/portal-main-web.component';
import {PortalMainMobileComponent} from './component/portal-main/portal-main-mobile/portal-main-mobile.component';
import {AnnouncementComponent} from './component/announcement/announcement.component';
import {SubdominantContainerComponent} from './component/registration/request-registration/subdominant-container/subdominant-container.component';
import {ComponentBaseComponent} from './component/component-base/component-base.component';
import {WorkshopEditNameComponent} from './component/workshop-registration/workshop-edit-name/workshop-edit-name.component';
import {WorkshopEditActivityComponent} from './component/workshop-registration/workshop-edit-activity/workshop-edit-activity.component';
import {WorkshopEditAddressComponent} from './component/workshop-registration/workshop-edit-address/workshop-edit-address.component';
import {WorkshopEditNameSearchComponent} from './component/workshop-registration/workshop-edit-name/workshop-edit-name-search/workshop-edit-name-search.component';
import {WorkshopEditNameListComponent} from './component/workshop-registration/workshop-edit-name/workshop-edit-name-list/workshop-edit-name-list.component';
import {WorkshopEditAddressListComponent} from './component/workshop-registration/workshop-edit-address/workshop-edit-address-list/workshop-edit-address-list.component';
import {WorkshopEditAddressSearchComponent} from './component/workshop-registration/workshop-edit-address/workshop-edit-address-search/workshop-edit-address-search.component';
import {WorkshopEditActivitySearchComponent} from './component/workshop-registration/workshop-edit-activity/workshop-edit-activity-search/workshop-edit-activity-search.component';
import {WorkshopEditActivityListComponent} from './component/workshop-registration/workshop-edit-activity/workshop-edit-activity-list/workshop-edit-activity-list.component';
import {UserDataResolve} from './services/user-data-resolve.guard';
import {AuthGuard} from './guards/auth.guard';
import {SecureImagePipe} from './services/secureImagePipe/secure-image.pipe';
import {SafePipe} from './services/secureImagePipe/safe.pipe';
import {PayiPalSearchComponent} from './component/pay-pal/pay-pal-search/pay-pal-search.component';
import {PayPalComponent} from './component/pay-pal/pay-pal.component';
import {PayPalModalComponent} from './component/pay-pal/pay-pal-modal/pay-pal-modal.component';
import {PayPalListComponent} from './component/pay-pal/pay-pal-list/pay-pal-list.component';
import {PayPalEditComponent} from './component/pay-pal/pay-pal-edit/pay-pal-edit.component';
import {NewRequestComponent} from './component/pay-pal/new-request/new-request.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {EdictDetailsComponent} from './component/pensioner/edict-details/edict-details.component';
import {Urls} from './settings/urls';
import {PensionerGuard} from './services/pensioner.guard';
import {InsuredGuard} from './guards/insured.guard';
import {DocumentViewerComponent} from './component/common/document-viewer/document-viewer.component';
import {ImageUploadComponent} from './component/common/image-upload/image-upload.component';
import {EdictListComponent} from './component/pensioner/edict/edict-list/edict-list.component';
import {EdictSearchComponent} from './component/pensioner/edict/edict-search/edict-search.component';
import {EdictViewComponent} from './component/pensioner/edict-view/edict-view.component';
import {WorkshopsDebitComponent} from './component/workshop-registration/workshops-debit/workshops-debit.component';
import {ConscriptionComponent} from './component/conscription/conscription.component';
import {DownloadAppComponent} from './component/download-app/download-app.component';
import {TwoLastYearHistoryComponent} from './component/history/two-last-year-history/two-last-year-history.component';
import {InstitutionsAnnouncementHistoryComponent} from './component/history/institutions-announcement-history/institutions-announcement-history.component';
import {AccountListComponent} from './component/registration/request-registration/account/account-list/account-list.component';
import {PensionAccountComponent} from './component/pensioner/pension-account/pension-account.component';
import {PensionAccountSearchComponent} from './component/pensioner/pension-account/pension-account-search/pension-account-search.component';
import {ObjectionResponseComponent} from './component/history/occupation/objection-response/objection-response.component';
import {EdictListSubdominantComponent} from './component/pensioner/edict/edict-list-subdominant/edict-list-subdominant.component';
import {HistoryOnjectionAgreementComponent} from './component/common/history-onjection-agreement/history-onjection-agreement.component';
import {HistoryInstitutionAgreementComponent} from './component/common/history-institution-agreement/history-institution-agreement.component';
import {OfflineComponent} from './component/offline/offline.component';
import {RegistrationPersonalGuard} from './services/registration/registration-personal.guard';
import {RegistrationRelationGuard} from './services/registration/registration-relation.guard';
import {EnquiryComponent} from './component/announcement/enquiry/enquiry.component';
import {BookletPhotoCheckComponent} from './component/medical-booklet/booklet-new/booklet-photo-check/booklet-photo-check.component';
import {RecieverComponent} from './component/medical-booklet/booklet-new/reciever/reciever.component';
import {StepsContainerComponent} from './component/medical-booklet/booklet-new/steps-container/steps-container.component';
import {DownloadNationalCardPhotoComponent} from './component/medical-booklet/booklet-new/download-national-card-photo/download-national-card-photo.component';
import {BookletDataComponent} from './component/medical-booklet/booklet-new/booklet-data/booklet-data.component';
import {NoPhotoStepComponent} from './component/medical-booklet/booklet-new/no-photo-step/no-photo-step.component';
import {HasPhotoStepComponent} from './component/medical-booklet/booklet-new/has-photo-step/has-photo-step.component';
import {SubdomainApproveComponent} from './component/registration/request-registration/subdomain/subdomain-approve/subdomain-approve.component';
import {ChooseRecieverStepComponent} from './component/medical-booklet/booklet-new/choose-reciever-step/choose-reciever-step.component';
import {RegistrationViewComponent} from './component/registration/request-registration/registration-view/registration-view.component';
import {PaymentCertificateComponent} from './component/pensioner/payment-certificate/payment-certificate.component';
import {ReleaseNoteComponent} from './component/common/version/release-note/release-note.component';
import {BookletMapComponent} from './component/medical-booklet/booklet-map/booklet-map.component';
import {AccountEditComponent} from './component/registration/request-registration/account/account-edit/account-edit.component';
import {AllSsoLocationsComponent} from './component/map/all-sso-locations/all-sso-locations.component';
import {FormOneComponent} from './component/exprimental/form-one/form-one.component';
import {RequestFaqComponent} from './component/common/request-faq/request-faq.component';
import {RequestFaqNewComponent} from './component/common/request-faq/request-faq-new/request-faq-new.component';
import {RequestFaqViewComponent} from './component/common/request-faq/request-faq-view/request-faq-view.component';
import {EmployeeComponent} from './component/registration/employer/employee/employee.component';
import {EmployeeSearchComponent} from './component/registration/employer/employee/employee-search/employee-search.component';
import {EmployeeListComponent} from './component/registration/employer/employee/employee-list/employee-list.component';
import {EmployeeRegistrationContainerComponent} from './component/registration/employer/employee-registration-container/employee-registration-container.component';
import {EmployeePersonalComponent} from './component/registration/employer/employee-personal/employee-personal.component';
import {RequestFaqSearchComponent} from './component/common/request-faq/request-faq-search/request-faq-search.component';
import {EmployeeApproveComponent} from './component/registration/employer/employee-approve/employee-approve.component';
import {ReloaderComponent} from './component/common/reloader/reloader.component';
// import {DeviceDetectorModule} from 'ngx-device-detector';
import {SiteFeedbackComponent} from './component/common/site-feedback/site-feedback.component';
import {TestComponent} from './component/common/test/test.component';
import {PortalRegistrationNewComponent} from './component/portal-registration/portal-registration-new/portal-registration-new.component';
import {PortalRegistrationStepOneComponent} from './component/portal-registration/steps/portal-registration-step-one/portal-registration-step-one.component';
import {PortalRegistrationStepTwoComponent} from './component/portal-registration/steps/portal-registration-step-two/portal-registration-step-two.component';
import {PortalRegistrationStepThreeComponent} from './component/portal-registration/steps/portal-registration-step-three/portal-registration-step-three.component';
import {PortalRegistrationStepFourComponent} from './component/portal-registration/steps/portal-registration-step-four/portal-registration-step-four.component';
import {ClearanceCertificateMad38Component} from './component/workshop-registration/clearance-certificate-mad38/clearance-certificate-mad38.component';
import {ContactListComponent} from './component/registration/request-registration/contact/contact-list/contact-list.component';
import {ContactEditComponent} from './component/registration/request-registration/contact/contact-edit/contact-edit.component';
import {ClearanceCertificateMad37Component} from './component/workshop-registration/clearance-certificate-mad37/clearance-certificate-mad37.component';
import {AllSsoHealthCenterLocationsComponent} from './component/map/all-sso-health-center-locations/all-sso-health-center-locations.component';
import {SearchSsoLocationComponent} from './component/map/search-sso-location/search-sso-location.component';
import {PensionerIntroComponent} from './component/pensioner/help/pensioner-intro/pensioner-intro.component';
import {AnnouncementSearchComponent} from './component/announcement/announcement-search/announcement-search.component';
import {BookletViewComponent} from './modules/sso/components/sso-request/sso-request-details/booklet-view/booklet-view.component';
import {ConflictHistoryViewComponent} from './modules/sso/components/sso-request/sso-request-details/conflict-history-view/conflict-history-view.component';
import {PortalRegistrationPursueComponent} from './component/portal-registration/portal-registration-pursue/portal-registration-pursue.component';
import {RegisterPursueComponent} from './component/portal-registration/register-pursue/register-pursue.component';
import {PortalUserProfileComponent} from './component/portal-user/portal-user-profile/portal-user-profile.component';
import {RightelDeliveryComponent} from './component/rightel-delivery/rightel-delivery.component';
import {UploadImageComponent} from './component/medical-booklet/booklet-new/upload-image/upload-image.component';
import {BuildingApprovalsClearanceCertificateComponent} from './component/workshop-registration/building-approvals-clearance-certificate/building-approvals-clearance-certificate.component';
import {BusinessCardsClearanceCertificateComponent} from './component/workshop-registration/business-cards-clearance-certificate/business-cards-clearance-certificate.component';
import {LoanRepaymentsClearanceCertificateComponent} from './component/workshop-registration/loan-repayments-clearance-certificate/loan-repayments-clearance-certificate.component';
import {PropertyMortgagesClearanceCertificateComponent} from './component/workshop-registration/property-mortgages-clearance-certificate/property-mortgages-clearance-certificate.component';
import {UserFeedbacksComponent} from './component/common/user-feedbacks/user-feedbacks.component';
import {CookieService} from 'ngx-cookie-service';
import {WageAssignmentComponent} from './component/pensioner/wage-assignment/wage-assignment.component';
import {WageAssignmentViewComponent} from './component/pensioner/wage-assignment/wage-assignment-view/wage-assignment-view.component';
import {SubdominantInfoComponent} from './component/pensioner/wage-assignment/subdominant-info/subdominant-info.component';
import {BookletOrderComponent} from './component/medical-booklet/booklet-order/booklet-order.component';
import {BookletCartComponent} from './component/medical-booklet/booklet-cart/booklet-cart.component';
import {ConfirmCartComponent} from './component/medical-booklet/confirm-cart/confirm-cart.component';
import {BookletPaymentConfirmComponent} from './component/medical-booklet/booklet-payment-confirm/booklet-payment-confirm.component';
import {WageAssignmentEditComponent} from './component/pensioner/wage-assignment/wage-assignment-edit/wage-assignment-edit.component';
import {HealthModule} from './modules/health/health.module';
import {AllRequestsComponent} from './modules/sso/components/stp-all-requests/all-requests.component';
import {AllRequestSearchComponent} from './modules/sso/components/stp-all-requests/all-requests-search/all-requests-search.component';
// import {ContractAssignerCartablListComponent } from "./component/workshop-registration/contract-assigner-cartabl/contract-assigner-cartabl-list/contract-assigner-cartabl-list.component";
// import {ContractAssignerCartablNewComponent } from "./component/workshop-registration/contract-assigner-cartabl/contract-assigner-cartabl-new/contract-assigner-cartabl-new.component";
// import {ContractAssignerCartablSearchComponent } from "./component/workshop-registration/contract-assigner-cartabl/contract-assigner-cartabl-search/contract-assigner-cartabl-search.component";
// import {ContractAssignerCartablComponent } from "./component/workshop-registration/contract-assigner-cartabl/contract-assigner-cartabl.component";
import {WageAssignmentAgreementComponent} from './component/pensioner/wage-assignment/wage-assignment-agreement/wage-assignment-agreement.component';
import {PensionRequestComponent} from './component/pensioner/pension-request/pension-request.component';
import {WorkshopInsuranceProcrastinationComponent} from './component/workshop-registration/workshop-insurance-procrastination/workshop-insurance-procrastination.component';
import {WorkshopInsuranceProcrastinationListComponent} from './component/workshop-registration/workshop-insurance-procrastination/workshop-insurance-procrastination-list/workshop-insurance-procrastination-list.component';
import {WorkshopInsuranceProcrastinationSearchComponent} from './component/workshop-registration/workshop-insurance-procrastination/workshop-insurance-procrastination-search/workshop-insurance-procrastination-search.component';
import {WorkshopInsuranceProcrastinationNewComponent} from './component/workshop-registration/workshop-insurance-procrastination/workshop-insurance-procrastination-new/workshop-insurance-procrastination-new.component';
import {StpModule} from './modules/stp/stp.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {PensionRequestViewComponent} from './component/pensioner/pension-request/pension-request-view/pension-request-view.component';
import {PensionAgreementComponent} from './component/pensioner/pension-request/pension-agreement/pension-agreement.component';
import {PensionSaveAgreementComponent} from './component/pensioner/pension-request/pension-save-agreement/pension-save-agreement.component';
import {PensionRequestCombinedHistoryComponent} from './component/pensioner/pension-request/pension-request-combined-history/pension-request-combined-history.component';
import {PensionAccountEditComponent} from './component/pensioner/pension-account/pension-account-edit/pension-account-edit.component';
import {WorkshopPaymentSheetListComponent} from './component/workshop-registration/workshop-payment-sheet/workshop-payment-sheet-list/workshop-payment-sheet-list.component';
import {WorkshopPaymentSheetSearchComponent} from './component/workshop-registration/workshop-payment-sheet/workshop-payment-sheet-search/workshop-payment-sheet-search.component';
import {WorkshopPaymentSheetComponent} from './component/workshop-registration/workshop-payment-sheet/workshop-payment-sheet.component';
import {PensionAccountViewComponent} from './component/pensioner/pension-account/pension-account-view/pension-account-view.component';
import {InsuredInfoComponent} from './component/special-insured/payment-sheet/show-payment-sheets/insured-info/insured-info.component';
import {InsuredPaymentSheetListComponent} from './component/special-insured/payment-sheet/show-payment-sheets/insured-payment-sheet-list/insured-payment-sheet-list.component';
import {InsuredPaymentSheetSearchComponent} from './component/special-insured/payment-sheet/show-payment-sheets/insured-payment-sheet-search/insured-payment-sheet-search.component';
import {ShowPaymentSheetComponent} from './component/special-insured/payment-sheet/show-payment-sheets/show-payment-sheet.component';
import {ClearanceCertificateMad38FAComponent} from './component/workshop-registration/clearance-certificate-mad38-fa/clearance-certificate-mad38-fa.component';
import {SubdominantDocumentComponent} from './component/registration/request-registration/subdomain/document/subdominant-document.component';
import {SubdomainNoPresenceComponent} from './component/registration/request-registration/subdomain/subdomain-no-presence/subdomain-no-presence.component';
// import {DetStackholdersComponent} from './det-stackholders/det-stackholders.component';
import {ElectronicPrescriptionListComponent} from './component/individual/treatment/electronic-prescription/electronic-prescription-list/electronic-prescription-list.component';
import {ElectronicPrescriptionViewComponent} from './component/individual/treatment/electronic-prescription/electronic-prescription-view/electronic-prescription-view.component';
import {ElectronicPrescriptionComponent} from './component/individual/treatment/electronic-prescription/electronic-prescription.component';
import {PensionSelfInquiryComponent} from './component/pensioner/pension-self-inquiry/pension-self-inquiry.component';
import {PensionSelfInquiryListComponent} from './component/pensioner/pension-self-inquiry/pension-self-inquiry-list/pension-self-inquiry-list.component';
import {PensionSelfInquirySearchComponent} from './component/pensioner/pension-self-inquiry/pension-self-inquiry-search/pension-self-inquiry-search.component';
import {FractionOftheMoonContractComponent} from './component/special-insured/fraction-ofthe-moon-contract/fraction-ofthe-moon-contract.component';
import {FractionCheckIstrueContractComponent} from './component/special-insured/fraction-check-istrue-contract/fraction-check-istrue-contract.component';
import {FractionAgreementComponent} from './component/special-insured/fraction-agreement/fraction-agreement.component';
import {FractionAgeAndHistoryStatusComponent} from './component/special-insured/fraction-age-and-history-status/fraction-age-and-history-status.component';
import {FractionMakeAContractComponent} from './component/special-insured/fraction-make-a-contract/fraction-make-a-contract.component';
import {FractionSetNationalcodeComponent} from './component/special-insured/fraction-set-nationalcode/fraction-set-nationalcode.component';
import {FractionUpdateContactComponent} from './component/special-insured/fraction-update-contact/fraction-update-contact.component';
import {SpecialInsuredInfoComponent} from './component/special-insured/special-insured-info/special-insured-info.component';
import {EmployerEservicesAgreementComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement.component';
import {EmployerEservicesAgreementAproveComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-aprove/employer-eservices-agreement-aprove.component';
import {EmployerEservicesAgreementAproveDisplayComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-aprove-display/employer-eservices-agreement-aprove-display.component';
import {EmployerEservicesAgreementComfirmComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-comfirm/employer-eservices-agreement-comfirm.component';
import {EmployerEservicesAgreementInsuredInfoComponent} from './component/workshop-registration/employer-eservices-agreement/employer-eservices-agreement-insured-info/employer-eservices-agreement-insured-info.component';
import {AssignersContractsComponent} from './component/workshop-registration/assigners-contracts/assigners-contracts.component';
import {SpecialDisplayContractComponent} from './component/special-insured/special-display-contract/special-display-contract.component';
import {SpecialInsuredContractComponent} from './component/special-insured/special-insured-contract/special-insured-contract.component';
import {AgeAndHistoryStatusComponent} from './component/special-insured/age-and-history-status/age-and-history-status.component';
import {ConfirmInsuredInfoComponent} from './component/special-insured/confirm-insured-info/confirm-insured-info.component';
import {DetermineMonthlyPremiumComponent} from './component/special-insured/determine-monthly-premium/determine-monthly-premium.component';
import {DisplayDetailPayPremiumComponent} from './component/special-insured/display-detail-pay-premium/display-detail-pay-premium.component';
import {IntroduceToExaminationComponent} from './component/special-insured/introduce-to-examination/introduce-to-examination.component';
import {MakeAContractComponent} from './component/special-insured/make-a-contract/make-a-contract.component';
import {PayPremiumComponent} from './component/special-insured/pay-premium/pay-premium.component';
import {SpecialFaildRequestComponent} from './component/special-insured/special-faild-request/special-faild-request.component';
import {SpecialSucssesRequestComponent} from './component/special-insured/special-sucsses-request/special-sucsses-request.component';
import {SpecialAgreementComponent} from './component/special-insured/special-agreement/special-agreement.component';
import {PaymentStatusComponent} from './component/special-insured/payment-status/payment-status.component';
import {ObjectionDebitComponent} from './component/objection/objection-debit/objection-debit.component';
import {ObjectionDebitNewComponent} from './component/objection/objection-debit-new/objection-debit-new.component';
import {ObjectionFollowComponent} from './component/objection/objection-follow/objection-follow.component';
import {ObjectionBadviNewComponent} from './component/objection/objection-badvi-new/objection-badvi-new.component';
import {ObjectionViewComponent} from './component/objection/objection-view/objection-view.component';
import {ObjectionDetailComponent} from './component/objection/objection-detail/objection-detail.component';
import {DetailObjectionDebitComponent} from './component/objection/detail-objection-debit/detail-objection-debit.component';
import {FreelanceContractComponent} from './component/special-insured/freelance-contract/freelance-contract.component';
import {FreelanceAgeAndHistoryStatusComponent} from './component/special-insured/freelance-age-and-history-status/freelance-age-and-history-status.component';
import {FreelanceCheckIstrueContractComponent} from './component/special-insured/freelance-check-istrue-contract/freelance-check-istrue-contract.component';
import {FreelanceMakeAContractComponent} from './component/special-insured/freelance-make-a-contract/freelance-make-a-contract.component';
import {FreelanceAgreementComponent} from './component/special-insured/freelance-agreement/freelance-agreement.component';
import {FreelancePaymentPremiumComponent} from './component/special-insured/freelance-payment-premium/freelance-payment-premium.component';
import {FreelancePayPremiumComponent} from './component/special-insured/freelance-pay-premium/freelance-pay-premium.component';
import {FreelanceDisplayContractComponent} from './component/special-insured/freelance-display-contract/freelance-display-contract.component';
import {FreelanceDisplayDetailPayPremiumComponent} from './component/special-insured/freelance-display-detail-pay-premium/freelance-display-detail-pay-premium.component';
import {FreelanceIntroduceToExaminationComponent} from './component/special-insured/freelance-introduce-to-examination/freelance-introduce-to-examination.component';
import {FreelanceLocationComponent} from './component/special-insured/freelance-location/freelance-location.component';
import {SelfContractStateComponent} from './component/special-insured/self-contract-state/self-contract-state.component';
import {DisplayContractHistoryComponent} from './component/special-insured/display-contract-History/display-contract-history.component';
import {DebitInvestigationComponent} from './component/debit-management/debit-investigation/debit-investigation.component';
import {DebitManagementComponent} from './component/debit-management/debit-management.component';
import {EditDebitInvestigationComponent} from './component/debit-management/edit-debit-investigation/edit-debit-investigation.component';
import {ClaimModule} from './modules/claim/claim.module';


import {FractionDisplayContractComponent} from './component/special-insured/fraction-display-contract/fraction-display-contract.component';
import {FractionPayPremiumComponent} from './component/special-insured/fraction-pay-premium/fraction-pay-premium.component';

import {FractionDisplayDetailPayPremiumComponent} from './component/special-insured/fraction-display-detail-pay-premium/fraction-display-detail-pay-premium.component';
import {GuardianAgreementComponent} from './component/guardian/guardion-agreement/guardion-agreement.component';
import {GuardianInsInfoComponent} from './component/guardian/guardian-ins-info/guardian-ins-info.component';
import {GuardianRequestBothComponent} from './component/guardian/guardian-request-both/guardian-request-both.component';
import {GuardianRequestFatherComponent} from './component/guardian/guardian-request-father/guardian-request-father.component';
import {GuardianRequestMotherComponent} from './component/guardian/guardian-request-mother/guardian-request-mother.component';
import {GuardianRequestChildComponent} from './component/guardian/guardian-request-child/guardian-request-child.component';

import {OccurrenceDashboardModule} from './component/ocurrence/occurrence-dashboard.module';
import {GuardianRequestSpouseComponent} from './component/guardian/guardian-request-spouse/guardian-request-spouse.component';
import {GuardianInitializeService} from './component/guardian/guardian-initialize.service';
import {GuardianDocumentComponent} from './component/guardian/guardian-document/guarfian-document.component';
import {GuardianRequestCardBoardComponent} from './component/guardian/guardian-request-cardboard/guardian-request-cardboard.component';
import {DebitOnlinePaymentComponent} from './component/debit-management/debit-online-payment/debit-online-payment.component';
import {DebitOnlinePaymentInstallmentComponent} from './component/debit-management/debit-online-payment-installment/debit-online-payment-installment.component';
import {DebitOnlinePaymentFollowComponent} from './component/debit-management/debit-online-payment-follow/debit-online-payment-follow.component';
import {DebitInstallmentComponent} from './component/debit-management/debit-installment/debit-installment.component';
import {DebitInstallmentFollowComponent} from './component/debit-management/debit-installment-follow/debit-installment-follow.component';
import {DebitInstallmentPaymentComponent} from './component/debit-management/debit-installment-payment/debit-installment-payment.component';
import {GuardianRequestObjectionComponent} from './component/guardian/guardian-request-cardboard-objection/guardian-request-objection.component';
import {MedicalCommitteeDashboardModule} from './component/medical-committee/medical-committee-dashboard.module';
// import {RegistrationComponent} from './component/workshop-registration/registration/registration.component';



import {PatientHistoryListDetailComponent} from './component/ep/patient-history-list-detail/patient-history-list-detail.component';
import {PatientHistoryListComponent} from './component/ep/patient-history-list/patient-history-list.component';
import {PatientHistorySearchComponent} from './component/ep/patient-history-search/patient-history-search.component';
import {PatientHistoryComponent} from './component/ep/patient-history/patient-history.component';




import {PenaltyReliefComponent} from './component/workshop-registration/penalty-relief/penalty-relief.component';
import {FacModule} from './modules/fac/fac.module';
import {AnnouncementSsoComponent} from './modules/sso/components/sso-announcements/announcement-sso/announcement-sso.component';
import {GuardianRevokeComponent} from './component/guardian/guardian-revoke/guardian-revoke.component';


declare var alertify: any;

/*
alertify.defaults = {
  autoReset: true,

  closable: true,
  closableByDimmer: true,
  frameless: false,
  maintainFocus: true,
  maximizable: true,
  modal: true,
  movable: true,
  moveBounded: false,
  overflow: true,
  padding: true,
  pinnable: false,
  pinned: false,
  preventBodyShift: false,
  resizable: false,
  startMaximized: window.hasOwnProperty('cordova'),
  transition: 'zoom',
  notifier: {
    delay: 5,
    position: 'bottom-right',
    closeButton: false
  },

  glossary: {
    title: 'توجه',
    ok: 'تایید',
    cancel: 'انصراف'
  },
  hooks: {
    preinit: function (instance) {
    },
    postinit: function (instance) {
    },
  }
};
*/


alertify.defaults = {
  autoReset: true,
  basic: false,
  closable: true,
  closableByDimmer: true,
  invokeOnCloseOff: false,
  frameless: false,
  defaultFocusOff: false,
  maintainFocus: true,
  maximizable: true,
  modal: true,
  movable: true,
  moveBounded: false,
  overflow: true,
  padding: true,
  pinnable: true,
  pinned: true,
  preventBodyShift: false,
  resizable: true,
  startMaximized: false,
  transition: 'zoom',
  transitionOff: false,
  // tslint:disable-next-line:max-line-length
  tabbable: 'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',

  notifier: {
    delay: 5,
    position: 'bottom-right',
    closeButton: false,
    classes: {
      base: 'alertify-notifier',
      prefix: 'ajs-',
      message: 'ajs-message',
      top: 'ajs-top',
      right: 'ajs-right',
      bottom: 'ajs-bottom',
      left: 'ajs-left',
      center: 'ajs-center',
      visible: 'ajs-visible',
      hidden: 'ajs-hidden',
      close: 'ajs-close'
    }
  },
  glossary: {
    title: 'توجه',
    ok: 'تایید',
    cancel: 'انصراف'
  },

  // theme settings
  theme: {
    input: 'ajs-input',
    ok: 'ajs-ok',
    cancel: 'ajs-cancel'
  },
  hooks: {
    preinit: function (instance) {
    },
    postinit: function (instance) {

    }
  }
};


// @ts-ignore
export const AppConfig: ITaminApplicationConfig = {
  accessToken: environment.accessToken,
  expiresIn: environment.expiresIn,
  redirectUrl: environment.redirectUrl,
  baseUrl: environment.baseUrl,
  authenticationEndpoint: environment.authenticationEndpoint,
  verifyEndpoint: environment.verifyEndpoint,
  logoutUrl: environment.logoutUrl,
  responseType: environment.responseType,
  clientId: environment.clientId,
  getUserNameUrl: environment.getUserNameUrl,
  restTimeout: environment.restTimeout,
  secureCookie: false,
  cacheableUrls: [
    Urls.SalaryRequest,
    Urls.InsuranceRequest,
    Urls.HistoryRequest,
    Urls.CombinedHistoryRequest,
    Urls.OccupationRequest,
    Urls.BookletNew,
    Urls.BookletEligibleTo,
    Urls.BookletElectronicInfo,
    // Urls.BookletQuotas,
    environment.getUserNameUrl,
    Urls.USER_PROFILE,
    Urls.USER_PROFILE_IMAGE,
    Urls.loginInfo,
    environment.getUserNameUrl,
    Urls.lastRelation,
    'assets/data/menu-data.json'
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    PortalMainComponent,
    PortalLoginComponent,
    PortalInsuredComponent,
    PortalPensionerComponent,
    PortalWorkshopComponent,
    PortalMeComponent,
    PortalRegistrationComponent,
    PortalRegistrationConfirmComponent,
    PersonalInfoComponent,
    RelationTaminListComponent,
    HistoryListComponent,
    HistorySearchComponent,
    HistoryEditComponent,
    HistoryViewComponent,
    HistoryComponent,
    SalaryComponent,
    SalarySearchComponent,
    SalaryListComponent,
    SalaryViewComponent,
    OccupationComponent,
    OccupationListComponent,
    OccupationViewComponent,
    WorkshopInsuranceProcrastinationComponent,
    WorkshopInsuranceProcrastinationListComponent,
    WorkshopInsuranceProcrastinationSearchComponent,
    WorkshopInsuranceProcrastinationNewComponent,
    DeservedTreatmentComponent,
    MedicalBookletComponent,
    BookletListComponent,
    BookletSearchComponent,
    BookletNewComponent,
    PersonalComponent,
    RequestRelationTaminComponent,
    AccountComponent,
    EducationComponent,
    SpecialDiseasesComponent,
    EdictPaymentListComponent,
    EdictPaymentViewComponent,
    EdictPaymentComponent,
    EdictPaymentSearchComponent,
    ContactComponent,
    ErecordsComponent,
    DoclistComponent,
    ObjectionConflictComponent,
    ObjectionNotexistComponent,
    ObjectionNotexistNewEditComponent,
    CombinedComponent,
    RequestComponent,
    RequestListComponent,
    RequestSearchComponent,
    RequestEditComponent,
    RequestSearchComponent,
    InspectionComponent,
    InspectionListComponent,
    PersonalImageComponent,
    InspectionObjectionComponent,
    InspectionRequestComponent,
    ContractByWorkshopComponent,
    ContractByWorkshopListComponent,
    ContractByWorkhsopSearchComponent,
    SubdomainComponent,
    SubdomainListComponent,
    SubdomainNewComponent,
    CombinedSearchComponent,
    CombinedViewComponent,
    CombinedListComponent,
    InspectionComponent,
    InspectionListComponent,
    InspectionRequestComponent,
    InspectionObjectionComponent,
    CombinedListComponent,
    AgreementComponent,
    DocumentComponent,
    ApproveComponent,
    InspectionObjectionListComponent,
    InspectionObjectionInsuredComponent,
    EdictComponent,
    RequestModalComponent,
    WorkshopFullInfoSearchComponent,
    WorkshopFullInfoMemberSearchComponent,
    WorkshopFullInfoEmployerListComponent,
    WorkshopFullInfoListComponent,
    WorkshopFullInfoMembersListComponent,
    WorkshopFullInfoComponent,
    RegistrationContainerComponent,
    PasswordMeterComponent,
    CommuniqueComponent,
    PersonalInformationComponent,
    RelationEditContainerComponent,
    SubdominantComponent,
    PersonalFullInfoComponent,
    PortalMainWebComponent,
    PortalMainMobileComponent,
    QuestionnaireComponent,
    SubdominantContainerComponent,
    AnnouncementComponent,
    ComponentBaseComponent,
    WorkshopEditNameComponent,
    WorkshopEditActivityComponent,
    WorkshopEditAddressComponent,
    WorkshopEditNameSearchComponent,
    WorkshopEditNameListComponent,
    WorkshopEditAddressListComponent,
    WorkshopEditAddressSearchComponent,
    WorkshopEditActivitySearchComponent,
    WorkshopEditActivityListComponent,
    SecureImagePipe,
    SafePipe,
    RelationTaminComponent,
    PayPalComponent,
    PayiPalSearchComponent,
    PayPalModalComponent,
    PayPalListComponent,
    PayPalEditComponent,
    NewRequestComponent,
    EdictDetailsComponent,
    DocumentViewerComponent,
    ImageUploadComponent,
    EdictListComponent,
    EdictSearchComponent,
    EdictViewComponent,
    ConscriptionComponent,
    WorkshopsDebitComponent,
    EdictComponent,
    DownloadAppComponent,
    AccountListComponent,
    TwoLastYearHistoryComponent,
    InstitutionsAnnouncementHistoryComponent,
    PensionAccountComponent,
    PensionAccountSearchComponent,
    ObjectionResponseComponent,
    EdictListSubdominantComponent,
    HistoryOnjectionAgreementComponent,
    HistoryInstitutionAgreementComponent,
    OfflineComponent,
    OfflineComponent,
    EnquiryComponent,
    BookletPhotoCheckComponent,
    RecieverComponent,
    StepsContainerComponent,
    DownloadNationalCardPhotoComponent,
    BookletDataComponent,
    SubdomainApproveComponent,
    BookletDataComponent,
    NoPhotoStepComponent,
    HasPhotoStepComponent,
    ChooseRecieverStepComponent,
    RegistrationViewComponent,
    PaymentCertificateComponent,
    RegistrationViewComponent,
    ReleaseNoteComponent,
    BookletMapComponent,
    AccountEditComponent,
    AllSsoLocationsComponent,
    FormOneComponent,
    RequestFaqComponent,
    RequestFaqNewComponent,
    RequestFaqViewComponent,
    RequestFaqSearchComponent,
    RequestFaqViewComponent,
    RequestFaqViewComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeSearchComponent,
    EmployeeRegistrationContainerComponent,
    EmployeePersonalComponent,
    EmployeeApproveComponent,
    ClearanceCertificateMad38Component,
    EmployeeApproveComponent,
    ReloaderComponent,
    EmployeeApproveComponent,
    SiteFeedbackComponent,
    TestComponent,
    PortalRegistrationNewComponent,
    PortalRegistrationStepOneComponent,
    PortalRegistrationStepTwoComponent,
    PortalRegistrationStepThreeComponent,
    PortalRegistrationStepFourComponent,
    ClearanceCertificateMad37Component,
    AllSsoHealthCenterLocationsComponent,
    SearchSsoLocationComponent,
    ContactListComponent,
    ContactEditComponent,
    ClearanceCertificateMad37Component,
    PensionerIntroComponent,
    AnnouncementSearchComponent,
    PortalRegistrationPursueComponent,
    RegisterPursueComponent,
    PortalUserProfileComponent,
    RightelDeliveryComponent,
    UploadImageComponent,
    UserFeedbacksComponent,
    BuildingApprovalsClearanceCertificateComponent,
    BusinessCardsClearanceCertificateComponent,
    LoanRepaymentsClearanceCertificateComponent,
    PropertyMortgagesClearanceCertificateComponent,
    WageAssignmentComponent,
    WageAssignmentViewComponent,
    SubdominantInfoComponent,
    BookletOrderComponent,
    BookletCartComponent,
    ConfirmCartComponent,
    BookletPaymentConfirmComponent,
    WageAssignmentEditComponent,
    AllRequestSearchComponent,
    AllRequestsComponent,
    // ContractAssignerCartablListComponent,
    // ContractAssignerCartablNewComponent,
    // ContractAssignerCartablSearchComponent,
    // ContractAssignerCartablComponent,
    AllRequestsComponent,
    WageAssignmentAgreementComponent,
    PensionRequestComponent,
    PensionRequestViewComponent,
    PensionAgreementComponent,
    PensionSaveAgreementComponent,
    PensionRequestCombinedHistoryComponent,
    PensionAccountEditComponent,
    WorkshopPaymentSheetListComponent,
    WorkshopPaymentSheetSearchComponent,
    WorkshopPaymentSheetComponent,
    PensionAccountViewComponent,
    InsuredInfoComponent,
    InsuredPaymentSheetListComponent,
    InsuredPaymentSheetSearchComponent,
    ClearanceCertificateMad38FAComponent,
    ShowPaymentSheetComponent,
    // RequestIssuan,
    ShowPaymentSheetComponent,
    SubdominantDocumentComponent,
    SubdomainNoPresenceComponent,
    // DetStackholdersComponent,
    ElectronicPrescriptionComponent,
    ElectronicPrescriptionListComponent,
    ElectronicPrescriptionViewComponent,
    PensionSelfInquiryComponent,
    PensionSelfInquiryListComponent,
    PensionSelfInquirySearchComponent,
    // AnnouncementObjectionComponent,
    FractionOftheMoonContractComponent,
    FractionSetNationalcodeComponent,
    FractionUpdateContactComponent,
    FractionCheckIstrueContractComponent,
    FractionAgreementComponent,
    FractionAgeAndHistoryStatusComponent,
    AgeAndHistoryStatusComponent,
    ShowPaymentSheetComponent,
    PayPremiumComponent,
    MakeAContractComponent,
    IntroduceToExaminationComponent,
    DisplayDetailPayPremiumComponent,
    DetermineMonthlyPremiumComponent,
    ConfirmInsuredInfoComponent,
    FractionMakeAContractComponent,
    SpecialFaildRequestComponent,
    SpecialSucssesRequestComponent,
    SpecialDisplayContractComponent,
    SpecialInsuredContractComponent,
    EmployerEservicesAgreementComponent,
    EmployerEservicesAgreementAproveComponent,
    EmployerEservicesAgreementComfirmComponent,
    EmployerEservicesAgreementAproveDisplayComponent,
    SpecialAgreementComponent,
    EmployerEservicesAgreementInsuredInfoComponent,
    SpecialInsuredInfoComponent,
    PaymentStatusComponent,
    EmployerEservicesAgreementComponent,
    EmployerEservicesAgreementAproveComponent,
    EmployerEservicesAgreementAproveDisplayComponent,
    EmployerEservicesAgreementInsuredInfoComponent,
    EmployerEservicesAgreementComfirmComponent,
    AssignersContractsComponent,
    ObjectionDebitNewComponent,
    ObjectionFollowComponent,
    ObjectionBadviNewComponent,
    OccupationViewComponent,
    ObjectionViewComponent,
    ObjectionDetailComponent,
    DetailObjectionDebitComponent,
    FreelanceContractComponent,
    FreelanceAgeAndHistoryStatusComponent,
    FreelanceCheckIstrueContractComponent,
    FreelanceMakeAContractComponent,
    FreelanceAgreementComponent,
    FreelancePaymentPremiumComponent,
    FreelancePayPremiumComponent,
    FreelanceDisplayContractComponent,
    FreelanceDisplayDetailPayPremiumComponent,
    FreelanceIntroduceToExaminationComponent,
    DebitManagementComponent,
    DebitInvestigationComponent,
    SelfContractStateComponent,
    FreelanceLocationComponent,
    DisplayContractHistoryComponent,
    EditDebitInvestigationComponent,
    GuardianRequestBothComponent,
    GuardianAgreementComponent,
    GuardianDocumentComponent,
    GuardianRequestSpouseComponent,
    GuardianInsInfoComponent,
    GuardianRequestMotherComponent,
    GuardianRequestFatherComponent,
    GuardianRequestChildComponent,
    GuardianRequestCardBoardComponent,
    GuardianRequestObjectionComponent,
    GuardianRevokeComponent,
    FractionDisplayContractComponent,
    FractionPayPremiumComponent,
    FractionDisplayDetailPayPremiumComponent,
    DebitInstallmentComponent,
    DebitInstallmentFollowComponent,
    DebitInstallmentPaymentComponent,
    DebitOnlinePaymentComponent,
    DebitOnlinePaymentInstallmentComponent,
    DebitOnlinePaymentFollowComponent,
    FractionDisplayDetailPayPremiumComponent,
    GuardianInsInfoComponent,
    DebitOnlinePaymentFollowComponent,
    PatientHistoryComponent,
    PatientHistorySearchComponent,
    PatientHistoryListComponent,
    PatientHistoryListDetailComponent,

    ObjectionDebitComponent,
    PenaltyReliefComponent,

  ],
  entryComponents: [
    BookletViewComponent,
    PersonalComponent,
    RequestRelationTaminComponent,
    DocumentComponent,
    SubdomainListComponent,
    PersonalInformationComponent,
    ApproveComponent,
    /* Booklet*/
    BookletPhotoCheckComponent,
    BookletDataComponent,
    HasPhotoStepComponent,
    NoPhotoStepComponent,
    ChooseRecieverStepComponent,
    SubdomainApproveComponent,
    EmployeePersonalComponent,
    EmployeeApproveComponent,
    BookletViewComponent,
    ConflictHistoryViewComponent,

    ObjectionDebitComponent,

    ObjectionDetailComponent,
    EditDebitInvestigationComponent,
    DebitInvestigationComponent,
    DebitManagementComponent,
  ],
  imports: [
    BrowserModule,
    TaminFrameworkModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    GovernmentModule,
    SsoModule,
    HealthModule,
    StpModule,
    FacModule,
    ClaimModule,
    MedicalCommitteeDashboardModule,
    OccurrenceDashboardModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: 'taminApplicationConfig', useValue: AppConfig},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    GenericRestService,
    TaminLazyLoadService,
    TaminSecurityService,
    TaminRestService,
    PersianDateTimePipe,
    SecureImagePipe,
    SafePipe,
    PersianNumberPipe,
    CallbackPipe,
    OverlayService,
    UserDataResolve,
    AuthGuard,
    PensionerGuard,
    InsuredGuard,
    RegistrationPersonalGuard,
    RegistrationRelationGuard,
    CookieService,
    GuardianInitializeService
  ],
  exports: [
    RequestFaqViewComponent,
    WageAssignmentViewComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
