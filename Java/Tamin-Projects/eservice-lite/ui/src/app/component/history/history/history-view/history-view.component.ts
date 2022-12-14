import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.css']
})

export class HistoryViewComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay = null;

  initializePage() {
    this.viewForm = this.formBuilder.group({
      insuranceNumber: [''],
      nationalID: [''],
      birthDate: [''],
      firstName: [''],
      lastName: [''],
      fatherName: [''],
      identityNumber: [''],
      issueplaceName: [''],
      serial1: [''],
      serial2: ['']
    });
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequest)
        .then(data => {
          this.hideOverlay(this.overlay);
          this.viewForm.patchValue(data.data);
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
}
