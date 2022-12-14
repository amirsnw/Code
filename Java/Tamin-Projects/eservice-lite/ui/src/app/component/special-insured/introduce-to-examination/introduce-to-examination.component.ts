import {Component, EventEmitter, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-introduce-to-examination',
  templateUrl: './introduce-to-examination.component.html',
  styleUrls: ['./introduce-to-examination.component.css']
})

export class IntroduceToExaminationComponent extends TaminPageBaseComponent {
  @Output() commitmentChecked = new EventEmitter();
  public theForm: FormGroup;
  public tickBox = false;
  public alldisabled = false ;


  initializePage() {
    this.theForm = this.formBuilder.group({
      commitment: ['']
    });
  }

  onCommitment() {
    this.tickBox = this.theForm.get('commitment').value as boolean;
    this.commitmentChecked.emit(this.tickBox);
  }


  onIntroduceToExamination() {
    alertify.alert('در حال حاضر امکان صدور فرم به صورت غیر حضوری وجود ندارد.');
  }
}
