import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TaminFrameworkModule} from 'tamin-framework';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SsoRoutingModule} from 'src/app/modules/sso/sso-routing.module';
import {SsoMainComponent} from './components/sso-main/sso-main.component';
import {SsoRequestComponent} from './components/sso-request/sso-request.component';
import {SsoRequestListComponent} from './components/sso-request/sso-request-list/sso-request-list.component';
import {SsoRequestSearchComponent} from './components/sso-request/sso-request-search/sso-request-search.component';
import {SsoAnnouncementsComponent} from './components/sso-announcements/sso-announcements.component';
import {SsoAnnouncementsListComponent} from './components/sso-announcements/sso-announcements-list/sso-announcements-list.component';
import {SsoAnnouncementsSearchComponent} from './components/sso-announcements/sso-announcements-search/sso-announcements-search.component';
import {SSoRequestModalComponent} from './components/sso-request/request-modal/sso-request-modal.component';
import {SsoUserPipe} from './services/sso-user.pipe';
import {SsoRequestResponseComponent} from './components/sso-request/sso-request-response/sso-request-response.component';
import {SsoRequestDetailsComponent} from './components/sso-request/sso-request-details/sso-request-details.component';
import {RequestStatisticsComponent} from './components/request-statistics/request-statistics.component';
import {SsoAccountComponent} from './components/sso-account/sso-account.component';
import {SsoAccountListComponent} from './components/sso-account/sso-account-list/sso-account-list.component';
import {SsoAccountSearchComponent} from './components/sso-account/sso-account-search/sso-account-search.component';
import {PilotRequestsComponent} from './components/pilot-requests/pilot-requests.component';
import {BookletViewComponent} from './components/sso-request/sso-request-details/booklet-view/booklet-view.component';
import {UnsavedHistoryViewComponent} from './components/sso-request/sso-request-details/unsaved-history-view/unsaved-history-view.component';
import {ConflictHistoryViewComponent} from './components/sso-request/sso-request-details/conflict-history-view/conflict-history-view.component';
import {StpRequestsComponent} from './components/stp-requests/stp-requests.component';
import {SsoRequestFaqViewComponent} from './components/sso-request-faq-view/sso-request-faq-view.component';
import {SsoSmsPanelComponent} from './components/sso-sms-panel/sso-sms-panel.component';
import {AnnouncementStatisticsComponent} from './components/announcement-statistics/announcement-statistics.component';
import {SsoLogChartComponent} from './components/sso-log/sso-log-chart/sso-log-chart.component';
import {SsoLogStatisticsComponent} from './components/sso-log/sso-log-statistics/sso-log-statistics.component';
import {SsoLogTableDataComponent} from './components/sso-log/sso-log-table-data/sso-log-table-data.component';
import {IndemnityViewNewComponent} from './components/sso-request/sso-request-details/indemnity-view-new/indemnity-view-new.component';
import {StpHeaderNewComponent} from './components/sso-request/sso-request-details/stp-header-new/stp-header-new.component';
import {RequestResultNewComponent} from './components/sso-request/sso-request-details/request-result-new/request-result-new.component';
import {FuneralViewNewComponent} from './components/sso-request/sso-request-details/funeral-view-new/funeral-view-new.component';
import {PregnancyViewNewComponent} from './components/sso-request/sso-request-details/pregnancy-view-new/pregnancy-view-new.component';
import {MarriageViewNewComponent} from './components/sso-request/sso-request-details/marriage-view-new/marriage-view-new.component';
import {OrthosisAndProsthesisViewNewComponent} from './components/sso-request/sso-request-details/orthosis-and-prosthesis-view-new/orthosis-and-prosthesis-view-new.component';
import {SsoWageAssignmentComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment.component';
import {SsoWageAssignmentViewComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-view/sso-wage-assignment-view.component';
import {SsoSubdominantInfoComponent} from './components/sso-pensioner/sso-wage-assignment/sso-subdominant-info/sso-subdominant-info.component';
import {SsoWageAssignmentListComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-list/sso-wage-assignment-list.component';
import {SsoWageAssignmentSearchComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-search/sso-wage-assignment-search.component';
import {SsoDeservedTreatmentComponent} from './components/sso-deserved-treatment/sso-deserved-treatment.component';
import {SsoDeservedTreatmentSearchComponent} from './components/sso-deserved-treatment/sso-deserved-treatment-search/sso-deserved-treatment-search.component';
import {SsoWageAssignmentEvaluateComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-evaluate/sso-wage-assignment-evaluate.component';
import {SsoWageAssignmentRequestComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request.component';
import {SsoWageAssignmentRequestListComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request-list/sso-wage-assignment-request-list.component';
import {SsoWageAssignmentRequestSearchComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request-search/sso-wage-assignment-request-search.component';
import {SsoWageAssignmentRequestCancelComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request-cancel/sso-wage-assignment-request-cancel.component';
import {SsoSubdominantComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant.component';
import {SsoSubdominantListComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant-list/sso-subdominant-list.component';
import {SsoSubdominantSearchComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant-search/sso-subdominant-search.component';
import {SsoSubdominantViewComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant-view/sso-subdominant-view.component';
import {SsoWorkshopsDebitComponent} from './components/sso-workshop/sso-workshops-debit/sso-workshops-debit.component';
import {SsoCombinedComponent} from './components/sso-history/sso-combined/sso-combined.component';
import {SsoCombinedListComponent} from './components/sso-history/sso-combined/sso-combined-list/sso-combined-list.component';
import {SsoCombinedSearchComponent} from './components/sso-history/sso-combined/sso-combined-search/sso-combined-search.component';
import {SsoCombinedViewComponent} from './components/sso-history/sso-combined/sso-combined-view/sso-combined-view.component';
import {SsoSalaryComponent} from './components/sso-history/sso-salary/sso-salary.component';
import {SsoSalaryViewComponent} from './components/sso-history/sso-salary/sso-salary-view/sso-salary-view.component';
import {SsoSalaryListComponent} from './components/sso-history/sso-salary/sso-salary-list/sso-salary-list.component';
import {SsoSalarySearchComponent} from './components/sso-history/sso-salary/sso-salary-search/sso-salary-search.component';
import {SsoCompleteComponent} from './components/sso-history/sso-complete/sso-complete.component';
import {SsoCompleteListComponent} from './components/sso-history/sso-complete/sso-complete-list/sso-complete-list.component';
import {SsoCompleteSearchComponent} from './components/sso-history/sso-complete/sso-complete-search/sso-complete-search.component';
import {SsoCompleteViewComponent} from './components/sso-history/sso-complete/sso-complete-view/sso-complete-view.component';
import {SsoOccupationViewComponent} from './components/sso-history/sso-occupation/sso-occupation-view/sso-occupation-view.component';
import {SsoOccupationSearchComponent} from './components/sso-history/sso-occupation/sso-occupation-search/sso-occupation-search.component';
import {SsoOccupationListComponent} from './components/sso-history/sso-occupation/sso-occupation-list/sso-occupation-list.component';
import {SsoOccupationComponent} from './components/sso-history/sso-occupation/sso-occupation.component';
import {SsoHistoryComponent} from './components/sso-history/sso-history.component';
import {SsoInspectionComponent} from './components/sso-inspection/sso-inspection.component';
import {SsoInspectionSearchComponent} from './components/sso-inspection/sso-inspection-search/sso-inspection-search.component';
import {SsoWorkshopInsuranceProcrastinationComponent} from './components/sso-workshop/sso-workshop-insurance-procrastination/sso-workshop-insurance-procrastination.component';
import {SsoWorkshopInsuranceProcrastinationListComponent} from './components/sso-workshop/sso-workshop-insurance-procrastination/sso-workshop-insurance-procrastination-list/sso-workshop-insurance-procrastination-list.component';
import {SsoWorkshopInsuranceProcrastinationNewComponent} from './components/sso-workshop/sso-workshop-insurance-procrastination/sso-workshop-insurance-procrastination-new/sso-workshop-insurance-procrastination-new.component';
import {SsoWorkshopInsuranceProcrastinationSearchComponent} from './components/sso-workshop/sso-workshop-insurance-procrastination/sso-workshop-insurance-procrastination-search/sso-workshop-insurance-procrastination-search.component';
import {SsoMedicalBookletComponent} from './components/sso-medical-booklet/sso-medical-booklet.component';
import {SsoMedicalBookletMapComponent} from './components/sso-medical-booklet/sso-medical-booklet-map/sso-medical-booklet-map.component';
import {SsoPensionRequestViewComponent} from './components/sso-pensioner/sso-pension-request/sso-pension-request-view/sso-pension-request-view.component';
import {ConscriptionSearchComponent} from './components/sso-conscription/conscription-search/conscription-search.component';
import {SsoConscriptionComponent} from './components/sso-conscription/sso-conscription.component';
import {SsoEdictComponent} from './components/sso-pensioner//sso-edict/sso-edict.component';
import {SsoEdictSearchComponent} from './components/sso-pensioner/sso-edict/sso-edict-search/sso-edict-search.component';
import {SsoEdictListComponent} from './components/sso-pensioner/sso-edict/sso-edict-list/sso-edict-list.component';
import {SsoEdictListSubdominantComponent} from './components/sso-pensioner/sso-edict/sso-edict-list-subdominant/sso-edict-list-subdominant.component';
import {SsoPensionAccountComponent} from './components/sso-pensioner/sso-pension-account/sso-pension-account.component';
import {SsoPensionAccountSearchComponent} from './components/sso-pensioner/sso-pension-account/sso-pension-account-search/sso-pension-account-search.component';
import {SsoPensionFinalResultComponent} from './components/sso-request/sso-pension-final-result/sso-pension-final-result.component';
import {SsoEdictPaymentComponent} from './components/sso-pensioner/sso-edict-payment/sso-edict-payment.component';
import {SsoUserInfoSearchComponent} from './components/sso-pensioner/sso-edict-payment/sso-user-info-search/sso-user-info-search.component';
import {SsoEdictPaymentListComponent} from './components/sso-pensioner/sso-edict-payment/sso-edict-payment-list/sso-edict-payment-list.component';
import {SsoEdictPaymentSearchComponent} from './components/sso-pensioner/sso-edict-payment/sso-edict-payment-search/sso-edict-payment-search.component';
import {SsoWorkshopPaymentSheetComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-payment-sheet.component';
import {SsoWorkshopPaymentSheetSearchComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-payment-sheet-search/sso-workshop-payment-sheet-search.component';
import {SsoWorkshopPaymentSheetListComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-payment-sheet-list/sso-workshop-payment-sheet-list.component';
import {SsoWorkshopFullInfoSearchComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-full-info-search/sso-workshop-full-info-search.component';
import {SsoWorkshopFullInfoListComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-full-info-list/sso-workshop-full-info-list.component';
import {SsoPensionAccountViewComponent} from './components/sso-pensioner/sso-pension-account/sso-pension-account-view/sso-pension-account-view.component';
import {SsoInsuredPaymentSheetListComponent} from './components/sso-special-insured/show-payment-sheets/sso-insured-payment-sheet-list/sso-insured-payment-sheet-list.component';
import {SsoInsuredPaymentSheetSearchComponent} from './components/sso-special-insured/show-payment-sheets/sso-insured-payment-sheet-search/sso-insured-payment-sheet-search.component';
import {SsoInsuredSearchComponent} from './components/sso-special-insured/show-payment-sheets/sso-insured-search/sso-insured-search.component';
import {SsoShowPaymentSheetComponent} from './components/sso-special-insured/show-payment-sheets/sso-show-payment-sheet.component';
import {SsoDebitObjectionComponent} from './components/sso-debit-objection/sso-debit-objection.component';
import {SsoEblaghMofasaComponent} from './components/sso-mofasa/eblagh/sso-eblagh-mofasa.component';
import {SsoMofasaComponent} from './components/sso-mofasa/sso-mofasa.component';
import {SsoDebitInstallmentComponent} from './components/sso-debit-installment/sso-debit-installment.component';
import { SsoPersonalImageComponent } from './components/sso-personal-image/sso-personal-image.component';
import { SsoPersonalImageSearchComponent } from './components/sso-personal-image/sso-personal-image-search/sso-personal-image-search.component';
import {SsoPersonalImageDetailComponent} from './components/sso-personal-image/sso-personal-image-detail/sso-personal-image-detail.component';
import { ThirtySeventyComponent } from './components/thirty-seventy/thirty-seventy.component';
import { SsoDebitObjectionRequestComponent } from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-request.component';
import { SsoDebitObjectionBaravordiComponent } from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-baravordi/sso-debit-objection-baravordi.component';
import { SsoDebitObjectionBadviComponent } from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-badvi/sso-debit-objection-badvi.component';
import {SsoDebitInstallmentRequestComponent} from './components/sso-debit-installment/sso-debit-installment-request/sso-debit-installment-request.component';
import { SsoDebitInstallmentFollowComponent } from './components/sso-debit-installment/sso-debit-installment-follow/sso-debit-installment-follow.component';
import { SsoDebitInstallmentPaymentComponent } from './components/sso-debit-installment/sso-debit-installment-payment/sso-debit-installment-payment.component';
import {SsoRelationListComponent} from './components/sso-relation/sso-relation-list/sso-relation-list.component';
import {SsoRelationComponent} from './components/sso-relation/sso-relation.component';
import {SsoRelationSearchComponent} from './components/sso-relation/sso-relation-search/sso-relation-search.component';
import { SsoPenaltyReliefComponent } from './components/sso-penalty-relief/sso-penalty-relief.component';
import {SsoSpecificPersonComponent} from './components/sso-specific-person/sso-specific-person.component';
import {SsoSpecificPersonSearchComponent} from './components/sso-specific-person/sso-specific-person-search/sso-specific-person-search.component';
import {SsoSpecificPersonDetailComponent} from './components/sso-specific-person/sso-specific-person-detail/sso-specific-person-detail.component';
import {SsoSpecificPersonAddComponent} from './components/sso-specific-person/sso-specific-person-add/sso-specific-person-add.component';
import { SsoDetailObjectionDebitComponent } from './components/sso-debit-objection/sso-detail-objection-debit/sso-detail-objection-debit.component';
import { SsoDebitObjectionSearchComponent } from './components/sso-debit-objection/sso-debit-objection-search/sso-debit-objection-search.component';
import {SsoAgentConscriptionComponent} from './components/sso-agent-conscription/sso-agent-conscription.component';
import {AgentConscriptionSearchComponent} from './components/sso-agent-conscription/conscription-search/agent-conscription-search.component';
import {AgentConscriptionComponent} from './components/sso-agent-conscription/sso-conscription/agent-conscription.component';
import { AnnouncementSsoComponent } from './components/sso-announcements/announcement-sso/announcement-sso.component';
import {SsoGuardianComponent} from './components/sso-guardian/sso-guardian.component';
import {GuardianSearchComponent} from './components/sso-guardian/guardian-search/guardian-search.component';
import {MedicalCommitteeSearchComponent} from './components/sso-medical-committee/guardian-search/medical-committee-search.component';
import {SsoMedicalCommitteeComponent} from './components/sso-medical-committee/sso-medical-committee.component';

@NgModule({
  imports: [
    CommonModule,
    SsoRoutingModule,
    BrowserModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule,
    // AppModule
  ],
  declarations: [
    SsoMainComponent,
    SsoRequestComponent,
    SsoRequestListComponent,
    SsoRequestSearchComponent,
    SsoAnnouncementsComponent,
    SsoAnnouncementsListComponent,
    SsoAnnouncementsSearchComponent,
    SSoRequestModalComponent,
    SsoUserPipe,
    SsoRequestResponseComponent,
    SsoRequestDetailsComponent,
    SsoEblaghMofasaComponent,
    SsoMofasaComponent,
    RequestStatisticsComponent,
    SsoAccountComponent,
    SsoAccountListComponent,
    SsoAccountSearchComponent,
    PilotRequestsComponent,
    BookletViewComponent,
    UnsavedHistoryViewComponent,
    ConflictHistoryViewComponent,
    PilotRequestsComponent,
    StpRequestsComponent,
    SsoRequestFaqViewComponent,
    SsoSmsPanelComponent,
    AnnouncementStatisticsComponent,
    SsoLogChartComponent,
    SsoLogStatisticsComponent,
    SsoLogTableDataComponent,
    IndemnityViewNewComponent,
    StpHeaderNewComponent,
    RequestResultNewComponent,
    FuneralViewNewComponent,
    PregnancyViewNewComponent,
    MarriageViewNewComponent,
    OrthosisAndProsthesisViewNewComponent,
    SsoWageAssignmentComponent,
    SsoWageAssignmentViewComponent,
    SsoSubdominantInfoComponent,
    SsoWageAssignmentListComponent,
    SsoWageAssignmentSearchComponent,
    SsoDeservedTreatmentComponent,
    SsoDeservedTreatmentSearchComponent,
    SsoWageAssignmentEvaluateComponent,
    SsoWageAssignmentRequestComponent,
    SsoWageAssignmentRequestListComponent,
    SsoWageAssignmentRequestSearchComponent,
    SsoWageAssignmentRequestCancelComponent,
    SsoSubdominantComponent,
    SsoSubdominantListComponent,
    SsoSubdominantSearchComponent,
    SsoSubdominantViewComponent,
    SsoWorkshopsDebitComponent,
    SsoHistoryComponent,
    SsoCombinedComponent,
    SsoCombinedListComponent,
    SsoCombinedViewComponent,
    SsoCombinedSearchComponent,
    SsoSalaryComponent,
    SsoSalaryListComponent,
    SsoSalaryViewComponent,
    SsoSalarySearchComponent,
    SsoCompleteComponent,
    SsoCompleteListComponent,
    SsoCompleteViewComponent,
    SsoCompleteSearchComponent,
    SsoOccupationComponent,
    SsoOccupationListComponent,
    SsoOccupationViewComponent,
    SsoOccupationSearchComponent,
    SsoInspectionSearchComponent,
    SsoInspectionComponent,
    SsoWorkshopInsuranceProcrastinationComponent,
    SsoWorkshopInsuranceProcrastinationListComponent,
    SsoWorkshopInsuranceProcrastinationNewComponent,
    SsoWorkshopInsuranceProcrastinationSearchComponent,
    SsoMedicalBookletComponent,
    SsoMedicalBookletMapComponent,
    SsoPensionRequestViewComponent,
    ConscriptionSearchComponent,
    SsoConscriptionComponent,
    SsoEdictComponent,
    SsoEdictSearchComponent,
    SsoEdictListComponent,
    SsoEdictListSubdominantComponent,
    SsoPensionAccountComponent,
    SsoPensionAccountSearchComponent,
    SsoPensionFinalResultComponent,
    SsoEdictPaymentComponent,
    SsoEdictPaymentSearchComponent,
    SsoEdictPaymentListComponent,
    SsoUserInfoSearchComponent,
    SsoWorkshopPaymentSheetComponent,
    SsoWorkshopPaymentSheetSearchComponent,
    SsoWorkshopPaymentSheetListComponent,
    SsoWorkshopFullInfoSearchComponent,
    SsoWorkshopFullInfoListComponent,
    SsoPensionAccountViewComponent,
    SsoInsuredPaymentSheetListComponent,
    SsoInsuredPaymentSheetSearchComponent,
    SsoInsuredSearchComponent,
    SsoShowPaymentSheetComponent,
    AnnouncementSsoComponent,
    SsoDebitObjectionComponent,
    SsoPersonalImageComponent,
    SsoPersonalImageSearchComponent,
    SsoPersonalImageDetailComponent,
    SsoDebitInstallmentComponent,
    ThirtySeventyComponent,
    SsoDebitObjectionRequestComponent,
    SsoDebitObjectionBaravordiComponent,
    SsoDebitInstallmentRequestComponent,
    SsoDebitInstallmentFollowComponent,
    SsoDebitInstallmentPaymentComponent,
    SsoRelationComponent,
    SsoRelationSearchComponent,
    SsoRelationListComponent,
    SsoDebitObjectionBadviComponent,
    SsoPenaltyReliefComponent,
    SsoSpecificPersonComponent,
    SsoSpecificPersonSearchComponent,
    SsoSpecificPersonDetailComponent,
    SsoSpecificPersonAddComponent,
    SsoPenaltyReliefComponent,
    SsoDetailObjectionDebitComponent,
    SsoDebitObjectionSearchComponent,
    SsoAgentConscriptionComponent,
    AgentConscriptionSearchComponent,
    AgentConscriptionComponent,
    SsoGuardianComponent,
    GuardianSearchComponent,
    MedicalCommitteeSearchComponent,
    SsoMedicalCommitteeComponent
  ],
  entryComponents: [
    SSoRequestModalComponent,
    SsoRequestResponseComponent,
    SsoRequestDetailsComponent,
    SsoRequestFaqViewComponent,
    ConflictHistoryViewComponent,
    BookletViewComponent,
    UnsavedHistoryViewComponent,
    IndemnityViewNewComponent,
    StpHeaderNewComponent,
    RequestResultNewComponent,
    PregnancyViewNewComponent,
    MarriageViewNewComponent,
    OrthosisAndProsthesisViewNewComponent,
    SsoDebitInstallmentComponent,
    SsoPenaltyReliefComponent,
    FuneralViewNewComponent,
    AgentConscriptionComponent,
    SsoDebitObjectionComponent,
    SsoDebitObjectionSearchComponent,



  ],
  exports: [
    SsoDebitObjectionSearchComponent
  ],
  providers: [
    SsoUserPipe
  ]
})
export class SsoModule {
}
