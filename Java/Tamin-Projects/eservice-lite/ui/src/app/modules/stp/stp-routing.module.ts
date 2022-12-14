import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestsComponent} from './requests/requests.component';
import {AuthGuard} from '../../guards/auth.guard';
import {IndemnityNewComponent} from './indemnity/indemnity-new/indemnity-new.component';
import {IndemnityViewNewComponent} from './indemnity/indemnity-view-new/indemnity-view-new.component';
import {FuneralNewComponent} from './funeral/funeral-new/funeral-new.component';
import {FuneralViewNewComponent} from './funeral/funeral-view-new/funeral-view-new.component';
import {MarriageViewNewComponent} from './marriage/marriage-view-new/marriage-view-new.component';
import {MarriageHistoryCalcComponent} from './marriage/marriage-history-calc/marriage-history-calc.component';
import {OrthosisAndProsthesisNewComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-new/orthosis-and-prosthesis-new.component';
import {OrthosisAndProsthesisViewNewComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-view-new/orthosis-and-prosthesis-view-new.component';
import {PregnancyNewComponent} from './pregnancy/pregnancy-new/pregnancy-new.component';
import {PregnancyViewNewComponent} from './pregnancy/pregnancy-view-new/pregnancy-view-new.component';
import {RequestListNewComponent} from './request/request-list-new/request-list-new.component';
import {IndemnityInquiryComponent} from './indemnity/indemnity-inquiry/indemnity-inquiry.component';
import {PregnancyInquiryComponent} from './pregnancy/pregnancy-inquiry/pregnancy-inquiry.component';
import {MarriageInquiryComponent} from './marriage/marriage-inquiry/marriage-inquiry.component';
import {IntroductionToWorkComponent} from './introduction-to-work/introduction-to-work.component';
import {IntroductionListComponent} from './introduction-to-work/introduction-list/introduction-list.component';
import {IntroListComponent} from './introduction-to-work/introduction-list/intro-list/intro-list.component';
import {ShowRequestsComponent} from './show-requests/show-requests.component';
import {RequestResultNewComponent} from './request/request-result-new/request-result-new.component';
import {MarriageNoPresenceComponent} from './marriage/marriage-no-presence/marriage-no-presence.component';
import {MarriageNoPresenceMenuComponent} from './marriage/marriage-no-presence_menu/marriage-no-presence_menu.component';
import {FuneralNoPresenceComponent} from './funeral/funeral-no-presence/funeral-no-presence.component';
import {FuneralNoPresenceSsoComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso.component';
import {FuneralNoPresenceSsoSearchComponent} from './funeral/funeral-no-presence-sso/funeral-no-presence-sso-search/funeral-no-presence-sso-search.component';
import {SsoUserPipe} from '../sso/services/sso-user.pipe';
import {OrthosisAndProsthesisNoPresenceComponent} from './orthosis-and-prosthesis/orthosis-and-prosthesis-no-presence/orthosis-and-prosthesis-no-presence.component';

const routes: Routes = [
  {
    path: 'stp',
    children: [
      {
        path: '',
        component: RequestsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'indemnity',
        component: IndemnityNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'indemnity-view/:id',
        component: IndemnityViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral',
        component: FuneralNoPresenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral-view/:id',
        component: FuneralViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral/:id',
        component: FuneralNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage',
        component: MarriageNoPresenceMenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage/:id',
        component: MarriageNoPresenceMenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage-view/:id',
        component: MarriageViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage-history-calc',
        component: MarriageHistoryCalcComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orthosis-prosthesis',
        component: OrthosisAndProsthesisNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orthosis-prosthesis/:id',
        component: OrthosisAndProsthesisNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orthosis-prosthesis-view/:id',
        component: OrthosisAndProsthesisViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pregnancy',
        component: PregnancyNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pregnancy/:id',
        component: PregnancyNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pregnancy-view/:id',
        component: PregnancyViewNewComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'request-result/:id',
        component: RequestResultNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral-view-new/:id',
        component: FuneralViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'indemnity-view-new/:id',
        component: IndemnityViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage-view-new/:id',
        component: MarriageViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orthosis-and-prosthesis-view-new/:id',
        component: OrthosisAndProsthesisViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'request-list-new',
        component: RequestListNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pregnancy-view-new/:id',
        component: PregnancyViewNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'indemnity-inquiry',
        component: IndemnityInquiryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pregnancy-inquiry',
        component: PregnancyInquiryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'marriage-inquiry',
        component: MarriageInquiryComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'introduction/:letterno',
        component: IntroductionToWorkComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'introduction-list',
        component: IntroductionListComponent,
        canActivate: [AuthGuard],
      }, {
        path: 'intro-list',
        component: IntroListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'show-requests',
        component: ShowRequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'marriage-no-presence',
        component: MarriageNoPresenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage-no-presence/:id',
        component: MarriageNoPresenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marriage-no-presence_menu/:id',
        component: MarriageNoPresenceMenuComponent,
        canActivate: [AuthGuard],
      }
      ,
      {
        path: 'marriage-no-presence_menu',
        component: MarriageNoPresenceMenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral-no-presence',
        component: FuneralNoPresenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral-no-presence-sso',
        component: FuneralNoPresenceSsoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'funeral-no-presence-sso-search',
        component: FuneralNoPresenceSsoSearchComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orthosis-and-prosthesis-no-presence',
        component: OrthosisAndProsthesisNoPresenceComponent,
        canActivate: [SsoUserPipe]
      }


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StpRoutingModule {
}
