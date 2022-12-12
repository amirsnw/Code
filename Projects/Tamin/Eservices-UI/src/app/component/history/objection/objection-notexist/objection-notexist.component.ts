import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {HistoryNotexistModel} from '../../../../models/history/historyNotexist.model';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ObjectionNotexistNewEditComponent} from '../objection-notexist-new-edit/objection-notexist-new-edit.component';

@Component({
  selector: 'app-objection-notexist',
  templateUrl: './objection-notexist.component.html',
  styleUrls: ['./objection-notexist.component.css']
})
export class ObjectionNotexistComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('theNewModal') theNewModal: TaminModalComponent;
  @ViewChild('objectionNotexistNewEdit') objectionNotexistNewEdit: ObjectionNotexistNewEditComponent;
  @Output() submitt = new EventEmitter<any>();
  noteForm: FormGroup;
  data = [];
  private finalResult = [];
  private _overlay: any;

  private CheckStatusUnSaved(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.restService
        .getAll(Urls.CheckStatusUnSaved)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);

        });
    });
  }

  private loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataGrid.serviceUrl = Urls.NotexistObjection;
      this.dataGrid
        .refreshData(false)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  loadPageData() {
    this._overlay = this.showOverlay();
    this.CheckStatusUnSaved()
      .then(value => {
        if (value.data) {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی، در حال حاضر دارای یک درخواست در حال بررسی می باشید و امکان ثبت مجدد درخواست وجود ندارد.', () => {
            this.redirectTo('/');
          });
        } else {
          this.loadData()
            .then(value1 => {
              this.hideOverlay(this._overlay);
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  initializePage() {
    this.title = 'سابقه' + ' - ' + ' سوابق ناموجود';
    this._initializeDataGrid();
    this.noteForm = this.formBuilder.group({
      note: ['']
    });
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'نام استان', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'نام شعبه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'شهر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceTypeDesc', columnCaption: 'نوع بیمه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'تاریخ شروع', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'تاریخ پایان', columnViewType: DataColumnViewType.PersianDate})
      .addActionColumn({columnName: 'edit', columnCaption: 'تغییر', columnViewType: 'Button', icon: '', columnActionName: 'edit', isActionAuthorized: false, visible: true, enable: true})
      .addActionColumn({columnName: 'delete', columnCaption: 'حذف', columnViewType: 'Button', icon: '', columnActionName: 'delete', isActionAuthorized: false, visible: true, enable: true})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(false)
      .setActionColumnCaption('عملیات')
      .getData();
  }

  backToPanelClick() {
    this.redirectTo('/');
  }

  exitNotexistNewEditForm() {
    this.dataGrid.refreshData();
  }

  onItemAction(data) {
    const actionColumn = data.actionColumn;
    const dataItem = data.item;

    switch (actionColumn.columnName) {
      case 'edit':
        this.objectionNotexistNewEdit.show(dataItem);
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          // const theUrl = `${Urls.NotexistObjectionSave}/delete/${this.dataGrid.selectedDataItem.reqno}`;
          const theUrl = Urls.NotexistObjectionDelete + '/' + this.dataGrid.selectedDataItem.reqno;
          this.restService.delete(theUrl, this.dataGrid.selectedDataItem.rowi)
            .then(value => {
              this.hideOverlay(this._overlay);
              this.dataGrid.refreshData();
            })
            .catch(error => {
              this.hideOverlay(this._overlay);
            });
        }, () => {
        });
        break;
    }
  }

  confirmNotexistRequest() {
    if (this.dataGrid.dataItems.length === 0) {
      this.showErrorMessageBox('پیام سیستم', 'درخواستی برای ارسال وجود ندارد.');
      return;
    }
    this.finalResult = [];
    const data = new HistoryNotexistModel();
    data.userDesc = this.noteForm.get('note').value;
    this.finalResult.push(data);
    this._overlay = this.showOverlay();
    this.restService.create(Urls.NotexistObjectionConfirm, this.finalResult)
      .then(value => {
        this.restService.create(Urls.FinalConfirmUnsavesHistory, {})
          .then(value1 => {
            this.hideOverlay(this._overlay);
            const message = 'درخواست شما با شماره پیگیری ' + this.getPersianNumber(value1.data) + ' با موفقیت ارسال شد.';
            this.showInfoMessageBox('پیام سیستم', message, () => {
              this.redirectTo('/');
            });
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  // cancelNotexistRequest() {
  //   this._overlay = this.showOverlay();
  //
  //   this.restService.create(Urls.NotexistObjectionCancel, {})
  //     .then(value => {
  //       this.hideOverlay(this._overlay);
  //       alert('انصراف از ثبت با موفقیت انجام شد');
  //       // this.close.emit();
  //     })
  //     .catch(error => {
  //       this.hideOverlay(this._overlay);
  //     });
  // }

}
