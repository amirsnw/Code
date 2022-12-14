import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup} from "@angular/forms";
import {Urls} from "../../../../../settings/urls";
import {WorkshopFullInfoListComponent} from "../../../../workshop-registration/workshop-full-info/workshop-full-info-list/workshop-full-info-list.component";

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  @ViewChild('workshop') workshop: TaminFieldComboBoxStaticComponent;
  @ViewChild('workshopList') workshopList: WorkshopFullInfoListComponent;
  protected initializePage(): void {
    this._initializeFromGroup();
    // this._initializeWorkshop();
  }
  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
  }
  onFilterList(params: any) {
    debugger;
    this.searchForm.get('workshopId').setValue(params.workshopId);
    this.searchForm.get('branchCode').setValue(params.branchCode);
    this.submitt.emit(this.searchForm.getRawValue());

  }
  /*loadPageData() {
    /!*this.restService.getAll(Urls.WorkshopUsers)
      .then(value => {
        this.workshop.dataItems = value.data.list;
        if (value.data.list.length !== 0) {
          this.searchForm.get('workshopId').setValue(value.data.list[0].workshopCode);
        }
      })
      .catch(reason => {
      });
*!/
debugger;
    this.searchForm.get('workshopId').setValue(this.workshop.dataItems);
    /!*this.searchForm.get('workshopId').setValue('0010005462');
    th*!/
  }*/

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: [''],
      branchName: [{value: '', disabled: true}]
    });
    /*this.searchForm.get('workshopId').valueChanges.subscribe(value => {
      this.onChangWorkshop();
    });*/
  }

  resetForm() {
    this.searchForm.reset();
    this.submitt.emit();
  }

  /*  searchFormSubmit(values, valid) {
      this.submitt.emit(this.searchForm.getRawValue());
    }*/
  // private _initializeWorkshop() {
  //   this.workshop.valueField = 'workshopId';
  //   this.workshop.displayField = 'workshopName';
  //   this.workshop.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .addUrl(Urls.employerByLegal)
  //     .setShowPager(true)
  //     .setFirstLoad(false)
  //     .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
  //     .setActionColumnCaption('')
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(100)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setShowFooter(false)
  //     .setShowPager(false)
  //     .setViewType('GridView')
  //     .getData();
  // }
  /*onChangWorkshop() {
     const item = this.workshop.dataItems.filter(c => c.workshopCode === this.searchForm.get('workshopId').value)[0];
     this.searchForm.get('branchName').setValue(item.organization.title);
     this.searchForm.get('branchCode').setValue(item.organization.code);
     this.submitt.emit(this.searchForm.getRawValue());
  }*/
}
