import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaminFrameworkModule} from 'tamin-framework';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OccurrenceFormComponent} from './occurrence-form/occurrence-form.component';
import {MainOccurrenceComponent} from './main-occurence/main-occurrence.component';
import {OccureFormGeneratorService} from './occure-form-generator.service';
import {OccurDirective} from './directive/occurdirective.directive';
import {OccurrenceAgreementComponent} from './occurrence-agreement/occurrence-agreement.component';

@NgModule({
  imports: [
    CommonModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule,
    /*CommitteeRoutingModule*/
  ],
  declarations: [
    MainOccurrenceComponent,
    OccurrenceFormComponent,
    OccurrenceAgreementComponent,
    OccurDirective
  ],
  entryComponents: [
    OccurrenceFormComponent,
    OccurrenceAgreementComponent
  ],
  providers: [
    OccureFormGeneratorService
  ]
})
export class OccurrenceDashboardModule {

}
