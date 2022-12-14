import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SsoSubdominantViewComponent} from "../sso/components/sso-pensioner/sso-subdominant/sso-subdominant-view/sso-subdominant-view.component";
import {SsoUserPipe} from "../sso/services/sso-user.pipe";
import {TcrPriceCertificateComponent} from "./components/tcr-price-certificate/tcr-price-certificate.component";
import {SearchCustomersComponent} from "./components/search-customers/search-customers.component";
import {SearchProprietaryComponent} from "./components/search-proprietary/search-proprietary.component";

const routes: Routes = [
  {
    path: 'health',
    children: [
      {path: 'tcr-price-certificate',component:TcrPriceCertificateComponent},
      {
        path: 'search-customers',
        component: SearchCustomersComponent
      },
      {
        path: 'search-proprietary',
        component: SearchProprietaryComponent
      },
      // {
      //   path: '',
      //   component: GovMainComponent,
      //   data: {
      //     showMenu: false, showFooter: false, showHeader: false
      //   },
      //   /*canActivate: [AuthGuard]*/
      // },
      // {
      //   path: 'sup-pck-reg',
      //   component: SupportivePackageRegistrationComponent,
      //   data: {showMenu: false, showFooter: false, showHeader: false},
      //   /*canActivate: [AuthGuard]*/
      // },
      // {
      //   path: 'inquiry',
      //   component: InquiryComponent,
      //   data: {showMenu: false, showFooter: false, showHeader: false},
      //   /*canActivate: [AuthGuard]*/
      // },
      // {
      //   path: 'follow-up',
      //   component: SupportivePackageRegistrationFollowUpComponent,
      //   data: {showMenu: false, showFooter: false, showHeader: false},
      //   /*canActivate: [AuthGuard]*/
      // },
      // {
      //   path: 'ease-of-business-development',
      //   component: GovEaseOfBusinessComponent,
      //   data: {showMenu: false, showFooter: false, showHeader: false},
      //   /*canActivate: [AuthGuard]*/
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule {
}
