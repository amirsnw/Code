import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaminFrameworkModule } from 'tamin-framework';
import { GovernmentRoutingModule } from './government-routing.module';
import { SupportivePackageRegistrationComponent } from './components/supportive-package/supportive-package-registration/supportive-package-registration.component';
import { SupportivePackageRegistrationFollowUpComponent } from './components/supportive-package/supportive-package-registration-follow-up/supportive-package-registration-follow-up.component';
import { SupportivePackageRegistrationStepOneComponent } from './components/supportive-package/supportive-package-registration/supportive-package-registration-step-one/supportive-package-registration-step-one.component';
import { SupportivePackageRegistrationStepTwoComponent } from './components/supportive-package/supportive-package-registration/supportive-package-registration-step-two/supportive-package-registration-step-two.component';
import { SupportivePackageRegistrationStepThreeComponent } from './components/supportive-package/supportive-package-registration/supportive-package-registration-step-three/supportive-package-registration-step-three.component';
import { GovMainComponent } from './components/gov-main/gov-main.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';
import { GovEaseOfBusinessComponent } from './components/gov-ease-of-business/gov-ease-of-business.component';
import { BusinessStartersIndicatorComponent } from './components/gov-ease-of-business/business-starters-indicator/business-starters-indicator.component';
import { RegisterPropertyRegistrationComponent } from './components/gov-ease-of-business/register-property-registration/register-property-registration.component';
import {ImportantPapersComponent } from './components/inportant-papers/important-papers.component';
import {ImportantPapersListComponent } from './components/inportant-papers/important-papers-list/important-papers-list.component';
import {ImportantPapersNewComponent } from './components/inportant-papers/important-papers-new/important-papers-new.component';
import {ImportantPapersDisplayComponent } from './components/inportant-papers/important-papers-display/important-papers-display.component';
import {ImportantPapersSearchComponent } from './components/inportant-papers/important-papers-search/important-papers-search.component';
import {InsuredStatusComponent } from './components/insured-status/insured-status.component';
import {InsuredStatusListComponent } from './components/insured-status/insured-status-list/insured-status-list.component';
import {InsuredStatusSearchComponent } from './components/insured-status/insured-status-search/insured-status-search.component';
import { PensionInquiryComponent } from './components/pension-inquiry/pension-inquiry.component';
import { PensionInquiryListComponent } from './components/pension-inquiry/pension-inquiry-list/pension-inquiry-list.component';
import { PensionInquirySearchComponent } from './components/pension-inquiry/pension-inquiry-search/pension-inquiry-search.component';

@NgModule({
  imports: [
    CommonModule,
    GovernmentRoutingModule,
    BrowserModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SupportivePackageRegistrationStepOneComponent,
    SupportivePackageRegistrationStepTwoComponent,
    SupportivePackageRegistrationStepThreeComponent
  ],
  declarations: [
    SupportivePackageRegistrationComponent,
    SupportivePackageRegistrationFollowUpComponent,
    SupportivePackageRegistrationStepOneComponent,
    SupportivePackageRegistrationStepTwoComponent,
    SupportivePackageRegistrationStepThreeComponent,
    GovMainComponent,
    InquiryComponent,
    GovEaseOfBusinessComponent,
    BusinessStartersIndicatorComponent,
    RegisterPropertyRegistrationComponent,
    ImportantPapersComponent,
    ImportantPapersListComponent,
    ImportantPapersNewComponent,
    ImportantPapersDisplayComponent,
    ImportantPapersSearchComponent,
    InsuredStatusComponent,
    InsuredStatusListComponent,
    InsuredStatusSearchComponent,
    PensionInquiryComponent,
    PensionInquiryListComponent,
    PensionInquirySearchComponent

  ]
})
export class GovernmentModule { }
