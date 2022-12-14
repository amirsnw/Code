import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SsoMainComponent} from './components/sso-main/sso-main.component';
import {SsoRequestComponent} from './components/sso-request/sso-request.component';
import {SsoAnnouncementsComponent} from './components/sso-announcements/sso-announcements.component';
import {SsoUserPipe} from './services/sso-user.pipe';
import {RequestStatisticsComponent} from './components/request-statistics/request-statistics.component';
import {SsoAccountComponent} from './components/sso-account/sso-account.component';
import {PilotRequestsComponent} from 'src/app/modules/sso/components/pilot-requests/pilot-requests.component';
import {StpRequestsComponent} from './components/stp-requests/stp-requests.component';
import {SsoSmsPanelComponent} from './components/sso-sms-panel/sso-sms-panel.component';
import {ClearanceCertificateMad37Component} from 'src/app/component/workshop-registration/clearance-certificate-mad37/clearance-certificate-mad37.component';
import {ClearanceCertificateMad38Component} from 'src/app/component/workshop-registration/clearance-certificate-mad38/clearance-certificate-mad38.component';
import {ContactComponent} from '../../component/registration/request-registration/contact/contact.component';
import {AnnouncementStatisticsComponent} from './components/announcement-statistics/announcement-statistics.component';
import {BuildingApprovalsClearanceCertificateComponent} from 'src/app/component/workshop-registration/building-approvals-clearance-certificate/building-approvals-clearance-certificate.component';
import {BusinessCardsClearanceCertificateComponent} from 'src/app/component/workshop-registration/business-cards-clearance-certificate/business-cards-clearance-certificate.component';
import {PropertyMortgagesClearanceCertificateComponent} from 'src/app/component/workshop-registration/property-mortgages-clearance-certificate/property-mortgages-clearance-certificate.component';
import {LoanRepaymentsClearanceCertificateComponent} from 'src/app/component/workshop-registration/loan-repayments-clearance-certificate/loan-repayments-clearance-certificate.component';
import {SsoLogStatisticsComponent} from './components/sso-log/sso-log-statistics/sso-log-statistics.component';
import {IndemnityViewNewComponent} from './components/sso-request/sso-request-details/indemnity-view-new/indemnity-view-new.component';
import {FuneralViewNewComponent} from './components/sso-request/sso-request-details/funeral-view-new/funeral-view-new.component';
import {PregnancyViewNewComponent} from './components/sso-request/sso-request-details/pregnancy-view-new/pregnancy-view-new.component';
import {MarriageViewNewComponent} from './components/sso-request/sso-request-details/marriage-view-new/marriage-view-new.component';
import {OrthosisAndProsthesisViewNewComponent} from './components/sso-request/sso-request-details/orthosis-and-prosthesis-view-new/orthosis-and-prosthesis-view-new.component';
import {SsoWageAssignmentComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment.component';
import {SsoWageAssignmentViewComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-view/sso-wage-assignment-view.component';
import {SsoWageAssignmentEvaluateComponent} from './components/sso-pensioner/sso-wage-assignment/sso-wage-assignment-evaluate/sso-wage-assignment-evaluate.component';
import {SsoWageAssignmentRequestComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request.component';
import {SsoWageAssignmentRequestCancelComponent} from './components/sso-pensioner/sso-wage-assignment-request/sso-wage-assignment-request-cancel/sso-wage-assignment-request-cancel.component';
import {SsoSubdominantComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant.component';
import {SsoSubdominantViewComponent} from './components/sso-pensioner/sso-subdominant/sso-subdominant-view/sso-subdominant-view.component';
import {AllRequestsComponent} from './components/stp-all-requests/all-requests.component';
import {SsoHistoryComponent} from './components/sso-history/sso-history.component';
import {SsoCombinedComponent} from './components/sso-history/sso-combined/sso-combined.component';
import {SsoSalaryComponent} from './components/sso-history/sso-salary/sso-salary.component';
import {SsoCompleteComponent} from './components/sso-history/sso-complete/sso-complete.component';
import {SsoOccupationComponent} from './components/sso-history/sso-occupation/sso-occupation.component';
import {SsoWorkshopsDebitComponent} from './components/sso-workshop/sso-workshops-debit/sso-workshops-debit.component';
import {SsoInspectionComponent} from './components/sso-inspection/sso-inspection.component';
import {SsoWorkshopInsuranceProcrastinationComponent} from './components/sso-workshop/sso-workshop-insurance-procrastination/sso-workshop-insurance-procrastination.component';
import {SsoMedicalBookletComponent} from './components/sso-medical-booklet/sso-medical-booklet.component';
import {SsoPensionRequestViewComponent} from './components/sso-pensioner/sso-pension-request/sso-pension-request-view/sso-pension-request-view.component';
import {SsoConscriptionComponent} from './components/sso-conscription/sso-conscription.component';
import {SsoPensionAccountComponent} from './components/sso-pensioner/sso-pension-account/sso-pension-account.component';
import {SsoEdictComponent} from './components/sso-pensioner/sso-edict/sso-edict.component';
import {SsoPensionFinalResultComponent} from './components/sso-request/sso-pension-final-result/sso-pension-final-result.component';
import {SsoEdictPaymentComponent} from './components/sso-pensioner/sso-edict-payment/sso-edict-payment.component';
import {SsoWorkshopPaymentSheetComponent} from './components/sso-workshop/sso-workshop-payment-sheet/sso-workshop-payment-sheet.component';
import {SsoPensionAccountViewComponent} from './components/sso-pensioner/sso-pension-account/sso-pension-account-view/sso-pension-account-view.component';
import {SsoShowPaymentSheetComponent} from './components/sso-special-insured/show-payment-sheets/sso-show-payment-sheet.component';
import {SsoDebitObjectionComponent} from './components/sso-debit-objection/sso-debit-objection.component';
import {SsoEblaghMofasaComponent} from './components/sso-mofasa/eblagh/sso-eblagh-mofasa.component';
import {SsoMofasaComponent} from './components/sso-mofasa/sso-mofasa.component';
import {ThirtySeventyComponent} from './components/thirty-seventy/thirty-seventy.component';
import {SsoDebitObjectionRequestComponent} from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-request.component';
import {SsoDebitObjectionBadviComponent} from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-badvi/sso-debit-objection-badvi.component';
import {SsoDebitObjectionBaravordiComponent} from './components/sso-debit-objection/sso-debit-objection-request/sso-debit-objection-baravordi/sso-debit-objection-baravordi.component';
import {SsoPersonalImageComponent} from './components/sso-personal-image/sso-personal-image.component';
import {SsoDebitInstallmentRequestComponent} from './components/sso-debit-installment/sso-debit-installment-request/sso-debit-installment-request.component';
import {SsoDebitInstallmentFollowComponent} from './components/sso-debit-installment/sso-debit-installment-follow/sso-debit-installment-follow.component';
import {SsoDebitInstallmentPaymentComponent} from './components/sso-debit-installment/sso-debit-installment-payment/sso-debit-installment-payment.component';
import {SsoRelationComponent} from './components/sso-relation/sso-relation.component';
import {SsoSpecificPersonComponent} from './components/sso-specific-person/sso-specific-person.component';
import {SsoSpecificPersonAddComponent} from './components/sso-specific-person/sso-specific-person-add/sso-specific-person-add.component';
import {SsoDetailObjectionDebitComponent} from './components/sso-debit-objection/sso-detail-objection-debit/sso-detail-objection-debit.component';
import {SsoAgentConscriptionComponent} from './components/sso-agent-conscription/sso-agent-conscription.component';
import {AuthGuard} from '../../guards/auth.guard';
import { AnnouncementSsoComponent } from './components/sso-announcements/announcement-sso/announcement-sso.component';
import {SsoGuardianComponent} from './components/sso-guardian/sso-guardian.component';
import {GuardianRequestBothComponent} from '../../component/guardian/guardian-request-both/guardian-request-both.component';
import {GuardianRequestSpouseComponent} from '../../component/guardian/guardian-request-spouse/guardian-request-spouse.component';
import {GuardianRequestFatherComponent} from '../../component/guardian/guardian-request-father/guardian-request-father.component';
import {GuardianRequestMotherComponent} from '../../component/guardian/guardian-request-mother/guardian-request-mother.component';
import {GuardianRequestChildComponent} from '../../component/guardian/guardian-request-child/guardian-request-child.component';


const routes: Routes = [
  {
    path: 'sso',
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {path: 'main', component: SsoMainComponent, canActivate: [SsoUserPipe]},
      {path: 'request', component: SsoRequestComponent, canActivate: [SsoUserPipe]},
      {path: 'eblagh-mofasa', component: SsoEblaghMofasaComponent, canActivate: [SsoUserPipe]},
      {path: 'mofasa', component: SsoMofasaComponent, canActivate: [SsoUserPipe]},
      {path: 'announcements', component: SsoAnnouncementsComponent, canActivate: [SsoUserPipe]},
      {path: 'request-statistics', component: RequestStatisticsComponent, canActivate: [SsoUserPipe]},
      {path: 'account', component: SsoAccountComponent, canActivate: [SsoUserPipe]},
      {path: 'stp-requests', component: StpRequestsComponent/*, canActivate: [SsoUserPipe]*/},
      {
        path: 'sso-show-requests',
        component: AllRequestsComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-history',
        component: SsoHistoryComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-combined',
        component: SsoCombinedComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-salary',
        component: SsoSalaryComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-complete',
        component: SsoCompleteComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-combined/:id',
        component: SsoCombinedComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-salary/:id',
        component: SsoSalaryComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-complete/:id',
        component: SsoCompleteComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-occupation',
        component: SsoOccupationComponent,
        canActivate: [SsoUserPipe]
      },
      {path: 'pilot-requests', component: PilotRequestsComponent, canActivate: [SsoUserPipe]},
      {path: 'thirty-seventy', component: ThirtySeventyComponent, canActivate: [SsoUserPipe]},
      {path: 'sms', component: SsoSmsPanelComponent, canActivate: [SsoUserPipe]},
      {path: 'mad37', component: ClearanceCertificateMad37Component, canActivate: [SsoUserPipe]},
      {path: 'mad38', component: ClearanceCertificateMad38Component, canActivate: [SsoUserPipe]},
      {path: 'workshop-insurance-procrastination', component: SsoWorkshopInsuranceProcrastinationComponent, canActivate: [SsoUserPipe]},
      {path: 'buildingApproval', component: BuildingApprovalsClearanceCertificateComponent, canActivate: [SsoUserPipe]},
      {path: 'businessCards', component: BusinessCardsClearanceCertificateComponent, canActivate: [SsoUserPipe]},
      {path: 'LoanRepayments', component: LoanRepaymentsClearanceCertificateComponent, canActivate: [SsoUserPipe]},
      {
        path: 'PropertyMortgages',
        component: PropertyMortgagesClearanceCertificateComponent,
        canActivate: [SsoUserPipe]
      },
      {path: 'request-account/-1/update', component: ContactComponent, canActivate: [SsoUserPipe]},
      {path: 'announcement-statistics', component: AnnouncementStatisticsComponent, canActivate: [SsoUserPipe]},
      {path: 'statistics', component: SsoLogStatisticsComponent, canActivate: [SsoUserPipe]},
      {path: 'indemnity-view-new/:id', component: IndemnityViewNewComponent, canActivate: [SsoUserPipe]},
      {path: 'funeral-view-new/:id', component: FuneralViewNewComponent, canActivate: [SsoUserPipe]},
      {path: 'pregnancy-view-new/:id', component: PregnancyViewNewComponent, canActivate: [SsoUserPipe]},
      {
        path: 'announcement-sso',
        component: AnnouncementSsoComponent,
        canActivate: [SsoUserPipe]
      },
      {

        path: 'orthosis-and-prosthesis-view-new/:id',
        component: OrthosisAndProsthesisViewNewComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-inspection',
        component: SsoInspectionComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-medical-booklet',
        component: SsoMedicalBookletComponent,
        canActivate: [SsoUserPipe]
      },
      {path: 'marriage-view-new/:id', component: MarriageViewNewComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment-view', component: SsoWageAssignmentViewComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment-view/:id', component: SsoWageAssignmentViewComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment', component: SsoWageAssignmentComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment-evaluate/:request-id', component: SsoWageAssignmentEvaluateComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment-request/list', component: SsoWageAssignmentRequestComponent, canActivate: [SsoUserPipe]},
      {path: 'wage-assignment-request/cancel/:request-id', component: SsoWageAssignmentRequestCancelComponent, canActivate: [SsoUserPipe]},
      {path: 'subdominant/list', component: SsoSubdominantComponent, canActivate: [SsoUserPipe]},
      {path: 'subdominant/:id', component: SsoSubdominantViewComponent, canActivate: [SsoUserPipe]},
      {path: 'subdominant', component: SsoSubdominantViewComponent, canActivate: [SsoUserPipe]},
      {path: 'crm-workshops-debit', component: SsoWorkshopsDebitComponent, canActivate: [SsoUserPipe]},
      {path: 'crm-workshops-payment-sheets', component: SsoWorkshopPaymentSheetComponent, canActivate: [SsoUserPipe]},
      {path: 'crm-insured-payment-sheets', component: SsoShowPaymentSheetComponent, canActivate: [SsoUserPipe]},
      {path: 'conscription', component: SsoConscriptionComponent, canActivate: [SsoUserPipe]},
      {path: 'agent-conscription', component: SsoAgentConscriptionComponent, canActivate: [ SsoUserPipe]},
      {path: 'edict-payment', component: SsoEdictPaymentComponent, canActivate: [SsoUserPipe]},
      {path: 'guardian', component: SsoGuardianComponent, canActivate: [SsoUserPipe],
        children: [
          {
            path: 'guardian-request',
            component: GuardianRequestBothComponent,
            canActivate: [AuthGuard],
            outlet: 'ssoGuardian'
          },
          {
            path: 'guardian-request-spouse',
            component: GuardianRequestSpouseComponent,
            canActivate: [AuthGuard],
            outlet: 'ssoGuardian'
          },
          {
            path: 'guardian-request-father',
            component: GuardianRequestFatherComponent,
            canActivate: [AuthGuard],
            outlet: 'ssoGuardian'
          },
          {
            path: 'guardian-request-mother',
            component: GuardianRequestMotherComponent,
            canActivate: [AuthGuard],
            outlet: 'ssoGuardian'
          },
          {
            path: 'guardian-request-child',
            component: GuardianRequestChildComponent,
            canActivate: [AuthGuard],
            outlet: 'ssoGuardian'
          }
        ]},
      {
        path: 'pension-request/:request-id',
        component: SsoPensionRequestViewComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-objection/:id',
        component: SsoDebitObjectionComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-objection-request',
        component: SsoDebitObjectionRequestComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'detail-objection-debit',
        component: SsoDetailObjectionDebitComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-installment-request',
        component: SsoDebitInstallmentRequestComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-installment-follow',
        component: SsoDebitInstallmentFollowComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-installment-payment/:debitNumber/:nationalCode/:ticketCode',
        component: SsoDebitInstallmentPaymentComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'debit-objection-baravordi-new/:debitNumber/:workshopId/:brchCode/:nationalCode/:ticketCode',
        component: SsoDebitObjectionBaravordiComponent,
        canActivate: [SsoUserPipe],
      },
      {
        path: 'debit-objection-badvi-new/:debitNumber/:workshopId/:brchCode/:nationalCode/:ticketCode',
        component: SsoDebitObjectionBadviComponent,
        canActivate: [SsoUserPipe],
      },
      {
        path: 'sso-pension-account',
        component: SsoPensionAccountComponent,
        canActivate: [SsoUserPipe],
      },
      {
        path: 'sso-edict',
        component: SsoEdictComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'sso-pension-final-result/:id',
        component: SsoPensionFinalResultComponent,
        canActivate: [SsoUserPipe]
      },
      {
        path: 'pension-account/:request-id',
        component: SsoPensionAccountViewComponent,
        canActivate: [SsoUserPipe],

      },
      {
        path: 'sso-personal-image',
        component: SsoPersonalImageComponent,
        canActivate: [SsoUserPipe],
      },
      {
        path: 'sso-relation',
        component: SsoRelationComponent,
        canActivate: [SsoUserPipe],
      },

      {
        path: 'sso-specific-person',
        component: SsoSpecificPersonComponent,
        canActivate: [SsoUserPipe],
      },
      {
        path: 'sso-specific-person-add',
        component: SsoSpecificPersonAddComponent,
        canActivate: [SsoUserPipe],
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsoRoutingModule {
}
