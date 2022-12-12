import {Component, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';
import {StpHeaderFuneralNoPresenceComponent} from '../stp-header-funeral-no-presence/stp-header-funeral-no-presence.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-funeral',
  templateUrl: './funeral-no-presence.component.html',
  styleUrls: ['./funeral-no-presence.component.css']
})
export class FuneralNoPresenceComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private data: any;
  spouses = [];
   deadEdit = false;
  deadNew = true;
  isDisabled=true;
  @ViewChild('header') header: StpHeaderFuneralNoPresenceComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      deadName: [''],
      deadNationalId:['', Validators.required],
      deadRelation:[''],
      partnerNationalId:[''],
      weddingDateTimeStamp:['']
    });

  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.header
          .loadData()
          .then(value1 => {
            debugger;
            this.hideOverlay(this._overlay);
                        this.deadEdit = this.header.getData().flag;
            this.deadNew = !this.header.getData().flag;
  if (this.header.getData().flag) {
              debugger;
              this.theForm.get('partnerNationalId').setValue(this.header.getData().partnerNationalId);
              this.theForm.get('weddingDateTimeStamp').setValue(this.header.getData().weddingTimestamp);
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            }

          });
  }

onValidateDead(){
    this._overlay = this.showOverlay();
     return new Promise<any>((resolve, reject) => {
        var theUrl = StpUrls.STP_VALIDATE_FUNERAL_NOPRESENCE + '/' +this.theForm.get('deadNationalId').value;
            this.restService.getAll(theUrl).then(value => {
                this.hideOverlay(this._overlay);
              this.theForm.patchValue(value.data);
              this.data = value.data;
              // (<Array<any>>value.data.branchWorkshop).forEach(value1 => {
              //   this.branchWorkshop.push({
              //     name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
              //     value: value1.branchCode
              //   });
              // });
              // this.dataLoaded.emit(value.data);
              if(value.data[6]=='0'){//voras(tabaieye daraye sharayet yaft nashod)
               this.isDisabled=false
              this.theForm.get('deadRelation').setValue(value.data[5]);
              this.theForm.get('deadName').setValue(value.data[4]);
              }else if(value.data[6]=='1'){//daraye sharayet
              this.isDisabled=true
              this.theForm.get('deadRelation').setValue(value.data[5]);
              this.theForm.get('deadName').setValue(value.data[4]);
              }else  if(value.data[6]=='3'){//adame ehraze sharayet(shakhse digari daraye sharayet mibashad)
              this.showInfoMessageBox('پیام سیستم',value.data[7]);// 'شما دارای  شرایط دریافت کمک هزینه مراسم ترحیم نمی باشید'
              return;
            }
            else{//adame ehraze sharayet(shakhse digari daraye sharayet mibashad)
                this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', 'شما دارای  شرایط دریافت کمک هزینه مراسم ترحیم نمی باشید');
              return;
              }

              resolve();
            }).catch(reason => {
              // reject(reason);
              debugger;
                this.hideOverlay(this._overlay);
               this.isDisabled=true
              if (reason.error && reason.error.data) {
                this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
              } else {
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              }
            });
          });

}
  onSendRequest() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }

    const tmp = this.header.getData();
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
      deadnationalId:this.theForm.get('deadNationalId').value
      // deadnationalId:this.spouses.filter(c => c.risuId === this.theForm.get('dtype').value)[0].nationCode//'0065913035',//
    };


    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_FUNERAL_NOPRESENCE_SAVE, data)
      .then(value => {
        debugger;
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
          if (reason.error && reason.error.data.message != undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } 
        else if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
 
  }

   onReConfirmRequest() {
    const tmp = this.header.getData();
    debugger;
    this._overlay = this.showOverlay();
    var theUrl = StpUrls.STP_FUNERAL_NOPRESENCE_CONFIRM + '/' + tmp.request.id;
    this.restService.create(theUrl, null)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
          if (reason.error && reason.error.data.message != undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } 
        else  if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
}
