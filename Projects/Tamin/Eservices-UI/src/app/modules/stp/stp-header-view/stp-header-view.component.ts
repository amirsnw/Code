import {Component} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stp-header-view',
  templateUrl: './stp-header-view.component.html',
  styleUrls: ['./stp-header-view.component.css']
})
export class StpHeaderViewComponent extends TaminPageBaseComponent {
  theForm: FormGroup;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      risuid: [''],
      fullName: [''],
      insuranceTypeDesc: [''],
      insuranceStatusDesc: [''],
      bankAccount: [''],
      bankName: [''],
      workshopName: [''],
      branchName: [''],
      requestHlpTypDesc: [''],
      requestId: [''],
      statusName: [''],
      mobilNumber: [''],
    });
  }

  setData(data) {
    this.theForm.get('risuid').setValue(data.shorttermRequest.risuid);
    this.theForm.get('fullName').setValue(data.shorttermRequest.insuranceFirstName + ' ' + data.shorttermRequest.insuranceLastName);
    this.theForm.get('insuranceTypeDesc').setValue(data.shorttermRequest.requestHelpTypeDesc);
    this.theForm.get('insuranceStatusDesc').setValue(data.shorttermRequest.insuranceStatusDesc);
    this.theForm.get('bankAccount').setValue(data.shorttermRequest.bankAccount);
    if (data.shorttermRequest.bankName) {
      this.theForm.get('bankName').setValue(data.shorttermRequest.bankName.split('-')[1]);
    }
    this.theForm.get('workshopName').setValue(data.shorttermRequest.workshopName);
    this.theForm.get('branchName').setValue(data.shorttermRequest.branchName);
    this.theForm.get('requestHlpTypDesc').setValue(data.shorttermRequest.requestHelpTypeDesc);
    this.theForm.get('requestId').setValue(data.shorttermRequest.request.requestId);
    this.theForm.get('statusName').setValue(data.shorttermRequest.request.statusName);
    this.theForm.get('mobilNumber').setValue(data.shorttermRequest.mobilNumber);
  }
}
