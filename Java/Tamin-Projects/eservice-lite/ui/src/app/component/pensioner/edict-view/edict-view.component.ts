import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-edict-view',
  templateUrl: './edict-view.component.html',
  styleUrls: ['./edict-view.component.css']
})
export class EdictViewComponent extends TaminPageBaseComponent {

  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay = null;

  initializePage() {
    debugger;
    this.viewForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      fatherName: [''],
      nationalId: [''],
      idCardNumber: ['']
    });
  }


  protected loadPageData(): void {
    debugger;
    this.restService.getAll(Urls.personal).then(value => {
      this.viewForm.patchValue(value.data);
    }).catch(reason => {});
  }

  getInsuranceNumber() {
    return this.viewForm.value['insuranceNumber'];
  }

}
