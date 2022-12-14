import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {FuneralNoPresenceSsoHeaderComponent} from './funeral-no-presence-sso-header/funeral-no-presence-sso-header.component';
import {ActivatedRoute} from '@angular/router';
import {StpUrls} from '../../stp-urls';
import {FuneralNoPresenceSsoDetailComponent} from './funeral-no-presence-sso-detail/funeral-no-presence-sso-detail.component';

@Component({
  selector: 'app-funeral-no-presence-sso',
  templateUrl: './funeral-no-presence-sso.component.html',
  styleUrls: ['./funeral-no-presence-sso.component.css']
})
export class FuneralNoPresenceSsoComponent extends TaminPageBaseComponent implements OnInit {
  @ViewChild('funeralNoPresenceHeaderSso') funeralNoPresenceHeaderSso: FuneralNoPresenceSsoHeaderComponent;
  @ViewChild('funeralNoPresenceDetailSso') funeralNoPresenceDetailSso: FuneralNoPresenceSsoDetailComponent;

  private router: ActivatedRoute;
  searchParams: SearchParam[];
  currentObject: any;
  personalImageSearchForm: FormGroup;
  isDisabled: boolean;
  private overlay: any;
  searchForm: FormGroup;
  formShowEnable: boolean;


  private _overlay: any;


  ngOnInit() {
  }

  initializePage() {
    this.isDisabled = false;
    this.formShowEnable = false;
    this._initializeFromGroup();
    // this._initializeFromGroupSearch();
    // this._initializeDataGrid();
  }

  // private _initializeFromGroupSearch() {
  //   this.personalImageSearchForm = this.fb.group({
  //     nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  //     ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
  //   });
  // }

  private _initializeFromGroup() {
  }

  onSearch(params: any) {
    this.funeralNoPresenceHeaderSso.searchSso(params);
    // this.formShowEnable = true;
  }

  validateFuneral(params: any) {
    const tmp = this.funeralNoPresenceHeaderSso.getData();
    if (tmp === undefined) {
      this.showErrorMessageBox('پیام سیستم', 'اطلاعات بیمه شده دریافت نشده است.');
      return;
    }
    this.funeralNoPresenceDetailSso.onValidateDeadMain(tmp, params);
  }

  onSaveRequest(params: any) {
    const tmp = this.funeralNoPresenceHeaderSso.getData();
    const data = {
      shorttermRequest:
        {
          request: {},
          requestFileList: [],
          risuid: tmp.risuid,
          insuranceFirstName: tmp.insuranceFirstName,
          insuranceLastName: tmp.insuranceLastName,
          nationalCode: tmp.nationalCode,
          requestHelpType: '07',
          mobilNumber: tmp.mobilNumber,
          // serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
          branchCode: tmp.branchCode,
          branchName: ''
        },
      // kdno: null,
      // dtype:this.theForm.get('dtype').value,//'a000372245',// '0o04669616',
      deadnationalId: params.deadNationalId
      // deadnationalId:this.spouses.filter(c => c.risuId === this.theForm.get('dtype').value)[0].nationCode//'0065913035',//
    };


    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_FUNERAL_NOPRESENCE_SAVE_SSO, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data.message != undefined && reason.error.data.message.trim() != '') {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        else if (reason.error && reason.error.data.message != undefined && reason.error.data.message.trim() === '') {
          this.showErrorMessageBox('پیام سیستم', 'امکان ثبت درخواست برای شما وجود ندارد');
        }
        else if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });

  }

}
