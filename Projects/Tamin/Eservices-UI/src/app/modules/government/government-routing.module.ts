import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupportivePackageRegistrationComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration/supportive-package-registration.component';
import {SupportivePackageRegistrationFollowUpComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration-follow-up/supportive-package-registration-follow-up.component';
import {GovMainComponent} from 'src/app/modules/government/components/gov-main/gov-main.component';
import {InquiryComponent} from './components/inquiry/inquiry.component';
import { GovEaseOfBusinessComponent } from './components/gov-ease-of-business/gov-ease-of-business.component';
import {ImportantPapersComponent} from './components/inportant-papers/important-papers.component';
import {InsuredStatusComponent} from './components/insured-status/insured-status.component';
import {PensionInquiryComponent} from "./components/pension-inquiry/pension-inquiry.component";

const routes: Routes = [
  {
    path: 'gov',
    children: [
      {
        path: '',
        component: GovMainComponent,
        data: {
          showMenu: false, showFooter: false, showHeader: false
        },
        /*canActivate: [AuthGuard]*/
      },
      {
        path: 'sup-pck-reg',
        component: SupportivePackageRegistrationComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
        /*canActivate: [AuthGuard]*/
      },
      {
        path: 'inquiry',
        component: InquiryComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
        /*canActivate: [AuthGuard]*/
      },
      {
        path: 'follow-up',
        component: SupportivePackageRegistrationFollowUpComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
        /*canActivate: [AuthGuard]*/
      },
      {
        path: 'ease-of-business-development',
        component: GovEaseOfBusinessComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
        /*canActivate: [AuthGuard]*/
      },
      {
        // path: 'workshop-registration/important-papers',
        path: 'important-papers',
        component: ImportantPapersComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
        // canActivate: [AuthGuard],
      },
      {
        path: 'insured-status',
        component: InsuredStatusComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
      },
      {
        path: 'pension-inquiry',
        component: PensionInquiryComponent,
        data: {showMenu: false, showFooter: false, showHeader: false},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernmentRoutingModule {
}
