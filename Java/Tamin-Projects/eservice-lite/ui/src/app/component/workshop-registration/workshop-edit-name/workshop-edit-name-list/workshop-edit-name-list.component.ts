import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {Workshop} from '../../../../models/Workshop/Workshop.model';

@Component({
  selector: 'app-workshop-edit-name-list',
  templateUrl: './workshop-edit-name-list.component.html',
  styleUrls: ['./workshop-edit-name-list.component.css']
})
export class WorkshopEditNameListComponent extends TaminPageBaseComponent {
  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() sendRecord = new EventEmitter<any>();
  searchParams: SearchParam[];
  editNameForm: FormGroup;
  private _overlay: any;
  currentObject: any;


  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroup();
    this._initializeDataGrid();
  }


  private _initializeFromGroup() {
    this.editNameForm = this.fb.group({
      name: [''],
      workshopName: ['']
    });
  }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.organizationName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'editName',
        columnCaption: 'تغییر نام کارگاه',
        columnViewType: 'Button',
        // columnIconUrl: 'url(assets/images/icons/Actions-document-edit-icon.png)',
        columnActionName: 'editName',
        isActionAuthorized: true,
        icon: 'icon-edit',
        visible: true
      })
      .setActionColumnCaption('تغییر نام کارگاه')
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onItemAction(event) {
    if (event.actionCell.columnActionName === 'editName') {
      this.theModal.show();
      this.theModal.width = '20%';
      const tmp = {
        name: event.dataItem.workshopName,
        workshopName: ['']
      };
      this.currentObject = event.dataItem;
      this.editNameForm.patchValue(tmp);
    }
  }

  exitconflictEditForm() {
    this.theModal.hide();
  }

  loadData(item) {
    this.searchParams = [];
    if (item.workshopId !== undefined && item.workshopId !== '') {
      this.searchParams.push({
        property: 'workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item.branchCode !== undefined && item.branchCode !== '') {
      this.searchParams.push({
        property: 'branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.workshopListGrid.serviceUrl = `${Urls.employerByLegal}`;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
  }

  editNameFormSubmit() {
    this.theModal.hide();
    const formData = this.editNameForm.getRawValue();
    const data = new Workshop();
    data.workshopId = this.currentObject.workshopId;
    data.branchCode = this.currentObject.branchCode;
    data.workshopName = formData.workshopName;
    this._overlay = this.overlayService.show();
  }
}
