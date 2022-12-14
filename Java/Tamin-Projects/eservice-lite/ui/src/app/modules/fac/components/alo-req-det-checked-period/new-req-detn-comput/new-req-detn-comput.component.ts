import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloReqDetCheckedPeriod} from '../../../models/alo-req-det-checked-period';
import {AloRequest} from '../../../models/alo-request';
import {AloReqDetNonComput} from '../../../models/alo-req-det-non-comput';

@Component({
  selector: 'app-new-req-detn-comput',
  templateUrl: './new-req-detn-comput.component.html',
  styleUrls: ['./new-req-detn-comput.component.css']
})
export class NewReqDetnComputComponent extends TaminPageBaseComponent {

  @Output() apply = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();
  // @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  editForm: FormGroup;
  // private requestId: any;
  // private editMode: any;
  // private reqDetNComutId: any;
  // private _overlay: any;
  // fromDate: string;
  // toDate: string;
  // private endDate: any;
  // private startDate: any;

  protected initializePage(): void {
    this.editForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    });
  }

  // onAction(param: any) {
  //   debugger;
  //   const actionName = param.actionColumn.columnActionName;
  //   switch (actionName) {
  //     case 'edit':
  //       this.editMode = '1';
  //       this.redirectTo('/fac/newAloReqDetCheckedPeriod/' + this.editMode + '/' + this.requestId);
  //       break;
  //     case 'delete':
  //       this.delete(param.item.aloReqDetCheckedPeriodId.toString());
  //       break;
  //   }
  // }
  // onNew() {
  //   debugger;
  //   this.editMode = '0';
  //   this.redirectTo('/fac/newAloReqDetCheckedPeriod/' + this.editMode + '/' +  this.requestId);
  // }
  // delete(id) {
  //   this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
  //     this._overlay = this.showOverlay();
  //     this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
  //       .then(value => {
  //         this.hideOverlay(this._overlay);
  //         // this.theModal.hide();
  //         this.changeDetectorRef.detectChanges();
  //         this.showInfoMessageBox('پیام سیستم', 'حذف با موفقیت انجام شد.', () => {
  //           this.dataGrid.refreshData();
  //         });
  //       })
  //       .catch(reason => {
  //         this.hideOverlay(this._overlay);
  //         this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  //       });
  //   }, () => {
  //   });
  // }

  // loadData() {
  //   debugger;
  //   const theUrl = `${FacUrls.RESPONSIBLE}/` + this.requestId;
  //   this.restService.getAll(theUrl)
  //     .then(values => {
  //       debugger;
  //       if (values.data &&  this.editMode === '1' ) {
  //         this.editForm.patchValue(values.data.list[0]);
  //         this.reqDetNComutId = values.data.list[0].reqDetNComutId;
  //       }
  //     })
  //     .catch(error => {
  //       this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  //     });
  // }
  // onSave(values) {
  //   debugger;
  //   if (!this.editForm.valid) {
  //     this.markFormGroupAsTouched(this.editForm);
  //     return;
  //   }
  //   const data = new AloReqDetNonComput();
  //   data.fromDate = values.fromDate;
  //   data.toDate = values.toDate;
  //   // data.aloReqDetCheckedPeriod = new (AloReqDetCheckedPeriod);
  //   // data.aloReqDetCheckedPeriod.aloReqDetCheckedPeriodId = values.aloReqDetCheckedPeriod.aloReqDetCheckedPeriodId;
  //   this.redirectTo('/fac/newAloReqDetCheckedPeriod/' +  '/' + this.editMode + '/' + this.requestId );
  //   // if ( this.editMode === '1') {
  //   //   jsondata.aloReqDetCheckedPeriodId = this.aloReqDetCheckedPeriodId ;
  //   // }
  // }

  back() {
    // this.redirectTo('/fac/newAloReqDetCheckedPeriod/' +  '/' + this.editMode + '/' + this.requestId);
  }

  doApply() {
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    this.apply.emit(this.editForm.getRawValue());
  }

  doCancel() {
    this.cancel.emit();
  }
}
