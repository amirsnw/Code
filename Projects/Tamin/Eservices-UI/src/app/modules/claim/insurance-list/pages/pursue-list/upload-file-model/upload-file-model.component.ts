import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminModalComponent,
  TaminPageBaseComponent,
  SearchParam,
  SearchOperator
} from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { ErroreListModalComponent } from '../errore-list-modal/errore-list-modal.component';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ClaimUrls} from '../../../../claim-urls';

@Component({
  selector: 'app-upload-file-model',
  templateUrl: './upload-file-model.component.html',
  styleUrls: ['./upload-file-model.component.css']
})
export class UploadFileModelComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('workshopSpecification') workshopSpecification: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('erroreListModalComponent') erroreListModalComponent: ErroreListModalComponent;

  @Output() refreshData = new EventEmitter<any>();
  private _subscription = new Subscription();

  newForm: FormGroup;
  private overlay: any;
  searchParams: SearchParam[];
  public listErrore: any;

  public restUrlImages;
  public workshopName;
  public branchCode;
  public rcntrow;
  public rcntassignname;

  initializePage() {
    this.newForm = this.formBuilder.group({
      workshopId: [''],
      workshopfile: [''],
      workshopfilename: [''],
      workerfile: [''],
      workerfilename: [''],
      workshopName: [''],
      organizationCode: [''],
      rcntrow: [''],
      rcntassignname: [''],
    });

    // <---------------------binding---------------------------->
    this._subscription.add(this.newForm.controls.workshopId.valueChanges.subscribe(value => {
      if (value !== '') {
        // const item = (<Array<any>>this.workshopSpecification.theGrid.dataItems).filter(c => c.workshopId === value);
        const item = this.workshopSpecification.theGrid.dataItems
        this.newForm.controls.workshopName.setValue(item[0].title);
        this.newForm.controls.organizationCode.setValue(item[0].organizationId);
        //------------------------
        this.searchParams = new Array<SearchParam>();
        const searchParam = new SearchParam();
        searchParam.property = 'rwshid.workshopId';
        searchParam.value = item[0].code;
        searchParam.operator = SearchOperator.EQ;
        this.searchParams.push(searchParam);

        const searchParamm = new SearchParam();
        searchParamm.property = 'rwshid.branchCode';
        searchParamm.value = item[0].organizationId;
        searchParamm.operator = SearchOperator.EQ;
        this.searchParams.push(searchParamm);
        this.restService.getAll(ClaimUrls.regcontractspec, this.searchParams, [])
          .then(data => {
            if (data.data.list[0].length > 0) {
              this.newForm.controls.rcntrow.setValue(data.data.list[0].data.rcntrow);
              this.newForm.controls.rcntassignname.setValue(data.data.list[0].data.rcntassignname);
            }
          }).catch(error => {
            if (error != undefined)
              this.showErrorMessageBox('پیام سیستم', error.error.data.message);
          });
      }
    }));

    this._initializeworkshopSpecification();
  }


  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }

  private _initializeworkshopSpecification() {
    this.workshopSpecification.valueField = 'id';
    this.workshopSpecification.displayField = 'title';
    // this.workshopSpecification.searchPattern = '%{term}%';
    this.workshopSpecification.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.WorkshopSuggest)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'code', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'title', columnCaption: 'نام', columnViewType: 'Label' })
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

  show() {
    this.theModal.width = '30%';
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

  saveForm(values) {
    if (!this.newForm.valid) {
      return;
    }
    this.overlay = this.showOverlay();
    this.restService
      .create(ClaimUrls.fileUpload, values)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.hide();
        const msg = 'اطلاعات با شماره پیگیری ' + (<any>value).data.id + ' با موفقیت ذخیره شد.';
        this.showInfoMessageBox('توجه', msg);
        this.refreshData.emit();
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 400) {
          if (reason.error.data.length > 0)
            this.listErrore = new Array<any>();
          var i = 0;
          var me = this;
          reason.error.data.forEach(function (item) {
            console.log(item);
            var model = item.model == "WorkshopHistorySummaryDTO" ? "لیست کارگاه" : "لیست بیمه شدگان";
            for (var key in item.objectViolations) {
              i++;
              var resultmodel = {
                id: i,
                errorCode: i,
                field: "",
                model: model,
                errorDesc: item.objectViolations[key]
              };
              me.listErrore.push(resultmodel);
            };
            for (var key in item.propertyViolations) {
              i++;
              var resultmode2 = {
                id: i,
                errorCode: i,
                field: this.setFields(key),
                model: model,
                errorDesc: item.propertyViolations[key]
              };
              me.listErrore.push(resultmode2);
            };
          });
          this.erroreListModalComponent.show(this.listErrore)
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
          //  this.redirectTo(`/il/load-from-file/${param.item.traceCode}/${param.item.status.id}`);
        }

      });
  }
  workshopfileChange(event) {
    let reader1 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader1.readAsDataURL(file);
      setTimeout(() => {
        this.newForm.controls.workshopfile.setValue(reader1.result);
      }, 1000);
      // this.workshopfile=reader.result;
    }
  }
  workerfileChange(event) {
    let reader2 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader2.readAsDataURL(file);
      // this.workerfile=reader.result;
      setTimeout(() => {
        this.newForm.controls.workerfile.setValue(reader2.result);
      }, 1000);
    }
  }
  workshopChange(event) {
  }

  refreshDataa() { }

  setFields(input: string) {
    var result;
    switch (input) {
      case 'workshopCode': result = "کد کارگاه"
        break;
      case
        'workshopTitle': result = "نام کارگاه"
        break;
      case
        'employerName': result = "نام کارفرما"
        break;
      case
        'workshopAddress': result = "آدرس کارگاه"
        break;
      case
        'listKind': result = "نوع لیست"
        break;
      case
        'listNumber': result = "شماره لیست"
        break;
      case
        'employeesCount': result = "تعداد بیمه شده"
        break;
      case
        'totalWorkingDays': result = "تعداد روزهای کار"
        break;
      case
        'totalDailyWages': result = "مجموع دستمزد روزانه"
        break;
      case
        'totalMonthlyWages': result = "مجموع دستمزد ماهانه"
        break;
      case
        'totalInclusiveBenefit': result = "totalInclusiveBenefit"
        break;
      case
        'totalInclusiveWageAndBenefit': result = "totalInclusiveWageAndBenefit"
        break;
      case
        'totalWageAndBenefit': result = "totalWageAndBenefit"
        break;
      case
        'totalEmployeePremium': result = "مجموع بیمه کارکنان"
        break;
      case
        'totalEmployerPremium': result = "totalEmployerPremium"
        break;
      case
        'totalUnemploymentPremium': result = "totalUnemploymentPremium"
        break;
      case
        'premiumRate': result = "نرخ بیمه"
        break;
      case
        'commissionRate': result = "commissionRate"
        break;
      case
        'hardJobInsurance': result = "hardJobInsurance"
        break;
      case
        'year': result = "سال"
        break;
      case
        'month': result = "ماه"
      default: result = ""
        break;
    }
    return result;
  }

}
