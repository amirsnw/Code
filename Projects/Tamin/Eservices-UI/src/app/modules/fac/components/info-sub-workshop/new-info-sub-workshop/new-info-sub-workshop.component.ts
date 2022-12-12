import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetStackholders} from '../../../models/alo-request-det-stackholders';
import {AloRequest} from '../../../models/alo-request';
import {AloReqDetWorkshopAddress} from '../../../models/alo-req-det-workshop-address';
import {Province} from '../../../models/baseinfo/province';
import {City} from '../../../models/baseinfo/city';
import {Branch} from '../../../models/branch';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-info-sub-workshop',
  templateUrl: './new-info-sub-workshop.component.html',
  styleUrls: ['./new-info-sub-workshop.component.css']
})
export class NewInfoSubWorkshopComponent  extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('nameCombobBox') nameCombobBox: TaminFieldComboBoxStaticComponent;

  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private detWorkshopAddressId: any;
  branchCode = [];
  private provinceCode: any;
  private cityCode: any;
  private _subscription = new Subscription();


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      name: [''],
      nationalCode: [''],
      branchCode: [''],
      workshopId: [''],
      Province: [''],
      citycode: [''],
      mobail: [''],
      email: [''],
      requests: [''],
      codePosti: [''],
      workshopAddressDesc: [''],
      detWorkshopAddressId: [''],
      workshopAddressPhone1: [''],
      cityCode1: [''],
      workshopAddressPhone3: [''],
      cityCode2: [''],
      workshopAddressPhone2: [''],
      cityCode3: [''],
      faxNo: [''],
      cityCodefax: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.nameCombobBox.dataItems = [
      {
        name: 'دفتر مرکزی',
        value: '1'
      },
      {
        name:  'کارخانه',
        value: '2'
      },
      {
        name: 'نمایندگی',
        value: '3'
      },
      {
        name:  'انبار',
        value: '4'
      },
      {
        name: 'فروشگاه',
        value: '5'
      },
      {
        name:  'دفتر اداری',
        value: '6'
      }
    ];
    this.editForm.get('citycode').disable();
    this.editForm.get('Province').disable();
    debugger;
    this.fillReciveBranchComboBox();
    this.loadData();
    this._subscription.add(this.editForm.get('branchCode').valueChanges.subscribe(value => {
      debugger;
      const theUrl = `${FacUrls.BRANCH_CODE}/` + value;
      this.restService.getAll(theUrl)
        .then(data => {
          debugger;
          this.editForm.get('citycode').setValue(data.data.list[0].city.cityName);
          this.cityCode = data.data.list[0].city.cityCode;
          this.editForm.get('Province').setValue(data.data.list[0].city.provinceCode.provinceName);
          this.provinceCode = data.data.list[0].city.provinceCode.provinceCode;
          if ( this.editForm.get('workshopId')) {
            this.isValidWorkshopCode();
          }
        })
        .catch(reason => {
        });
    }));
    this._subscription.add(this.editForm.get('workshopId').valueChanges.subscribe(value => {
      this.isValidWorkshopCode();

    }));
  }

  loadData() {
    debugger;
    if (this.editMode === '1' ) {
      const theUrl = `${FacUrls.WORKSHOP_ADDREES}/` + this.requestId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          // &&  this.editMode === '1'
          if (values.data && this.editMode === '1') {
            this.editForm.patchValue(values.data.list[0]);
            this.editForm.get('branchCode').setValue(values.data.list[0].branch.brhCode);
            this.editForm.get('citycode').setValue(values.data.list[0].city.cityName);
            this.editForm.get('citycode').disable();
            this.editForm.get('Province').setValue(values.data.list[0].city.provinceCode.provinceName);
            this.editForm.get('Province').disable();
            this.detWorkshopAddressId = values.data.list[0].detWorkshopAddressId;
          }
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
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloReqDetWorkshopAddress();
    jsondata.name = values.name;
    jsondata.nationalCode = values.nationalCode;
    jsondata.branch = new (Branch);
    jsondata.branch.brhCode = values.branchCode;
    jsondata.workshopId = values.workshopId;
    jsondata.city = new (City);
    jsondata.city.cityCode = this.cityCode;
    jsondata.province = new (Province);
    jsondata.province.provinceCode = this.provinceCode;
    jsondata.mobail = values.mobail;
    jsondata.email = values.email;
    jsondata.codePosti = values.codePosti;
    jsondata.workshopAddressDesc = values.workshopAddressDesc;
    jsondata.detWorkshopAddressId = values.detWorkshopAddressId;
    jsondata.workshopAddressPhone1 = values.workshopAddressPhone1;
    jsondata.cityCode1 = values.cityCode1;
    jsondata.workshopAddressPhone3 = values.workshopAddressPhone3;
    jsondata.cityCode2 = values.cityCode2;
    jsondata.workshopAddressPhone2 = values.workshopAddressPhone2;
    jsondata.cityCode3 = values.cityCode3;
    jsondata.faxNo = values.faxNo;
    jsondata.cityCodefax = values.cityCodefax;
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.detWorkshopAddressId = this.detWorkshopAddressId ;
    }
    debugger;
    if (this.detWorkshopAddressId === undefined || this.detWorkshopAddressId === '') {
      // this.restService.create(FacUrls.SIG_OWNER_SAVE, jsondata)
      this.restService.create(FacUrls.WORKSHOP_ADDREES_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/infoSubWorkshop/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.WORKSHOP_ADDREES_EDIT, this.detWorkshopAddressId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/infoSubWorkshop/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/infoSubWorkshop/' +  this.requestId);
  }

  fillReciveBranchComboBox() {
    debugger;
    const theUrl = `${FacUrls.BRANCH}`;
    this.restService.getAll(theUrl)
      .then(data => {
         (data.data.list as Array<any>).forEach((item) => {
          this.branchCode.push({
            name: item.brhName,
            value: item.brhCode
          });
        });
      })
      .catch(reason => {
      });
  }

  isValidWorkshopCode() {
    const theUrl = `${FacUrls.WORKSHOP_VALIDITY}/` +  this.editForm.get('workshopId').value + '/' +  this.editForm.get('branchCode').value ;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.list[0] === 'false') {
          this.showErrorMessageBox('توجه!', 'کد کارگاه مربوط به این شعبه نمی باشد.');
        }
      })
      .catch(reason => {
      });
  }

}
