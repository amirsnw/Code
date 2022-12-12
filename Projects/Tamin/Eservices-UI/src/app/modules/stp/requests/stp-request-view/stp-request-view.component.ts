import {Component, ViewChild} from '@angular/core';
import {ImageModel, TaminImageGalleryComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {FormGroup} from '@angular/forms';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-stp-request-view',
  templateUrl: './stp-request-view.component.html',
  styleUrls: ['./stp-request-view.component.css']
})
export class StpRequestViewComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('indemityImageGallery') indemityImageGallery: TaminImageGalleryComponent;

  requestHelpType: any;
  data: any;
  private _overlay: any;
  indemityForm: FormGroup;

  protected initializePage(): void {
    this.indemityForm = this.formBuilder.group({
      risuid: [''],
      fullName: [''],
      insuranceTypeDesc: [''],
      insuranceStatusDesc: [''],
      bankAccount: [''],
      bankName: [''],
      workshopName: [''],
      branchName: [''],
      requestHelpTypeDesc: [''],
      requestId: [''],
      requestDate: [''],
      statusName: [''],
      bimSDate: [''],
      bimEdate: [''],
      bimDrname: [''],
      bimDrid: [''],
      mobile: [''],
      resultMessage: ['']
    });
  }


  open(data) {
    switch (data.requestHelpType) {
      case '01': /* indemity */
        this.loadData(data.request.requestId).then(value => {
          this.theModal.show();
          this.data = value;
          this.indemityForm.get('risuid').setValue(value.data.list[0].risuid);
          this.indemityForm.get('fullName').setValue(value.data.list[0].risuFullName);
          this.indemityForm.get('insuranceTypeDesc').setValue(value.data.list[0].risuFullName);
          this.indemityForm.get('insuranceStatusDesc').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.insuranceTypeDesc);
          this.indemityForm.get('bankAccount').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.bankAccount);
          this.indemityForm.get('bankName').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.bankName);
          this.indemityForm.get('workshopName').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.workshopName);
          this.indemityForm.get('branchName').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.branchName);
          this.indemityForm.get('requestHelpTypeDesc').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.requestHelpTypeDesc);
          this.indemityForm.get('requestId').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.request.requestId);
          this.indemityForm.get('requestDate').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.request.requestDate);
          this.indemityForm.get('statusName').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.request.statusName);
          this.indemityForm.get('bimSDate').setValue(value.data.list[0].shorttermIllness[0].bimSDate);
          this.indemityForm.get('bimEdate').setValue(value.data.list[0].shorttermIllness[0].bimEdate);
          this.indemityForm.get('bimDrname').setValue(value.data.list[0].shorttermIllness[0].bimDrname);
          this.indemityForm.get('bimDrid').setValue(value.data.list[0].shorttermIllness[0].bimDrid);
          this.indemityForm.get('mobile').setValue(value.data.list[0].mobile);
          this.indemityForm.get('resultMessage').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.resultMessage);
          this.requestHelpType = data.requestHelpType;
          setTimeout(() => {
            this.indemityImageGallery.images = [];
            // this.changeDetectorRef.detectChanges();
            if (value.data.list[0].stringDocFiles !== null) {
              (<Array<any>>value.data.list[0].stringDocFiles).forEach((item) => {
                const model = new ImageModel();
                model.source = 'data:image/jpeg;base64,' + item;
                model.title = 'تجویز پزشک';
                model.removeable = false;
                this.indemityImageGallery.addImage(model);
              });
            }
          }, 0);
        }).catch(reason => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
        break;
      case '02': /* pragnancy */
        break;
      case '04': /* Orthosis & Prosthesis */
        break;
      case '05': /* mariage */
        break;
      case '06': /* travel */
        break;
      case '07': /* funeral */
        break;
    }

  }

  loadData(serial) {
    this._overlay = this.showOverlay();
    return new Promise<any>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_ShorttermRequestLoadData + '/' + serial)
        .then(value => {
          this.hideOverlay(this._overlay);
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject();
        });
    });
  }
}
