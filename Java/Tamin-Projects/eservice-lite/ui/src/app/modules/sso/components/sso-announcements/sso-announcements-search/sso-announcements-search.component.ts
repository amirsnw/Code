import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-announcements-search',
  templateUrl: './sso-announcements-search.component.html',
  styleUrls: ['./sso-announcements-search.component.css']
})
export class SsoAnnouncementsSearchComponent extends TaminPageBaseComponent {
  @Output() afterSubmit = new EventEmitter<any>();
  @ViewChild('type') type: TaminFieldComboBoxComponent;
  @ViewChild('subType') subType: TaminFieldComboBoxComponent;
  @ViewChild('branch') branch: TaminFieldAutoCompleteDataGridComponent;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  isDisabled: boolean;
  isHidden: boolean;
  private overlay: any;
  flag: boolean;

  protected initializePage(): void {
    this.isDisabled = true;
    this.isHidden = true;
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      type: [''],
      subType: [''],
      eblaghNo: [''],
      workshopCode: ['', Validators.maxLength(10)],
      pyman: [''],
      branchCode: ['', Validators.maxLength(4)],
      docDateFrom: [''],
      docDateTo: [''],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
    this._initializeType();
    this._initializeSubType();
    this._initializeBranch();
    this.securityService.getCurrentUser().then(value => {
      value.roles.forEach((item) => {
        if (item.roleName === 'RS EBLAGH GET CRM') {
          this.isDisabled = false;
          this.isHidden = false;
        }
      });

    });
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(new Array<SearchParam>());
  }

  private _initializeBranch() {
    this.branch.valueField = 'code';
    this.branch.displayField = 'name';
    this.branch.searchPattern = '%{term}%';
    this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesByFilter)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(true)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  searchFormSubmit() {
    const values = this.searchForm.value;
    this.flag = false;
    this.securityService.getCurrentUser().then(value => {
      value.roles.forEach((item) => {
        if (item.roleName === 'RS EBLAGH GET CRM') {
          this.flag = true;
        }
      });
      if ((values.ticketCode.length === 0 || values.ticketCode.length !== 6) && this.flag === true) {
        return;
      }
    });
    this.searchParams = new Array<SearchParam>();
    const searchParam_nationalCode = new SearchParam();
    const searchParam_ticketCode = new SearchParam();
    searchParam_ticketCode.property = 'ticketCode';
    searchParam_ticketCode.value = this.searchForm.value[searchParam_ticketCode.property];
    searchParam_ticketCode.operator = SearchOperator.EQ;

    if (searchParam_ticketCode.value && searchParam_ticketCode.value !== '') {
      this.searchParams.push(searchParam_ticketCode);
    }
    searchParam_nationalCode.property = 'nationalCode';
    searchParam_nationalCode.value = this.searchForm.value[searchParam_nationalCode.property];
    searchParam_nationalCode.operator = SearchOperator.EQ;

    if (searchParam_nationalCode.value && searchParam_nationalCode.value !== '') {
      this.searchParams.push(searchParam_nationalCode);
    }
    const searchParam_eblaghNo = new SearchParam();
    searchParam_eblaghNo.property = 'details.eblaghNo';
    searchParam_eblaghNo.value = this.searchForm.value['eblaghNo'];
    searchParam_eblaghNo.operator = SearchOperator.EQ;
    if (searchParam_eblaghNo.value && searchParam_eblaghNo.value !== '') {
      this.searchParams.push(searchParam_eblaghNo);
    }
    const searchParam_workshopCode = new SearchParam();
    searchParam_workshopCode.property = 'details.workshopCode';
    searchParam_workshopCode.value = this.searchForm.value['workshopCode'];
    searchParam_workshopCode.operator = SearchOperator.EQ;
    if (searchParam_workshopCode.value && searchParam_workshopCode.value !== '') {
      this.searchParams.push(searchParam_workshopCode);
    }
    const searchParam_pyman = new SearchParam();
    searchParam_pyman.property = 'details.pymanSEQ';
    searchParam_pyman.value = this.searchForm.value['pyman'];
    searchParam_pyman.operator = SearchOperator.EQ;
    if (searchParam_pyman.value && searchParam_pyman.value !== '') {
      this.searchParams.push(searchParam_pyman);
    }
    const searchParam_branchCode = new SearchParam();
    searchParam_branchCode.property = 'details.branchCode';
    searchParam_branchCode.value = this.searchForm.value['branchCode'];
    searchParam_branchCode.operator = SearchOperator.EQ;
    if (searchParam_branchCode.value && searchParam_branchCode.value !== '') {
      this.searchParams.push(searchParam_branchCode);
    }
    const searchParam_docDateFrom = new SearchParam();
    searchParam_docDateFrom.property = 'details.docDateFrom';
    searchParam_docDateFrom.value = new Date(this.searchForm.value['docDateFrom']).getTime().toString();
    searchParam_docDateFrom.operator = SearchOperator.EQ;
    if (searchParam_docDateFrom.value && searchParam_docDateFrom.value !== '0' && searchParam_docDateFrom.value !== 'NaN' && searchParam_docDateFrom.value !== '') {
      this.searchParams.push(searchParam_docDateFrom);
    }
    const docDateTo = this.searchForm.get('docDateTo').value;
    if (docDateTo !== undefined && docDateTo !== '' && docDateTo !== null) {
      const searchParam_docDateTo = new SearchParam();
      searchParam_docDateTo.property = 'details.docDateTo';
      searchParam_docDateTo.value = (this.searchForm.value['docDateTo'].getTime() + 86400000).toString();
      searchParam_docDateTo.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam_docDateTo);
    }
    if (values.type) {
      this.searchParams.push({
        property: 'type.typeCode',
        value: values.type,
        operator: SearchOperator.EQ
      });
    }
    if (values.subType) {
      this.searchParams.push({
        property: 'subType.typeCode',
        value: values.subType,
        operator: SearchOperator.EQ
      });
    }
    this.afterSubmit.emit(this.searchParams);
  }

  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
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
      value: 'eblagh',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.AnnouncemenTicketAdmin, this.searchParams)
      .then(result => {
        this.isDisabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

  private _initializeType() {
    this.type.valueField = 'typeCode';
    this.type.displayField = 'typeDesc';
    this.type.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'نام سیستم', columnViewType: 'Label'})
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

  private _initializeSubType() {
    this.subType.valueField = 'typeCode';
    this.subType.displayField = 'typeDesc';
    this.subType.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementSubType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'موضوع', columnViewType: 'Label'})
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
}
