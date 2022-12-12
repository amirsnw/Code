import { Component, ViewChild, Injector } from '@angular/core';
import { TaminPageBaseComponent, TaminDataGridComponent, TaminModalComponent, SearchParam, OverlayService, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator } from 'tamin-framework';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-sso-workshops-debit',
  templateUrl: './sso-workshops-debit.component.html',
  styleUrls: ['./sso-workshops-debit.component.css']
})
export class SsoWorkshopsDebitComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('showDebitDetailModal') showDebitDetailModal: TaminModalComponent;

  searchParams: SearchParam[];
  employerSearchForm: FormGroup;
  currentObject: any;
  showDebitFrom: FormGroup;
  workshopDebitSearchForm: FormGroup;
  isDesabled: boolean;
  private overlay: any;


  private _overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }
  initializePage() {
    this.isDesabled = true;
    this._initializeFromGroup();
    this._initializeFromGroupSearch();
    this._initializeDataGrid();
  }

  private _initializeFromGroupSearch() {
    this.workshopDebitSearchForm = this.fb.group({
      // workshopId: [''],
      // branchCode: [''],
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }
  private _initializeFromGroup() {
    this.title = 'وضعیت بدهی کارگاه';
    this.showDebitFrom = this.fb.group({
      workshopId: [''],
      workshopName: [''],
      result: [''],
      sDate: [''],
      amount1: [''],
      amount2: [''],
      amount3: ['']
    });
  }
  private _initializeDataGrid() {
    this.workshopsDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.employerWorkshopsCRM)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .addActionColumn({
        columnName: 'showWorkshopDebit',
        columnCaption: 'مشاهده بدهی کارگاه',
        columnViewType: 'Button',
        columnActionName: 'showWorkshopDebit',
        // isActionAuthorized: true,
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }


  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    if (ticketCode == null || ticketCode == "") {
      alert('وارد نمودن کد اعتباری کارفرما الزامیست');
      return;
    }
    else if (nationalCode == null || nationalCode == "") {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    } else {
      this.searchParams.push({
        property: 'nationalCode',
        value: nationalCode,
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'serviceName',
        value: 'workshopDebitCheck',
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'ticketCode',
        value: ticketCode,
        operator: SearchOperator.EQ
      });
    }

    // const workshopId = this.workshopDebitSearchForm.get('workshopId').value;
    // const branchCode = this.workshopDebitSearchForm.get('branchCode').value;
    // if (workshopId != undefined && workshopId !== '' && workshopId !== null) {
    //   this.searchParams.push({
    //     property: 'workshopId',
    //     value: workshopId,
    //     operator: SearchOperator.EQ

    //   });
    // }
    // if (branchCode != undefined && branchCode !== '' && branchCode !== null) {
    //   this.searchParams.push({
    //     property: 'branchCode',
    //     value: branchCode,
    //     operator: SearchOperator.EQ

    //   });
    // }

    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.searchParams = this.searchParams;
    this.workshopsDebitGrid.refreshData();
  }

  getWithCommaSeperator(item) {
    if (item != null) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  onGridAction(param: any) {
    const me = this;
    const actionColumn = param.actionColumn.columnActionName;
    const dataItem = param.item;
    if (actionColumn === 'showWorkshopDebit') {
      const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
      const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
      if (ticketCode == null || ticketCode == "") {
        alert('وارد نمودن کد اعتباری کارفرما الزامیست');
        return;
      }
      else if (nationalCode == null || nationalCode == "") {
        alert('وارد نمودن کد ملی کارفرما الزامیست');
        return;
      }
      else {
        this._overlay = this.overlayService.show();
        this.restService.getAll(`${Urls.workshopDebitCRM}/${dataItem.workshopId}/${dataItem.branchCode}/${nationalCode}/${ticketCode}`)
          .then(data1 => {
            this.overlayService.hide(this._overlay);
            const data = (<any>data1).data;
            data.amount1 = this.getWithCommaSeperator(data.amount1);
            data.amount2 = this.getWithCommaSeperator(data.amount2);
            data.amount3 = this.getWithCommaSeperator(data.amount3);
            this.showDebitDetailModal.width = '60%';
            this.showDebitDetailModal.show();
            this.currentObject = param.dataItem;
            this.showDebitFrom.patchValue(data);
          })
          .catch(error => {
            this.overlayService.hide(this._overlay);
            this.showInfoMessageBox('پیام خطا: ', 'خطایی رخ داده است.');
          });
      }
    }
  }

  exitconflictEditForm() {
    this.showDebitDetailModal.hide();
  }
  resetForm() {
    this.isDesabled = true;
    // this.searchParams = new Array<SearchParam>();
    // this.workshopsDebitGrid.pagerCurrentPage = 1;
    // this.workshopsDebitGrid.searchParams = this.searchParams;
    // this.workshopsDebitGrid.refreshData();
    this.workshopDebitSearchForm.reset();
  }
  sendUserTicket() {
    const values = this.workshopDebitSearchForm.value;
    if (values.nationalCode == null || values.nationalCode == '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      alert('مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'workshopDebitCheck',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.RequestTicketAdmin, this.searchParams)
      .then(result => {
        this.isDesabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

}
