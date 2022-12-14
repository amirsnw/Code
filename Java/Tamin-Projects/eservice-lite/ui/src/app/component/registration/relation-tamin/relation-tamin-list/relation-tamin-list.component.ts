import {Component, OnInit} from '@angular/core';
import {RelationTaminModel} from '../../../../models/registration/relationTamin.model';
import {DataColumnViewType, SearchOperator , SearchParam , GenericRestService , TaminFieldAutoCompleteDataGridComponent , TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder} from '@angular/forms';
import {FormGroup , Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {Urls} from '../../../../settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-relation-tamin-list',
  templateUrl: './relation-tamin-list.component.html',
  styleUrls: ['./relation-tamin-list.component.css']
})
export class RelationTaminListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  // public restUrl;
  @ViewChild('recipient') recipient: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  public theForm: FormGroup;
  private _overlay: any;
  items: RelationTaminModel[];
  selectedItem: RelationTaminModel;
  exists = false;
  private _subscription = new Subscription();
  showRecipient: boolean;
  showBranchName: boolean;
  isWrite = true;
  pensionerList = [];
  subStatus = false ;
  actionRenderResult = [];
  isuStatusCode = '';
  insuranceNumber = '';
  branchCode = '';
  endDate = '';
  insuranceNumberExist = '';
  branchCodeExist = '';


  private _initializeFormGroup() {
    this._subscription.add(this.theForm.get('recipient').valueChanges.subscribe(value => {
      if (value !== undefined && value !== '' && value === '99') {
        this.showRecipient = true;
        this.showBranchName = false;
      } else {
        this.showRecipient = false;
        this.showBranchName = true;
      }
    }));
  }

  private createForm() {
    this.theForm = this.formBuilder.group({
      nationalId: ['', []],
      recipient: ['', [Validators.required]],
      target: [''],
      branchName: [''],

    });
  }

  initializePage() {
    this.initializeGrid();
    this._initializeRecipient();
    this.createForm();
    this._initializeFormGroup();
  }
  initializeGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.relationAll)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'organization.organizationName', columnCaption: 'نام واحد سازمانی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'relationWithTamin.relationDescription', columnCaption: 'ارتباط با تامین', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator})
      .addVisibleColumn({columnName: 'insuranceId', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'parentId', columnCaption: 'شماره بیمه شده اصلی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'شماره کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'send',
        columnCaption: 'صدور گواهی ',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'send',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
      this.dataGrid.actionRender = (item: any, actionCells: Array<any>) => {
        const result = [];

        if (this.dataGrid.dataItems !== null && this.dataGrid.dataItems.length > 0) {
          (this.dataGrid.dataItems).forEach(item22 => {
            if (item22.relationWithTamin !== null &&
              item22.relationWithTamin.baseAudienceType.audienceTypeCode !== '02' &&
              item22.relationWithTamin.baseAudienceType.audienceTypeCode !== '03') {
              this.exists = true;
              this.insuranceNumberExist = item22.insuranceId;
              this.branchCodeExist = item22.organization.code;
            }
          });
        }

        if (this.exists === true &&  item.insuranceId === this.insuranceNumberExist && item.organization.code === this.branchCodeExist ) {
          result.push(actionCells.find(c => c.columnActionName === 'send'));
        } else if (
           this.exists === false  &&
           (item.relationWithTamin === null &&  item.insuranceId.substr(0, 2) === '00') ||
           (item.relationWithTamin !== null &&  item.relationWithTamin.baseAudienceType.audienceTypeCode === '01') ||
           (item.relationWithTamin !== null &&  item.relationWithTamin.baseAudienceType.audienceTypeCode === '03')) {
           // actionCells.find(c => c.columnActionName === 'send').visible = false;
           result.push(actionCells.find(c => c.columnActionName === 'send'));
        }
        this.actionRenderResult = result;
        return result;
      };
  }

  gridCellServiceNameTranslator(item) {
    if ( item === null || item === '' ) {
      return 'ارتباط بیمه پردازی، فعال نمی باشد.';
    } else {
      return  item;
    }
  }

  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;
    // &&  dataItem.insuranceId.substr(0, 2) !== '00'
    if ( dataItem.relationWithTamin === null ) {
      this.isuStatusCode = '02';
    } else {
      this.isuStatusCode = dataItem.relationWithTamin.baseAudienceType.audienceTypeCode ;
    }
    this.insuranceNumber = dataItem.insuranceId;
    this.branchCode = dataItem.organizationId;
    this.endDate = dataItem.endDate;
    if (param.actionColumn.columnName === 'send') {
      if ( !this.subStatus ) {
        this.subStatus = true;
      } else {
        this.subStatus = false;
      }
      // this.redirectTo(`/request/edit/${dataItem.id}`);
    }

  }

  onSearch() {
    this.dataGrid.refreshData();
  }

  gridCellRequestTypeStyle(item) {
    if (item !== '-') {
      return {'background-color': 'green'};
    }
  }
  private _initializeRecipient() {
    this.recipient.valueField = 'recipientCode';
    this.recipient.displayField = 'recipientName';
    this.recipient.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.recipients)
      .setShowPager(true)
      .setFirstLoad(true)
      .setId('recipientCode')
      .addVisibleColumn({columnName: 'recipientName', columnCaption: 'نام گیرنده', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(60)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }
  wirteClick() {
    this.isWrite = true;
  }
  selectClick() {
    this.isWrite = false;
  }
  confirmClick(values, valid) {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const paymentType = new SearchParam();
    paymentType.property = 'recipient';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value =  this.theForm.get('recipient').value  ;

    const target = new SearchParam();
    target.property = 'target';
    target.operator = SearchOperator.EQUAL;
    target.value =  this.theForm.get('target').value;

    const branchName = new SearchParam();
    branchName.property = 'branchName';
    branchName.operator = SearchOperator.EQUAL;
    branchName.value =  this.theForm.get('branchName').value;

    const branchCode = new SearchParam();
    branchCode.property = 'branchCode';
    branchCode.operator = SearchOperator.EQUAL;
    branchCode.value =  this.branchCode;

    const insuranceNumber = new SearchParam();
    insuranceNumber.property = 'insuranceNumber';
    insuranceNumber.operator = SearchOperator.EQUAL;
    insuranceNumber.value =  this.insuranceNumber;

    const statusCode = new SearchParam();
    statusCode.property = 'statusCode';
    statusCode.operator = SearchOperator.EQUAL;
    statusCode.value =  this.isuStatusCode;

    const endDate = new SearchParam();
    endDate.property = 'endDate';
    endDate.operator = SearchOperator.EQUAL;
    endDate.value =  this.endDate;

    const searchParams: Array<SearchParam> = [];

    searchParams.push(paymentType);
    searchParams.push(target);
    searchParams.push(branchName);
    searchParams.push(branchCode);
    searchParams.push(statusCode);
    searchParams.push(insuranceNumber);
    searchParams.push(endDate);

    this._overlay = this.showOverlay();
     this.restService
       .getAll(Urls.StatusCertificate + "/report" , searchParams)
       .then(result => {
         this.hideOverlay(this._overlay);
         this.showInfoMessageBox('کاربر محترم', 'پیام تایید ارسال گواهی استعلام وضعیت ، برای شماره همراه شما ارسال گردید.</br>گواهی استعلام وضعیت شما به صندوق شخصی شما ارسال شده است.');

       })
       .catch(reason => {
         this.hideOverlay(this._overlay);
         this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
       });
  }
  onItemSelect(item) {
    this.selectedItem = item;
  }

  backToPanelClick() {
    this.redirectTo('/');
  }

  cancelButton() {
  this.subStatus = false;
  }


}

