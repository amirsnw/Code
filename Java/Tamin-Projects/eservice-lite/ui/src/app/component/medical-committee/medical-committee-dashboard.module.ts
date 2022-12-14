import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommitteeStageTwoComponent} from './stage-two/committee-stage-two.component';
import {MedicalCommitteeCardboardComponent} from './medical-committee-cardboard/medical-committee-cardboard.component';
import {MainCommitteeComponent} from './main-committee/main-committee.component';
import {TaminFrameworkModule} from 'tamin-framework';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommitteeCaseOneComponent} from './stage-one/case-one/committee-case-one.component';
import {CommitteeCaseThreeComponent} from './stage-one/case-three/committee-case-three.component';
import {CommitteeCaseTwoComponent} from './stage-one/case-two/committee-case-two.component';
import {CommitteeCaseFourComponent} from './stage-one/case-four/committee-case-four.component';
import {DCDirective} from './mc-directive/dc.directive';
import {CommitteeStageThreeMainComponent} from './stage-three/committee-stage-three-main.component';
import {CommitteeStageThreeHistoryComponent} from './stage-three/history/committee-stage-three-history.component';
import {CommitteeStageThreeDocumentComponent} from './stage-three/documents/committee-stage-three-document.component';
import {CommitteeRequestListComponent} from './request-list/committee-request-list.component';
import {CommitteeHelpComponent} from './committee-help/committee-help.component';
import {CommitteeIntroQuestionComponent} from './intro-question/committee-intro-question.component';
import {CommitteeDemandGridComponent} from './demand-grid/committee-demand-grid.component';
import {CommitteeIntroRelationDateFormComponent} from './intro-question/relationDateForm/committee-intro-relation-date-form.component';

@NgModule({
  imports: [
    CommonModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule,
    /*CommitteeRoutingModule*/
  ],
  declarations: [
    MainCommitteeComponent,
    CommitteeCaseOneComponent,
    CommitteeCaseTwoComponent,
    CommitteeCaseThreeComponent,
    CommitteeCaseFourComponent,
    CommitteeStageTwoComponent,
    CommitteeStageThreeMainComponent,
    CommitteeStageThreeHistoryComponent,
    CommitteeStageThreeDocumentComponent,
    CommitteeRequestListComponent,
    MedicalCommitteeCardboardComponent,
    CommitteeIntroQuestionComponent,
    CommitteeDemandGridComponent,
    CommitteeHelpComponent,
    CommitteeIntroRelationDateFormComponent,
    DCDirective
  ],
  entryComponents: [
    CommitteeCaseOneComponent,
    CommitteeCaseTwoComponent,
    CommitteeCaseThreeComponent,
    CommitteeCaseFourComponent,
    CommitteeStageTwoComponent,
    CommitteeStageThreeMainComponent,
    CommitteeStageThreeHistoryComponent,
    CommitteeStageThreeDocumentComponent,
    CommitteeRequestListComponent,
    CommitteeIntroQuestionComponent,
    CommitteeDemandGridComponent
  ]
})
export class MedicalCommitteeDashboardModule {
}
