import { Component, ViewChild, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent, OverlayService, TaminFieldAutoCompleteDataGridComponent, TaminDataGridConfigurationFactory } from 'tamin-framework';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersonalModel } from '../../../models/registration/personal.model';
declare var alertify: any;
@Component({
  selector: 'app-fraction-update-contact',
  templateUrl: './fraction-update-contact.component.html',
  styleUrls: ['./fraction-update-contact.component.css']
})
export class FractionUpdateContactComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @Output() submitt = new EventEmitter<any>();
  public _subscription = new Subscription();
  public _overlay: any;
  public overlayService: OverlayService;
  public dataItem: any;
  public isStats: String;
  public isSavehide: boolean;
  public isEdithide: boolean;
  public isApprovhide: boolean;
  public showText: boolean;
  public approveDateTime: String;
  public router: ActivatedRoute;
  public lastContract: any;
  public fractionNewForm: FormGroup;
  public personalModel: PersonalModel;
  public overlay: any;
  public cityOfIssueName: String;
  public persianBirthDate: String;
  public insuranceId: String;
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }


  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }


  initializePage() {
    this._initializeCityOfBirth();
    this.isStats = this.router.snapshot.params['status'];
    this.fractionNewForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      firstName: [''],
      lastName: [''],
      // fatherName: [''],
      cityCode: ['', [Validators.required]]
      //lastModificationTime: [''],
      //lastModifiedBy: ['']
    });
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.getRegistrationInfo)

      .then(data => {
        this.hideOverlay(this.overlay);
        if (data.data.total === 0) {
          const message = 'متقاضی محترم ابتدا می بایست اطلاعات خود را در سیستم نانویسی ثبت و شماره بیمه اخذ نمایید.';
          alertify.confirm('پیام سیستم', message, () => {
            alertify.alert('در حال حاضر امکان نامنویسی به صورت غیر حضوری وجود ندارد، لطفا به شعبات مراجعه فرمایید.');
          }, () => {
          }).set({ labels: { ok: 'تایید', cancel: 'انصراف' }, padding: '20px' });
        } else {
          if (data.data.personalInfo !== undefined && data.data.personalInfo != null) {
            this.personalModel = data.data.personalInfo as PersonalModel;
            if (data.data.personalInfo.cityOfIssue !== undefined && data.data.personalInfo.cityOfIssue !== null) {
              this.cityOfIssueName = data.data.personalInfo.cityOfIssue.description;
            }
          }
          this.persianBirthDate = this.personalModel != null && this.personalModel.dateOfBirth != null ? this.getPersianDate(this.personalModel.dateOfBirth) : null;
          this.insuranceId = data.data.insuranceId;
          if (data.data.personalInfo != undefined && data.data.personalInfo != null) {
            this.fractionNewForm.controls.firstName.setValue(data.data.personalInfo.firstName);
            this.fractionNewForm.controls.lastName.setValue(data.data.personalInfo.lastName);
          }
          if (data.data.lastContact != null && data.data.lastContact !== undefined) {
            this.lastContract = data.data.lastContact;
            this.fractionNewForm.controls.mobile.setValue(this.lastContract.mobile);
            this.fractionNewForm.controls.address.setValue(this.lastContract.address);
            if (data.data.personalInfo != null && data.data.personalInfo.cityOfIssue != null)
              this.fractionNewForm.controls.cityCode.setValue(data.data.personalInfo.cityOfIssue.code);
            this.fractionNewForm.controls.zipCode.setValue(this.lastContract.zipCode);
            this.fractionNewForm.controls.phoneNumber.setValue(this.lastContract.phoneNumber);
          }
        }
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
      });
    // this.restService.getAll(Urls.getRegistrationInfo )
    //   .then(data => {
    //     this.hideOverlay(this.overlay);
    //     if (data.data.total === 0) {
    //       const message = 'متقاضی محترم ابتدا می بایست اطلاعات خود را در سیستم نانویسی ثبت و شماره بیمه اخذ نمایید.';
    //       alertify.confirm('پیام سیستم', message, () => {
    //         alertify.alert('در حال حاضر امکان نامنویسی به صورت غیر حضوری وجود ندارد، لطفا به شعبات مراجعه فرمایید.');
    //       }, () => {
    //       }).set({ labels: { ok: 'تایید', cancel: 'انصراف' }, padding: '20px' });
    //     } else {
    //       if (data.data.list[0].contacts != null && data.data.list[0].contacts != undefined)
    //       data.data.list[0].contacts.forEach(element => {
    //         if (this.lastContract == null ||this.lastContract == undefined) this.lastContract = element;
    //         else if (this.lastContract.creationTime < element.creationTime)
    //           this.lastContract = element;
    //       });
    //       var citySelected=this.lastContract.description!=null?this.lastContract.city.code:null;
    //       this.dataItem = data.data.list[0];
    //       this.fractionNewForm.controls.address.setValue(this.lastContract.address);
    //       this.fractionNewForm.controls.mobile.setValue(this.lastContract.mobile);
    //       this.fractionNewForm.controls.phoneNumber.setValue(this.lastContract.phoneNumber);
    //       this.fractionNewForm.controls.cityCode.setValue(citySelected);
    //       this.fractionNewForm.controls.zipCode.setValue(this.lastContract.zipCode);
    //       this.fractionNewForm.controls.firstName.setValue(this.dataItem.firstName);
    //       this.fractionNewForm.controls.lastName.setValue(this.dataItem.lastName);
    //       this.cityOfBirth.filter = [
    //         {
    //           property: 'cityCode',
    //           value: citySelected,
    //           operator: 'EQUAL'
    //         }];
    //     }
    //   })
    //   .catch(error => {
    //     this.hideOverlay(this.overlay);
    //   });
  }


  onEdit(values, valid) {
    if (!this.fractionNewForm.valid) {
      return;
    }
    var personal = {
      ssn: this.personalModel.ssn
    }
    var jsonValue = {
      personal: personal,
      mobile: values.mobile,
      phoneNumber: values.phoneNumber,
      zipCode: values.zipCode,
      address: values.address,
      createdBy: "0014610493",
      cityId: values.cityCode//"1870"// ,
    };

    this.overlay = this.showOverlay();
    this.restService
      .create(`${Urls.fractionSaveContact}`, jsonValue)
      .then(value => {
        this.hideOverlay(this.overlay);
        alertify.alert('تغییرات با موفقت ثبت شد');
        setTimeout(() => {
          if (this.isStats == '01') {
            this.redirectTo('/optional-insurance/fraction/rollbacke');
          } else if (this.isStats == '02') {
            this.redirectTo('/optional-insurance/contract/rollbacke');
          } else if (this.isStats == '03') {
            this.redirectTo('/optional-freelance/contract/rollbacke');
          }
        }, 2500);
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعات با موفقیت ویرایش شد');
        }

      });
  }
  private _initializeCityOfBirth() {
    this.cityOfBirth.valueField = 'cityCode';
    this.cityOfBirth.displayField = 'cityName';
    this.cityOfBirth.searchPattern = '*{term}*%';
    this.cityOfBirth.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({ columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  rollbacke() {
    if (this.isStats == '01') {
      this.redirectTo('/optional-insurance/fraction/rollbacke');
    } else if (this.isStats == '02') {
      this.redirectTo('/optional-insurance/contract/rollbacke');
    } else if (this.isStats == '03') {
      this.redirectTo('/optional-insurance/freelance/rollbacke');
    }
  }
}
