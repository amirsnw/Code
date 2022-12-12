import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {DetRequestAuditorsComponent} from '../det-request-auditors.component';
import {AloRequestDetAuditors} from '../../../models/alo-request-det-auditors';
import {any} from 'codelyzer/util/function';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-det-request-auditors',
  templateUrl: './new-det-request-auditors.component.html',
  styleUrls: ['./new-det-request-auditors.component.css']
})
export class NewDetRequestAuditorsComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('typeComboBox') typeComboBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('reportResultComboBox') reportResultComboBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private aloRequestDetAuditorsId: any;
  startFiscalYear: any;
  endFiscalYear: any;
  items: any;
  diffStartEnd: Array<number>;
  diffStartReq: Array<number>;
  diffreqEnd: Array<number>;
  sumDiff: Array<number>;
  dateStart: any;
  dateEnd: any;
  timeDiff: any;
  diffDays: any;
  nationalName: any;
  private _subscription = new Subscription();

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      type: [''],
      nationalId: ['', Validators.required],
      birthDate: [''],
      auditorName: ['', Validators.required],
      reportResult: ['', Validators.required],
      endDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      postCode: ['', Validators.required],
      address: ['', Validators.required],
     });
    this.nationalName = 'کد ملی';
    this.typeComboBox.dataItems = [
      {
        name: 'کد ملی',
        value: '1'
      }, {
        name: 'شناسه ملی',
        value: '2'
      }
    ];
    this.editForm.get('type').setValue('1');
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.aloRequestDetAuditorsId = this.route.snapshot.params['auditorsId'];
    this.reportResultComboBox.dataItems = [
       {
        name: 'مقبول',
        value: '1'
      },
      {
        name:  'مشروط',
        value: '2'
      },
      {
        name: 'عدم اظهارنظر',
        value: '3'
      },
      {
        name:  'مردود',
        value: '4'
      },
    ];
    debugger;
    this.loadData();
    this._subscription.add(this.editForm.get('type').valueChanges.subscribe(value => {
      debugger;
     if (value === '1' ) {
        this.nationalName = 'کد ملی';
      } else {
        this.nationalName = 'شناسه ملی';
       this.editForm.get('birthDate').setValue('');
        this.editForm.get('birthDate').disable();
      }
    }));
  }

  loadData() {
    debugger;
    if (this.editMode === '1') {
      const theUrl = `${FacUrls.AUDITORS_BY_ID}/` +  this.aloRequestDetAuditorsId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          if (values.data && this.editMode === '1') {
            this.editForm.patchValue(values.data.list[0]);
           }
        })
        .catch(error => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const theUrl = `${FacUrls.COMPANY_ACCOUNT_PERIOD}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(parameters => {
        ////cheeck kardan date
        this.items = 1;
        if (this.items > 0) {
          const jsondata = new AloRequestDetAuditors();
          jsondata.nationalId = values.nationalId;
          jsondata.auditorName = values.auditorName;
          jsondata.postCode = values.postCode;
          jsondata.address = values.address;
          jsondata.phoneNumber = values.phoneNumber;
          jsondata.reportResult = values.reportResult;
          jsondata.birthDate =  values.birthDate;
          jsondata.endDate = values.endDate;
          jsondata.requests = new (AloRequest);
          jsondata.requests.requestId = this.requestId;
          if ( this.editMode === '1') {
            jsondata.aloRequestDetAuditorsId = this.aloRequestDetAuditorsId ;
          }
          debugger;
          if (this.aloRequestDetAuditorsId === undefined || this.aloRequestDetAuditorsId === '' || this.aloRequestDetAuditorsId === '0') {
            this.restService.create(FacUrls.AUDITORS_SAVE, jsondata)
              .then(resulttt => {
                this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
                  debugger;
                  this.close.emit();
                  this.redirectTo('/fac/detRequestAuditors/' + this.requestId);
                });
              })
              .catch(result => {
                alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
              });

          } else {
            this.restService.update(FacUrls.AUDITORS_EDIT, this.aloRequestDetAuditorsId.toString(), jsondata)
              .then(resulttt => {
                this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
                  debugger;
                  this.close.emit();
                  this.redirectTo('/fac/detRequestAuditors/' + this.requestId);
                });
              })
              .catch(result => {
                alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
              });

          }
        } else {
          this.showErrorMessageBox('خطا', 'کاربر گرامي، منتهي به تاريخ بايد در بازه سال (هاي) مالي ثبت شده در صفحه قبل باشد.');
        }
         })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });

  }

  diffDate(dat1, dat2) {
    // this.dateStart = Audit.tamin.helpers.Persian.gregorianToPersian(new Date(Number(dat1)));
    // this.dateEnd = Audit.tamin.helpers.Persian.gregorianToPersian(new Date(Number(dat2)));
    this.dateStart = dat1;
    this.dateEnd = dat2;
    this.dateStart = new Date(this.dateStart);
    this.dateEnd = new Date(this.dateEnd);
    const timeDiff = Math.abs(this.dateEnd.getTime() - this.dateStart.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return(diffDays);
  }
  back() {
    this.redirectTo('/fac/detRequestAuditors/' +  this.requestId);
  }

}
