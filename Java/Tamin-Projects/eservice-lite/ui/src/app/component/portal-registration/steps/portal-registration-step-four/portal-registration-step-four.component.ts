import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-portal-registration-step-four',
  templateUrl: './portal-registration-step-four.component.html',
  styleUrls: ['./portal-registration-step-four.component.css']
})
export class PortalRegistrationStepFourComponent extends TaminPageBaseComponent {
  @Input() preview: any;
  @Output() prevStep = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Input() questionsData: any;

  protected loadPageData(): void {
    document.body.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  onSubmit() {
    this.submit.emit();
  }

  onPrevStep() {
    this.prevStep.emit();
  }

  getQuestionText(id) {
    const tmp = this.questionsData.find(c => c.questionId === id);
    if (tmp) {
      return tmp.questionDesc;
    }
  }
}
