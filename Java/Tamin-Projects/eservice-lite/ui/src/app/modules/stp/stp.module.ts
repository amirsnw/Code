import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TaminFrameworkModule} from 'tamin-framework';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StpRoutingModule} from './stp-routing.module';
import {RequestsComponent} from './requests/requests.component';
import {IndemnityNewComponent} from './indemnity/indemnity-new/indemnity-new.component';
import {IndemnityViewNewComponent} from './indemnity/indemnity-view-new/indemnity-view-new.component';
import {FuneralNewComponent} from './funeral/funeral-new/funeral-new.component';
import {FuneralViewNewComponent} from './funeral/funeral-view-new/funeral-view-new.component';
import {MarriageNewComponent} from './marriage/marriage-new/marriage-new.component';
import {MarriageViewNewComponent} from './marriage/marriage-view-new/marriage-view-new.component';
import {MarriageHistoryCalcComponent} from './marriage/marriage-history-calc/marriage-history-calc.component';
import {OrthosisAndProsthesisNewComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-new/orthosis-and-prosthesis-new.component';
import {OrthosisAndProsthesisViewNewComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-view-new/orthosis-and-prosthesis-view-new.component';
import {PregnancyNewComponent} from './pregnancy/pregnancy-new/pregnancy-new.component';
import {PregnancyViewNewComponent} from './pregnancy/pregnancy-view-new/pregnancy-view-new.component';
import {RequestResultNewComponent} from './request/request-result-new/request-result-new.component';
import {RequestListNewComponent} from './request/request-list-new/request-list-new.component';
import {IndemnityInquiryComponent} from './indemnity/indemnity-inquiry/indemnity-inquiry.component';
import {PregnancyInquiryComponent} from './pregnancy/pregnancy-inquiry/pregnancy-inquiry.component';
import {MarriageInquiryComponent} from './marriage/marriage-inquiry/marriage-inquiry.component';
import {IntroductionToWorkComponent} from './introduction-to-work/introduction-to-work.component';
import {IntroductionListComponent} from './introduction-to-work/introduction-list/introduction-list.component';
import {IntroListComponent} from './introduction-to-work/introduction-list/intro-list/intro-list.component';
import {ShowRequestsComponent} from './show-requests/show-requests.component';
import {StpRequestViewComponent} from './requests/stp-request-view/stp-request-view.component';
import {StpHeaderNewComponent} from './stp-header-new/stp-header-new.component';
import {StpHeaderNewComponentFuneral} from './funeral/stp-header-new-funeral/stp-header-new-funeral.component';
import {MarriageConditionsComponent} from './marriage/marriage-conditions/marriage-conditions.component';
import {WorkshopSearchComponent} from './introduction-to-work/introduction-list/workshop-search/workshop-search.component';
import {StpHeaderViewComponent} from './stp-header-view/stp-header-view.component';
import {MarriageNoPresenceComponent} from './marriage/marriage-no-presence/marriage-no-presence.component';
import {MarriageConditionsNoPresenceComponent} from './marriage/marriage-conditions-no-presence/marriage-conditions-no-presence.component';
import {MarriageNoPresenceHeaderComponent} from './marriage/marriage-no-presence-header/marriage-no-presence-header.component';
import {MarriageNoPresenceSearchComponent} from './marriage/marriage-no-presence-search/marriage-no-presence-search.component';
import {MarriageNoPresenceMenuComponent} from './marriage/marriage-no-presence_menu/marriage-no-presence_menu.component';
import {FuneralNoPresenceComponent} from './funeral/funeral-no-presence/funeral-no-presence.component';
import {StpHeaderFuneralNoPresenceComponent} from './funeral/stp-header-funeral-no-presence/stp-header-funeral-no-presence.component';
import {FuneralNoPresenceSsoComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso.component';
import {FuneralNoPresenceSsoSearchComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso-search/funeral-no-presence-sso-search.component';
import {FuneralNoPresenceSsoHeaderComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso-header/funeral-no-presence-sso-header.component';
import {FuneralNoPresenceSsoDetailComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso-detail/funeral-no-presence-sso-detail.component';
import {OrthosisAndProsthesisNoPresenceComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-no-presence/orthosis-and-prosthesis-no-presence.component';
import {OrthosisAndProsthesisNoPresenceHeaderComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-no-presence-header/orthosis-and-prosthesis-no-presence-header.component';
import {OrthosisAndProsthesisNoPresenceSearchComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-no-presence-search/orthosis-and-prosthesis-no-presence-search.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    TaminFrameworkModule,
    FormsModule,
    StpRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RequestsComponent,
    IndemnityNewComponent,
    IndemnityViewNewComponent,
    FuneralNewComponent,
    FuneralViewNewComponent,
    MarriageNewComponent,
    MarriageViewNewComponent,
    MarriageHistoryCalcComponent,
    OrthosisAndProsthesisNewComponent,
    OrthosisAndProsthesisViewNewComponent,
    PregnancyNewComponent,
    PregnancyViewNewComponent,
    RequestResultNewComponent,
    RequestListNewComponent,
    IndemnityInquiryComponent,
    PregnancyInquiryComponent,
    MarriageInquiryComponent,
    IntroductionToWorkComponent,
    IntroductionListComponent,
    IntroListComponent,
    ShowRequestsComponent,
    StpRequestViewComponent,
    StpHeaderNewComponent,
    StpHeaderNewComponentFuneral,
    MarriageConditionsComponent,
    WorkshopSearchComponent,
    StpHeaderViewComponent,
    MarriageNoPresenceComponent,
    MarriageConditionsNoPresenceComponent,
    MarriageNoPresenceHeaderComponent,
    MarriageNoPresenceSearchComponent,
    MarriageNoPresenceMenuComponent,
    FuneralNoPresenceComponent,
    StpHeaderFuneralNoPresenceComponent,
    FuneralNoPresenceSsoComponent,
    FuneralNoPresenceSsoSearchComponent,
    FuneralNoPresenceSsoHeaderComponent,
    FuneralNoPresenceSsoDetailComponent,
    OrthosisAndProsthesisNoPresenceComponent,
    OrthosisAndProsthesisNoPresenceHeaderComponent,
    OrthosisAndProsthesisNoPresenceSearchComponent

  ]
})
export class StpModule {
}
