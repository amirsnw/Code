import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { TaminPageBaseComponent, TaminFieldAutoCompleteDataGridComponent, TaminDataGridConfigurationFactory, DataColumnViewType, SearchParam, SearchOperator, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, ImageModelManaged } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { FormGroup, Validators } from '@angular/forms';
import { StpUrls } from '../../../modules/stp/stp-urls';
import { PersonalModel } from 'src/app/models/registration/personal.model';

declare var alertify: any;

@Component({
  selector: 'app-freelance-payment-premium',
  templateUrl: './freelance-payment-premium.component.html',
  styleUrls: ['./freelance-payment-premium.component.css']
})

export class FreelancePaymentPremiumComponent extends TaminPageBaseComponent {
  private overlay: any;
  @Input() personalInfo: PersonalModel;
  @Input() contractSelected: any;
  @ViewChild('spcPremiumRate') spcPremiumRate: TaminFieldComboBoxStaticComponent;
  @ViewChild('jobDataGrid') jobDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @Output() validPremium = new EventEmitter<any>();
  @Output() changePremium = new EventEmitter<any>();
  @Output() medicalExemption = new EventEmitter<any>();
  @Output() chageCntDram = new EventEmitter<any>();
  public isDescHide: boolean;
  public viewForm: FormGroup;
  public minPremium = 0;
  public maxPremium = 0;
  public alldisabled = false;
  public minPremiumWithComma = ' ';
  public spcPremiumRateitems = [];
  public searchWorkshopParams: SearchParam[];
  public maxPremiumWithComma = ' ';
  public isPayment = false;
  public iscomitemnt1 = false;
  public buttonDesabled = false;
  public spcPremiumRateTitle = "";
  public insuranceJobTitle = "";
  public spcPremiumTitle = "";
  public spcPremiumRateOrginal = "";
  public commitment1 = false;
  public commitment2 = false;
  public commitment3 = false;
  public history: any;
  public paymentTabayi: any;
  loadPageData() {
    if (this.contractSelected != null && this.contractSelected != undefined) {
      switch (this.contractSelected.premiumRateCode) {
        case "01":
          this.viewForm.get('monthlyPremium').setValue(Math.round((Number(this.contractSelected.salary) * 12) / 100));
          break;
        case "02":
          this.viewForm.get('monthlyPremium').setValue(Math.round((Number(this.contractSelected.salary) * 14) / 100));
          break;
        case "03":
          this.viewForm.get('monthlyPremium').setValue(Math.round((Number(this.contractSelected.salary) * 18) / 100));
          break;
      }
    }
  }
  initializePage() {
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
    this.isDescHide = true;
    this._initializeSpcPremiumRate();
    this.initializeJobsAutoComplete();
    this.setSes('premium', null);
    this.setSes('checkedPremium', null);
    this.viewForm = this.formBuilder.group({
      monthlyPremium: ['', Validators['required']],
      spcPremiumRate: ['', Validators['required']],
      insuranceJob: ['', Validators['required']],
      salary: [''],
      imageGalleryy: [''],
      commitment1: [''],
      commitment2: [''],
      commitment3: [''],
      imageTitle: [''],
      insuranceType: ['']
    });
    this.viewForm.get('monthlyPremium').valueChanges.subscribe(value => {
      this.onChangePremium();
    });
    this.viewForm.get('spcPremiumRate').valueChanges.subscribe(value => {
      this.onChangespcPremiumRate(value);
    });
    this.viewForm.get('insuranceJob').valueChanges.subscribe(value => {
      this.onChangelowHighWage();
    });
    this.viewForm.get('spcPremiumRate').valueChanges.subscribe(value => {
      this.onChangelowHighWage();
    });
    // this.validPremium.emit(false);
    // this.medicalExemption.emit(false);
    this.viewForm.get('insuranceType').setValue("صاحبان حرف و مشاغل آزاد");
  }

  private onChangePremium() {
    this.setSes('premium', this.viewForm.get('monthlyPremium').value);
  }

  private onChangelowHighWage() {
    var insuranceJob = this.viewForm.get('insuranceJob').value;
    var spcPremiumRate = this.viewForm.get('spcPremiumRate').value;
    if (spcPremiumRate != null && spcPremiumRate != '' && insuranceJob != null && insuranceJob != '' && insuranceJob.length < 6) {
      if (this.personalInfo.gender != null && this.personalInfo.gender != undefined && this.personalInfo.gender.genderCode != null && this.personalInfo.gender.genderCode != undefined && this.personalInfo.gender.genderCode != "02" && this.jobDataGrid.theGrid.selectedDataItem != undefined && this.jobDataGrid.theGrid.selectedDataItem.jobCode == "099785") {
        this.viewForm.get('insuranceJob').setValue(null);
        alertify.alert('مجاز به انتخاب این شغل نیستید.');
        return;
      }
      else {
        this.loadDate(spcPremiumRate, insuranceJob);
      }
    }
  }
  private onChangespcPremiumRate(value: any) {
    switch (value) {
      case "01":
        this.spcPremiumRateTitle = "(بازنشستگی و فوت بعد از بازنشستگی)";
        break;
      case "02":
        this.spcPremiumRateTitle = "(بازنشستگی و فوت )";
        break;
      case "03":
        this.spcPremiumRateTitle = "(بازنشستگی ، از کارافتادگی و فوت)";
        break;
      default:
        this.spcPremiumRateTitle = null;
        break;
    }
  }

  loadDate(spcPremiumRate: any, insuranceJob: any) {
    this.spcPremiumTitle = spcPremiumRate;
    this.spcPremiumRateOrginal = spcPremiumRate;
    switch (spcPremiumRate) {
      case "01":
        this.spcPremiumTitle = "12";
        break;
      case "02":
        this.spcPremiumTitle = "14";
        break;
      case "03":
        this.spcPremiumTitle = "18";
        break;
      default:
        this.spcPremiumTitle = "12";
        break;
    }
    this.insuranceJobTitle = insuranceJob;
    // this.overlay = this.showOverlay();
    this.restService.getAll(`${Urls.freelanceGetLowHighPremium}/${insuranceJob}/${spcPremiumRate}`)
      .then(data => {
        // this.hideOverlay(this.overlay);
        this.minPremium = data.data.lowPremium;
        this.maxPremium = data.data.highPremium;
        this.history = data.data.history;
        this.minPremiumWithComma = this.getWithCommaSeperator(data.data.lowPremium);
        this.maxPremiumWithComma = this.getWithCommaSeperator(data.data.highPremium);
        this.paymentTabayi = this.getWithCommaSeperator(data.data.paymentTabayi);
        // this.checkMedicalExemption()
      }
      )
      .catch(error => {
        // this.hideOverlay(this.overlay);
      });
  }

  onCalculateSalary() {
    if (this.imageGallery.images.length > 0) {
      this.buttonDesabled = true;
      this.setSes("imageGUIDFreelance", this.imageGallery.images[0].guid);
      // } else {
      //   alertify.alert('لطفا تصویر را بارگزاری کنید.');
      //   return;
    }
    if (this.insuranceJobTitle == "" || this.spcPremiumRateOrginal == "") {
      alertify.alert('لطفا نرخ حق بیمه و عنوان شغل ، هر دو را انتخاب کنید.');
      return;
    }
    this.setSes("jobCodeFreelance", this.jobDataGrid.theGrid.selectedDataItem != undefined ? this.jobDataGrid.theGrid.selectedDataItem.jobCode : this.getSes("jobCodeFreelance"));
    this.setSes("insuranceJobTitle", this.insuranceJobTitle);
    this.setSes("spcPremiumRateOrginal", this.spcPremiumRateOrginal);
    if (!this.commitment1 && !this.commitment2) {
      alertify.alert('اگر خواهان حمایت درمان می باشید لطفا گزینه مورد نظر را انتخاب نمایید در غیر این صورت گزینه دیگر را انتخاب نمایید.');
      return;
    }
    if (this.commitment1 && !this.commitment3) {
      alertify.alert('تعهد تکمیل اطلاعات افراد تبعی را انتخاب نمایید.');
      return;
    }
    this.setSes("commitment1freelance", this.commitment1);
    this.setSes("commitment2freelance", this.commitment2);
    this.setSes("commitment3freelance", this.commitment3);
    var monupr = this.viewForm.get('monthlyPremium').value;
    if (!Number(this.maxPremium) || !Number(this.minPremium) ||
      Number(monupr) > Number(this.maxPremium) ||
      Number(monupr) < Number(this.minPremium)) {
      this.showErrorMessageBox('بیمه شده گرامی', 'مبلغ حق بیمه ماهانه را از ' + this.minPremium + ' تا ' + this.maxPremium + ' انتخاب نمایید.');
    } else {

      return new Promise((resolve, reject) => {
        this.overlay = this.showOverlay();
        this.restService.getAll(Urls.freelancecheckAndCalcSalary + '/' + monupr + "/" + this.insuranceJobTitle + "/" + this.spcPremiumRateOrginal)
          .then(data => {
            this.hideOverlay(this.overlay);
            this.viewForm.get('salary').setValue(this.getWithCommaSeperator(data.data));
            this.setSes('premium', this.viewForm.get('monthlyPremium').value);
            this.setSes('checkedPremium', this.viewForm.get('monthlyPremium').value);
            this.setSes('salary', this.getWithCommaSeperator(data.data));
            this.changeCntDram();
            this.checkMedicalExemption();
          }
          )
          .catch(error => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('بیمه شده گرامی', error.error.data.message);
            reject(error);
          });
      });
    }
  }

  checkMedicalExemption() {
    if (this.spcPremiumTitle == "12") {
      this.validPremium.emit(true);
      this.changePremium.emit(this.spcPremiumRateOrginal);
      this.medicalExemption.emit(true);
    }
    else if (this.spcPremiumTitle == "14") {
      this.validPremium.emit(true);
      this.changePremium.emit(this.spcPremiumRateOrginal);
      if (this.history < 365) this.medicalExemption.emit(false);
      else this.medicalExemption.emit(true);
    }
    else if (this.spcPremiumTitle == "18")
      this.restService.getAll(Urls.checkMedicalExemption)
        .then(data => {
          if (data !== undefined && data != null) {
            this.validPremium.emit(true);
            this.changePremium.emit(this.spcPremiumRateOrginal);
            if (data.data === 1) {
              this.medicalExemption.emit(true);
            } else {
              this.medicalExemption.emit(false);
            }
          }
        })
        .catch(error => {
          alertify.alert(error.data);
        });
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  getWithCommaSeperator(item) {
    if (item != null) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  getSalary() {
    return this.viewForm.get('salary').value;
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  private _initializeSpcPremiumRate() {
    return new Promise((resolve, reject) => {
      this.restService.getAll(Urls.spcPremiumRate)
        .then(data => {
          ((data as any).data.list).forEach(item => {
            this.spcPremiumRateitems.push({
              name: item.spcrateDescription,
              value: item.spcrateCode,
              data: item
            });
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  initializeJobsAutoComplete() {
    this.jobDataGrid.valueField = 'fixRank';
    this.jobDataGrid.displayField = 'discrioption';
    this.jobDataGrid.searchPattern = '*{term}*';
    this.jobDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.FreeJobWage)
      .setShowPager(true)
      .setId('jobCode')
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'jobCode', columnCaption: 'کد', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'discrioption', columnCaption: 'نام شغل', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'fixRank', columnCaption: 'ضریب شغل', columnViewType: DataColumnViewType.Label })
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

  addImage() {
    const theform = this.viewForm.getRawValue();
    if (theform.imageTitle == null || theform.imageTitle === '') {
      alertify.alert('واردکردن شرح تصویر الزامیست');
      return;
    }
    this.setSes("imageGUIDFreelanceName", theform.imageTitle);
    this.imageGallery.selectImage(theform.imageTitle);

  }
  onAfterRemoveImage(imageModel: ImageModelManaged) {
    let flag = true;
    this.buttonDesabled = false;
    this.setSes("imageGUIDFreelance", null);
    this.setSes("imageGUIDFreelanceName", null);
    this.imageGallery.images.forEach(value => {
      if (value.tag === '18') {
        flag = false;
      }
    });
    if (flag) {
      this.isDescHide = true;
    }
  }

  onAfterInsertImage(imageModel: ImageModelManaged) {
    switch (imageModel.tag) {
      case '18':
        this.isDescHide = false;
        break;
    }
    setTimeout(() => {
      if (this.imageGallery.images.length > 0) {
        this.buttonDesabled = true;
        this.setSes("imageGUIDFreelance", this.imageGallery.images[0].guid);
      }
    }, 700);
  }


  onCommitment1() {
    this.commitment1 = this.viewForm.get('commitment1').value as boolean;
    this.iscomitemnt1 = this.commitment1;
    if (this.commitment1) {
      this.viewForm.get('commitment2').setValue(false);
      this.commitment1 = true;
      this.commitment2 = false;
      this.commitment3 = false;
    } else {
      this.setSes("commitment1", null);
      this.setSes("commitment2", null);
      this.setSes("commitment3", null);
      this.setSes("commitment1freelance", null);
      this.setSes("commitment2freelance", null);
      this.setSes("commitment3freelance", null);
      this.viewForm.get('commitment1').setValue(false);
      this.viewForm.get('commitment2').setValue(false);
      this.viewForm.get('commitment3').setValue(false);
      this.commitment1 = false;
      this.commitment2 = false;
      this.commitment3 = false;
      this.iscomitemnt1 = this.commitment1;
    }
  }

  onCommitment2() {
    this.commitment2 = this.viewForm.get('commitment2').value as boolean;
    if (this.commitment2) {
      this.viewForm.get('commitment1').setValue(false);
      this.viewForm.get('commitment3').setValue(false);
      this.setSes("commitment3", null);
      this.commitment1 = false;
      this.commitment2 = true;
      this.commitment3 = false;
      this.iscomitemnt1 = false;
      if (this.commitment2) this.iscomitemnt1 = false;
    } else {
      this.setSes("commitment1", null);
      this.setSes("commitment2", null);
      this.setSes("commitment3", null);
      this.setSes("commitment1freelance", null);
      this.setSes("commitment2freelance", null);
      this.setSes("commitment3freelance", null);
      this.viewForm.get('commitment1').setValue(false);
      this.viewForm.get('commitment2').setValue(false);
      this.viewForm.get('commitment3').setValue(false);
      this.commitment1 = false;
      this.commitment2 = false;
      this.commitment3 = false;
      this.iscomitemnt1 = this.commitment1;
    }
  }
  onCommitment3() {
    this.commitment3 = this.viewForm.get('commitment3').value as boolean;
    this.setSes("commitment3", this.viewForm.get('commitment3').value as boolean);

  }
  changeCntDram() {
    if (this.commitment3) this.chageCntDram.emit(true);
    else this.chageCntDram.emit(false);
  }


  direct() {
    this.redirectTo('/subdominant');
  }
}
