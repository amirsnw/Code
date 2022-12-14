import {Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {StpUrls} from '../../../stp-urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-funeral-no-presence-sso-header',
  templateUrl: './funeral-no-presence-sso-header.component.html',
  styleUrls: ['./funeral-no-presence-sso-header.component.css']
})
export class FuneralNoPresenceSsoHeaderComponent extends TaminPageBaseComponent implements OnInit {
  theForm: FormGroup;
  private _overlay: any;
  @Output() branchWorkshop: Array<any> = [];
  private router: ActivatedRoute;

  private data: any;
  @ViewChild('panel') panel: ElementRef;
  @Output() dataLoaded = new EventEmitter<any>();
  @Input() requestTyp;

  searchSso(values: any) {
    this._overlay = this.showOverlay();
    const urlRelation = StpUrls.STP_NEW_USER_INFO_FUNERAL_NOPRESENCE_SSO + '/' + values.nationalCode + '/' + values.ticketCode;
    this.restService.getAll(urlRelation)
      .then(value => {


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
        this.hideOverlay(this._overlay);
          // this.hideOverlay(this._overlay);
          // this.insuranceId = value1.data.insuranceId;
          // this.branchCode = value1.data.brhCode;
          // this.theForm.patchValue(data1);
        }
      )
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('خطا', reason.error.data.message);
        return;
      });
  }

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

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


  getData() {
    return this.data;
  }
}
