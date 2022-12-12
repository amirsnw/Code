import {ChangeDetectorRef, Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Urls} from '../../../settings/urls';
import {GuardianInsInfoComponent} from '../guardian-ins-info/guardian-ins-info.component';
import {GuardianInitializeService} from '../guardian-initialize.service';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-guardian-revoke',
  templateUrl: './guardian-revoke.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianRevokeComponent extends TaminPageBaseComponent {

  mainForm: FormGroup;
  revokeForm: FormGroup;
  private overlay: any;
  private looper;
  userInfo: any;
  label: any;
  birthDateTemp: string;
  birthDateTemp2: string;

  @ViewChild('guardianInsInfoComponent') guardianInsInfoComponent: GuardianInsInfoComponent;
  @ViewChild('panel') panel: ElementRef;

  guardianItems = [];
  branchWorkshop = [];
  requestTypeList = [];

  singlePersonForm = {
    'natinoalCode': new FormControl('', [Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]),
    'fullName': new FormControl(''),
    'firstName': new FormControl(Validators.required),
    'lastName': new FormControl(Validators.required),
    'birthDate': new FormControl(),
    'expCityCode': new FormControl(),
    'birthCityCode': new FormControl(),
    'cancelationDesc': new FormControl('', Validators.required),
    'branchCode': new FormControl(''),
    'address': new FormControl('', Validators.required),
    'zipCode': new FormControl('', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]),
  };

  constructor(injector: Injector, private activeRoute: ActivatedRoute, private router: Router, private changeDetector: ChangeDetectorRef,
              private guardianInitService: GuardianInitializeService) {
    super(injector);
    changeDetector.detach();
    this.looper = setInterval(() => {
      try {
        this.changeDetector.checkNoChanges();
      } catch (err) {
        this.changeDetector.detectChanges();
      }
    }, 200);
  }

  protected initializePage(): void {
    this.revokeForm = this.formBuilder.group(this.singlePersonForm);
    this.mainForm = this.formBuilder.group({
      requestType: ['', Validators.required]
    });
    this.mainForm.get('requestType').valueChanges.subscribe(select => {
      this.label = this.requestTypeList.find(comboItem => comboItem.value === select).name;
      const item = this.guardianItems.find(subDominant => {
        return subDominant.requestType === select;
      });
      this.revokeForm.get('firstName').setValue(item.relationWithTamin.personal.firstName);
      this.revokeForm.get('lastName').setValue(item.relationWithTamin.personal.lastName);
      this.revokeForm.get('fullName').setValue(item.relationWithTamin.personal.firstName + ' ' + item.relationWithTamin.personal.lastName);
      this.revokeForm.get('natinoalCode').setValue(item.relationWithTamin.personal.nationalId);
      this.birthDateTemp = momentNs.from(new Date(item.relationWithTamin.personal.dateOfBirth).toString(), 'en').locale('fa').format('YYYY/M/D');
      this.revokeForm.get('birthDate').setValue(item.relationWithTamin.personal.dateOfBirth);
      this.revokeForm.get('expCityCode').setValue(item.relationWithTamin.personal.cityOfIssue);
      this.revokeForm.get('birthCityCode').setValue(item.relationWithTamin.personal.cityOfBirth);
    });

  }

  loadPageData() {
    this.guardianInsInfoComponent.loadData();
    this.overlay = this.showOverlay(this.guardianInsInfoComponent.theForm.nativeElement);
    this.restService.getAll(Urls.lastRelation).then(result => {
      this.branchWorkshop.push({
        name: result.data.organizationName,
        value: result.data.organizationId
      });
      if (this.branchWorkshop.length === 1) {
        this.revokeForm.get('branchCode').setValue(this.branchWorkshop[0].value);
      }
      this.hideOverlay(this.overlay);
      this.overlay = this.showOverlay(this.panel.nativeElement);
      return this.securityService.getCurrentUser();
    }).then(data => {
      if (data !== undefined && data != null) {
        this.userInfo = data;
        return this.restService.getAll(Urls.GUARDIAN_REQUEST_LIST + '/' + data.nationalCode);
      } else {
        throw new Error('خطا');
      }
    }).then(list => {
      if (list.data.list.length > 0) {
        let gendercode = null;
        let isParent = false;
        this.guardianItems = list.data.list.filter(item => {
          gendercode = item.relationWithTamin.personal.gender.genderCode;
          switch (item.relationWithTamin.relationWithTamin.baseTendency.tendencyCode) {
            case '100' :
              if (this.userInfo.gender === 'f') {
                this.requestTypeList.push({name: 'همسر', value: '3'});
                item.requestType = '3';
                return true;
              } else {
                return false;
              }
            case '103' :
              if (this.userInfo.gender === 'f') {
                this.requestTypeList.push({name: 'همسر', value: '3'});
                item.requestType = '3';
                return true;
              } else {
                return false;
              }
            case '106' :
              if (gendercode === '01') {
                this.requestTypeList.push({name: 'پدر', value: '1'});
                item.requestType = '1';
              } else if (gendercode === '02') {
                this.requestTypeList.push({name: 'مادر', value: '2'});
                item.requestType = '2';
              } else {
                this.requestTypeList.push({name: 'والدین', value: '4'});
                item.requestType = '4';
                isParent = true;
              }
              return true;
            case '107' :
              if (this.userInfo.gender === 'f') {
                this.requestTypeList.push({name: 'همسر', value: '3'});
                item.requestType = '3';
                return true;
              } else {
                return false;
              }
            case '108' :
              if (this.userInfo.gender === 'f') {
                this.requestTypeList.push({name: 'همسر', value: '3'});
                item.requestType = '3';
                return true;
              } else {
                return false;
              }
            case '109' :
              if (this.userInfo.gender === 'f') {
                this.requestTypeList.push({name: 'همسر', value: '3'});
                item.requestType = '3';
                return true;
              } else {
                return false;
              }
            case '110' :
              if (gendercode === '01') {
                this.requestTypeList.push({name: 'مادر', value: '2'});
                item.requestType = '2';
              } else if (gendercode === '02') {
                this.requestTypeList.push({name: 'پدر', value: '1'});
                item.requestType = '1';
              } else {
                this.requestTypeList.push({name: 'والدین', value: '4'});
                item.requestType = '4';
                isParent = true;
              }
              return true;
            default:
              return false;
          }
        });
        if (isParent) {
          this.mainForm.get('requestType').setValue(4);
        }
        if (this.guardianItems.length === 0) {
          throw {customMessage: 'موردی جهت ابطال کفالت یافت نشد'};
        }
        this.hideOverlay(this.overlay);
      } else {
        throw {customMessage: 'موردی جهت ابطال کفالت یافت نشد'};
      }
    }).catch(reason => {
      this.hideOverlay(this.overlay);
      if (reason.customMessage) {
        this.showErrorMessageBox('پیام سیستم', reason.customMessage, () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
        return;
      }
      if (reason.error && reason.error.data && reason.error.data.message) {
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
        return;
      }
      if (reason.data && reason.data.message) {
        this.showErrorMessageBox('پیام سیستم', reason.data.message, () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
        return;
      }
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    });
  }

  saveData() {
    if (!this.revokeForm.valid) {
      this.markFormGroupAsTouched(this.revokeForm);
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    const data = {
      guardianRelationlistList: [],
      address: this.revokeForm.get('address').value,
      zipCode: this.revokeForm.get('zipCode').value,
      status: '0',
      requestType: '2',
      insuredMobile: this.userInfo.mobile,
      requestDate: new Date().getTime(),
      natinoalCode: this.userInfo.nationalCode,
      brchCode: this.revokeForm.get('branchCode').value,
      risuId: this.guardianInsInfoComponent.viewForm.value.insuranceNumber,
      cancelationDesc: this.revokeForm.get('cancelationDesc').value,
    };

    if (this.revokeForm.get('natinoalCode').value !== '') {
      let depperrelTypeCode;
      switch (this.mainForm.value.requestType) {
        case '1':
          depperrelTypeCode = '05';
          break;
        case '2':
          depperrelTypeCode = '06';
          break;
        case '3':
          depperrelTypeCode = '02';
          break;
        case '4':
          depperrelTypeCode = '05';
          break;
      }
      data.guardianRelationlistList.push(
        {
          firstName: this.revokeForm.value.firstName,
          lastName: this.revokeForm.value.lastName,
          birthDate: new Date(this.revokeForm.get('birthDate').value).getTime(),
          natinoalCode: this.revokeForm.get('natinoalCode').value,
          depperrelTypeCode: depperrelTypeCode,
          isinsured: '0'
        }
      );
    }
    if (this.revokeForm.get('natinoalCodeMother') !== null) {
      data.guardianRelationlistList.push(
        {
          firstNameMother: this.revokeForm.value.firstNameMother,
          lastNameMother: this.revokeForm.value.lastNameMother,
          birthDate: new Date(this.revokeForm.get('birthDateMother').value).getTime(),
          natinoalCode: this.revokeForm.get('natinoalCodeMother').value,
          depperrelTypeCode: '06',
          isinsured: '0'
        }
      );
    }

    this.overlay = this.showOverlay();
    this.restService.create(Urls.GUARDIAN_REQUEST, data).then(value => {
      this.hideOverlay(this.overlay);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت کفالت با موفقیت ثبت و در نوبت رسیدگی شعبه قرار گرفت و نتیجه توسط پیامک به شما اطلاع رسانی می گردد و همچنین جهت مشاهده وضعیت درخواست می توان به تامین من مراجعه فرمایید. ', () => {
        this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
      });
    })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  protected destroyPage() {
    clearInterval(this.looper);
    this.changeDetector.reattach();
  }
}
