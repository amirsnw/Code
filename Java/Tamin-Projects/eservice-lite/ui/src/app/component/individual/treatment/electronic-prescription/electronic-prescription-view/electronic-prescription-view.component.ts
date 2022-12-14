
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-electronic-prescription-view',
  templateUrl: './electronic-prescription-view.component.html',
  styleUrls: ['./electronic-prescription-view.component.css']
})
export class ElectronicPrescriptionViewComponent extends TaminPageBaseComponent {

  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay: any;


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
      // const theUrl = 'http://172.16.13.176:7001/erequest/api/history-services/userinfos';
      this.overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequest)
        .then(data => {
          this.hideOverlay(this.overlay);
          this.viewForm.patchValue(data.data);
          resolve(data);
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
}
