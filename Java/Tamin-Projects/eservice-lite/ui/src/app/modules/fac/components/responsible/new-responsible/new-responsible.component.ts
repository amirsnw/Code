import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetStackholders} from '../../../models/alo-request-det-stackholders';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-responsible',
  templateUrl: './new-responsible.component.html',
  styleUrls: ['./new-responsible.component.css']
})
export class NewResponsibleComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  // @ViewChild('nationalityCombobBox') nationalityCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('positionCombobBox') positionCombobBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private responsiblesId: any;
  private _subscription = new Subscription();




  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      nationality: [''],
      nationalId: [''],
      birthDate: [''],
      firstName: [''],
      lastName: [''],
      positionDesc: [''],
      detResponsiblesId: [''],
      requests: [''],
      cityCode: [''],
      position: [''],
      phoneNumber: [''],
      mobileNumber: [''],
    });
    // this.nationalityCombobBox.dataItems = [
    //   {
    //     name: 'ایرانی',
    //     value: '1'
    //   }, {
    //     name: 'تبعه خارجی',
    //     value: '2'
    //   }
    // ];
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.responsiblesId = this.route.snapshot.params['responsiblesId'];
    this.positionCombobBox.dataItems = [
      {
        name: 'مدیر مالی',
        value: '1'
      },
      {
        name:  'رئیس حسابداری',
        value: '2'
      },
      {
        name: 'معاون مالی',
        value: '3'
      },
      {
        name:  'سایر',
        value: '4'
      },
     ];
     this.loadData();
    // this.editForm.get('nationality').setValue('1');
    // this.editForm.get('nationality').disable();
    debugger;
    this._subscription.add(this.editForm.get('position').valueChanges.subscribe(value => {
      debugger;
      if (this.editForm.get('position').value() === '4') {
        this.editForm.get('positionDesc').enable();
      } else {
        this.editForm.get('positionDesc').disable();
        this.editForm.get('positionDesc').setValue('');
      }
    }));
    // this._subscription.add(this.editForm.get('birthDate').valueChanges.subscribe(value => {
    //   debugger;
    //   this.getPersianDate(this.editForm.get('birthDate'));
    //   const theUrl = `${FacUrls.GET_IDENTIFICATION}/` + this.editForm.get('nationalId').value +
    //         '/' + this.getPersianDate(this.editForm.get('birthDate'));
    //       this.restService.getAll(theUrl)
    //         .then(values => {
    //           debugger;
    //           if (values.data.total > 0 && values.data.list[0].sigOwner === null) {
    //             this.showErrorMessageBox('خطا', 'این کد ملی قبلاً ثبت شده است.');
    //             // this.setEnableSave = false;
    //             // this.repeatedNationalCode = true;
    //           }
    //         })
    //         .catch(error => {
    //           this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    //         });
    // }));
    }

  loadData() {
    debugger;
    if (this.editMode === '1' ) {
      const theUrl = `${FacUrls.RESPONSIBLE_ID}/` + this.responsiblesId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          if (values.data && this.editMode === '1') {
            this.editForm.patchValue(values.data.list[0]);
          }
          this.editForm.get('nationality').setValue('ایرانی');
          this.editForm.get('nationality').disable();
        })
        .catch(error => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }
  cellServiceNationalityCode(item) {
    switch (item) {
      case '1':
        return 'ایرانی';
      case '2':
        return 'تبعه خارجی';
    }
  }
  cellServicePosition(item) {
    switch (item) {
      case '1':
        return 'مدیرعامل';
      case '2':
        return 'رئیس هیئت مدیره';
      case '3':
        return 'نائب رئیس هیئت مدیره';
      case '4':
        return 'اعضاء هیئت مدیره';
      case '5':
        return 'بازرس';
      case '6':
        return 'بازرس علی البدل';
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetResponsible();
    jsondata.nationality = '1';
    jsondata.nationalId = values.nationalId;
    jsondata.birthDate = values.birthDate;
    jsondata.firstName = values.firstName;
    jsondata.lastName = values.lastName;
    jsondata.position = values.position;
    jsondata.positionDesc =  values.positionDesc;
    jsondata.cityCode =  values.cityCode;
    jsondata.phoneNumber =  values.phoneNumber;
    jsondata.mobileNumber =  values.mobileNumber;
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.detResponsiblesId = this.responsiblesId ;
    } else {
      jsondata.detResponsiblesId = undefined;
    }
   debugger;
   if (jsondata.detResponsiblesId === undefined ) {
      this.restService.create(FacUrls.RESPONSIBLE_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/responsible/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.RESPONSIBLE_EDIT, this.responsiblesId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/responsible/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/responsible/' +  this.requestId);
  }
  onChangPosition() {
    debugger;
      // if (this.editForm.get('position').value === '4') {
      //   this.editForm.get('positionDesc').enable();
      // } else if (this.editForm.get('position').value === '1') {
      //   this.editForm.get('positionDesc').disable();
      //   this.editForm.get('positionDesc').value('');
      // }
  }

}
