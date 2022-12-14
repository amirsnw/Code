import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent, SearchParam, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, DataColumnViewType } from 'tamin-framework';
// import { Urls } from '../../../settings/urls';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { EmployerEservicesAgreementInsuredInfoComponent } from '../employer-eservices-agreement-insured-info/employer-eservices-agreement-insured-info.component';
import { Urls } from 'src/app/settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-employer-eservices-agreement-aprove-display',
  templateUrl: './employer-eservices-agreement-aprove-display.component.html',
  styleUrls: ['./employer-eservices-agreement-aprove-display.component.css']
})

export class EmployerEservicesAgreementAproveDisplayComponent extends TaminPageBaseComponent {

  @ViewChild('workshopDetail') workshopDetail: TaminDataGridComponent;
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: EmployerEservicesAgreementInsuredInfoComponent;

  private overlay: any;
  public isApprove = false;
  public isAgreement = false;
  public savedContract = true;
  public isSatisfied = false;
  private eligibilityStatus = 0;
  private premiumValidity = false;
  private examinationValidity = false;
  private exemptionValidity = false;
  public router: ActivatedRoute;
  private isinsurance = true;
  searchParams: SearchParam[];
  contractSearchForm: FormGroup;
  contractSearchFormTiket: FormGroup;
  public mobileSize = false;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this._initializeworkshopDetail();
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }
  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }

  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  private _initializeworkshopDetail() {
    this.workshopDetail.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.employerEservicesAgreementWorkshopsInfo)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'nationalId', columnCaption: 'شناسه ملی', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'wokshopId', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'organization.organizationName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'address', columnCaption: 'محل اقامت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'postalCode', columnCaption: 'کد پستی',columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'tel', columnCaption: 'تلفن', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(100)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setViewType('GridView')
      .getData();
  }
  getWithCommaSeperator(item) {
    if (item !== null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  onRollback() {
    var tiket = this.router.snapshot.params['tiket'];
    var mobile = this.router.snapshot.params['phoneNumber'];
    alert('خواهشمند است جهت بررسی و انجام اصلاحات مورد نظر، در اسرع وقت به واحد وصول حق بیمه شعب مربوطه مراجعه نمائید');
    var urll=`/workshop-registration/employer-eservices-agreement`;
    this.redirectTo(urll);
  }
  onlastApprove(){
    var tiket = this.router.snapshot.params['tiket']
    var mobile = this.router.snapshot.params['phoneNumber']
    var urll=`/workshop-registration/employer-eservices-agreement-aprove-comfirm/${tiket}/${mobile}`
    this.redirectTo(urll);
  }
}
