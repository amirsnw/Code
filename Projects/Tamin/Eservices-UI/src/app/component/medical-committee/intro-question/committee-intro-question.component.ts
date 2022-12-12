import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-intro-question-medical-committee',
  templateUrl: './committee-intro-question.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class CommitteeIntroQuestionComponent extends TaminPageBaseComponent {

  hideForm: boolean;
  hideNewButtons: boolean;
  birthDate: number;

  lock: boolean;

  @Output() onNewDemand = new EventEmitter<boolean>();
  @Output() onPreDemand = new EventEmitter<boolean>();
  @Output() onPastDemand = new EventEmitter<string>();

  @ViewChild('theQuestionModal') theQuestionModal: TaminModalComponent;

  /* Constructor */
  constructor(injector: Injector) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.theQuestionModal.show();
    this.hideForm = true;
    this.hideNewButtons = true;
  }

  onNewAction() {
    this.onNewDemand.emit();
  }

  onPreDemandAction() {
    this.onPreDemand.emit();
  }

  showForm() {
    this.hideForm = false;
    this.hideNewButtons = true;
  }

  cancelPastDemand() {
    this.hideForm = true;
    this.hideNewButtons = true;
  }

  continuePastDemandAction(date: string ) {
    this.onPastDemand.emit(date);
  }

  onNewDemandAction() {
    this.hideNewButtons = !this.hideNewButtons;
  }
}
