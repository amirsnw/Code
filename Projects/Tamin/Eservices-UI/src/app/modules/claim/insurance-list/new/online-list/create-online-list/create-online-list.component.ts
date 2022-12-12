import {Component, ViewChild} from '@angular/core';
import {
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ClaimUrls} from '../../../../claim-urls';

@Component({
  selector: 'app-create-online-list',
  templateUrl: './create-online-list.component.html',
  styleUrls: ['./create-online-list.component.css']
})
export class CreateOnlineListComponent extends TaminPageBaseComponent {

  @ViewChild('workshopAutoComplete') workshopAutoCompleteDataGrid: TaminFieldAutoCompleteDataGridComponent;

  theForm: FormGroup;
  private overlay: any;


  months = [
    {id: '01', name: 'فروردین'},
    {id: '02', name: 'اردیبهشت'},
    {id: '03', name: 'خرداد'},
    {id: '04', name: 'تیر'},
    {id: '05', name: 'مرداد'},
    {id: '06', name: 'شهریور'},
    {id: '07', name: 'مهر'},
    {id: '08', name: 'آبان'},
    {id: '09', name: 'آذر'},
    {id: '10', name: 'دی'},
    {id: '11', name: 'بهمن'},
    {id: '12', name: 'اسفند'}
  ];
  listNo = [
    {id: '01', name: '01'},
    {id: '02', name: '02'},
    {id: '03', name: '03'},
    {id: '04', name: '04'},
    {id: '05', name: '05'},
    {id: '06', name: '06'},
    {id: '07', name: '07'},
    {id: '08', name: '08'},
    {id: '09', name: '09'},
  ];

  years = [];

  protected initializePage() {
    this.theForm = this.formBuilder.group({
      workshop: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      listNo: ['01', Validators.required],
      contactTitle: [''],
    });

    this.getCurrentDate()
      .then(value => {
        const currentYear = Number(this.getPersianDate(value).split('/')[0]);
        const currentMonth = this.getPersianDate(value).split('/')[1];
        this.years = [
          {id: (currentYear - 1), name: (currentYear - 1).toString()},
          {id: (currentYear), name: (currentYear).toString()},
          {id: (currentYear + 1), name: (currentYear + 1).toString()},
        ];
        setTimeout(() => {
          this.theForm.get('year').setValue(currentYear);
          this.theForm.get('month').setValue(currentMonth);
        });
      })
      .catch(reason => {
      });

    this.theForm.get('workshop').valueChanges.subscribe(value => {
      if (value) {
        this.theForm.get('contactTitle').setValue(value.contactTitle);
      }
    });

    this.initWorkshopAutoComplete();
  }

  protected loadPageData() {
    // setTimeout(() => {
    //   this.theForm.get('month').setValue(3);
    //   this.theForm.get('listNo').setValue('01');
    // });
  }

  private initWorkshopAutoComplete() {
    this.workshopAutoCompleteDataGrid.valueField = 'workshop';
    this.workshopAutoCompleteDataGrid.displayField = 'workshop.title';
    this.workshopAutoCompleteDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshops)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'workshop.code', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.title', columnCaption: 'نام کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.contractTitle', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
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

  onSave() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const data = {
      workshopCode: this.theForm.get('workshop').value.code,
      workshopId: this.theForm.get('workshop').value.id,
      year: this.theForm.get('year').value,
      listNumber: this.theForm.get('listNo').value,
      status: 0,
      contractNumber: this.theForm.get('workshop').value.contactNumber,
      contactTitle: this.theForm.get('workshop').value.contactTitle,
      month: this.theForm.get('month').value,
    };

    this.overlay = this.showOverlay();

    this.restService.create(ClaimUrls.listRecord, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'لیست جدید با موفقیت ذخیره شد.', () => {
          this.redirectTo('il/online-list-details/' + value.data.id);
        });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('خطا', reason.error.data.message);
      });
  }

  private getCurrentDate(): Promise<Date> {
    return new Promise<Date>((resolve, reject) => {
      this.restService
        .getAll(ClaimUrls.currentDate)
        .then(value => {
          resolve(new Date(value.data));
        })
        .catch(reason => {
          resolve(new Date());
        });
    });
  }
}
