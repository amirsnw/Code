import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminModalComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {Urls} from 'src/app/settings/urls';
import {FormGroup, Validators} from '@angular/forms';
import {ClaimUrls} from '../../../../claim-urls';
// import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-full-operation-modal',
  templateUrl: './list-full-operation-modal.component.html',
  styleUrls: ['./list-full-operation-modal.component.css']
})
export class ListFullOperationModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('workshopSpecification') workshopSpecification: TaminFieldAutoCompleteDataGridComponent;
  @Output() refreshData = new EventEmitter<any>();
  // private _subscription = new Subscription();

  newForm: FormGroup;
  private overlay: any;

  months = [
    {name: 'فروردین', value: '01'},
    {name: 'اردیبهشت', value: '02'},
    {name: 'خرداد', value: '03'},
    {name: 'تیر', value: '04'},
    {name: 'مرداد', value: '05'},
    {name: 'شهریور', value: '06'},
    {name: 'مهر', value: '07'},
    {name: 'آبان', value: '08'},
    {name: 'آذر', value: '09'},
    {name: 'دی', value: '10'},
    {name: 'بهمن', value: '11'},
    {name: 'اسفند', value: '12'}
  ];

  initializePage() {
    this.newForm = this.formBuilder.group({
      workshopCode: [''],
      // workshopName: [''],
      // contractNumber: [''],
      // contractName: [''],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      month: ['', [Validators.required]],
      listNumber: ['', [Validators.required]],
    });

// <---------------------binding---------------------------->
    // this._subscription.add(this.newForm.get('workshopSpecification').valueChanges.subscribe(value => {
    //   if (value !== '') {
    //     const item = (<Array<any>>this.workshopSpecification.theGrid.dataItems).filter(c => c.workshopId === value);
    //     this.newForm.get('workshopName').setValue(item[0].workshopName);
    //   }
    // }));


    this._initializeworkshopSpecification();
  }


  // protected destroyPage(): void {
  //   this._subscription.unsubscribe();
  // }

  private _initializeworkshopSpecification() {
    this.workshopSpecification.valueField = 'code';
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
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'title', columnCaption: 'نام', columnViewType: 'Label'})
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
    const data = {
      listNumber: values.listNumber,
      month: {
        code: values.month
      },
      status: 0,
      workshopCode: values.workshopCode,
      workshopId: this.workshopSpecification.theGrid.selectedDataItem.id,
      workshopTitle: this.workshopSpecification.theGrid.selectedDataItem.title,
      year: values.year
    };
    this.overlay = this.showOverlay();
    this.restService
      .create(ClaimUrls.listRecord, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.hide();
        const msg = 'اطلاعات با شماره پیگیری ' + (<any>value).data.id + ' با موفقیت ذخیره شد.';
        this.showInfoMessageBox('توجه', msg);
        this.refreshData.emit();
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}
