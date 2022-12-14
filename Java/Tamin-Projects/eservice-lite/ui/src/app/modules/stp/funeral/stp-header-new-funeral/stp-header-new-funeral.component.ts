import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-stp-header-new-funeral',
  templateUrl: './stp-header-new-funeral.component.html',
  styleUrls: ['./stp-header-new-funeral.component.css']
})
export class StpHeaderNewComponentFuneral extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  @Output() branchWorkshop: Array<any> = [];

  private data: any;
  @ViewChild('panel') panel: ElementRef;
  @Output() dataLoaded = new EventEmitter<any>();
  @Input() requestTyp;

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

  loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_NEW_USER_INFO_FUNERAL).then(value => {
        this.theForm.patchValue(value.data);
        this.data = value.data;
        (<Array<any>>value.data.branchWorkshop).forEach(value1 => {
          this.branchWorkshop.push({
            name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
            value: value1.branchCode
          });
        });
        this.dataLoaded.emit(value.data);
        this.theForm.get('requestHlpTypDesc').setValue(this.requestTyp);
        this.theForm.get('fullName').setValue(value.data.insuranceFirstName + ' ' + value.data.insuranceLastName);
        resolve();
      }).catch(reason => {
          reject(reason);
      });
    });
  }

  protected loadPageData(): void {
    // this._overlay = this.showOverlay(this.panel.nativeElement);
    // this.restService.getAll(Urls.STP_NEW_USER_INFO).then(value => {
    //   this.hideOverlay(this._overlay);
    //   this.theForm.patchValue(value.data);
    //   this.data = value.data;
    //   (<Array<any>>value.data.branchWorkshop).forEach(value1 => {
    //     this.branchWorkshop.push({
    //       name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
    //       value: value1.branchCode
    //     });
    //   });
    //   this.dataLoaded.emit(value.data);
    //   this.theForm.get('requestHlpTypDesc').setValue(this.requestTyp);
    //   this.theForm.get('fullName').setValue(value.data.insuranceFirstName + ' ' + value.data.insuranceLastName);
    // }).catch(reason => {
    //   this.hideOverlay(this._overlay);
    //   if (reason.status === 500 && reason.error) {
    //     this.showErrorMessageBox('پیام سیستم', reason.error, () => {
    //       this.redirectTo('/');
    //     });
    //   } else {
    //     this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
    //       this.redirectTo('/');
    //     });
    //   }
    // });
  }

  getData() {
    return this.data;
  }
}
