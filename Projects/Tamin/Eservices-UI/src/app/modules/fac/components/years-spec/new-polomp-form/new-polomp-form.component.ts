import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloReqDetNonComput} from '../../../models/alo-req-det-non-comput';
import {AloReqDetCheckedPeriod} from '../../../models/alo-req-det-checked-period';

@Component({
  selector: 'app-new-polomp-form',
  templateUrl: './new-polomp-form.component.html',
  styleUrls: ['./new-polomp-form.component.css']
})
export class NewPolompFormComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private reqDetNComutId: any;
  private _overlay: any;
  fromDate: string;
  toDate: string;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    debugger;
    this.loadData();
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newPolompForm/' + this.editMode + '/' + this.requestId);
        break;
      case 'delete':
        this.delete(param.item.aloReqDetCheckedPeriodId.toString());
        break;
    }
  }
  delete(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          // this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پیام سیستم', 'حذف با موفقیت انجام شد.', () => {
            this.dataGrid.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }, () => {
    });
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.RESPONSIBLE}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.reqDetNComutId = values.data.list[0].reqDetNComutId;
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const data = new AloReqDetNonComput();
    data.fromDate = values.fromDate;
    data.toDate = values.toDate;
    data.aloReqDetCheckedPeriod = new (AloReqDetCheckedPeriod);
    data.aloReqDetCheckedPeriod.aloReqDetCheckedPeriodId = values.aloReqDetCheckedPeriod.aloReqDetCheckedPeriodId;
    // if ( this.editMode === '1') {
    //   jsondata.aloReqDetCheckedPeriodId = this.aloReqDetCheckedPeriodId ;
    // }
  }

  back() {
    this.redirectTo('/fac/newYearsSpec/' +  '/' + this.editMode + '/' + this.requestId);
  }

}
