import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-important-papers-search',
  templateUrl: './important-papers-search.component.html',
  styleUrls: ['./important-papers-search.component.css']
})
export class ImportantPapersSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  detailForm: FormGroup;
  private overlay: any;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.detailForm = this.formBuilder.group({
      id1: ['', Validators.required],
      ourag_namad: [''],
      ourag_count: [''],
      organizationzname: [''],
      date1: ['', Validators.required]
    });
  }

  resetForm() {
    this.detailForm.reset();
    this.submitt.emit();
  }

  detailFormSubmit(values, valid) {
    if (!this.detailForm.valid) {
      return;
    }
    this.overlay = this.showOverlay();
    this.restService
      .getById(`${Urls.importantPapers}`, `${values.id1}/${this.getPersianDate(values.date1).replace("/", "").replace("/", "")}`)
      .then(value => {
        this.hideOverlay(this.overlay);
        if (value.data != null) {
          this.detailForm.get('ourag_namad').setValue(value.data.ourag_namad);
          this.detailForm.get('ourag_count').setValue((value.data.ourag_count * value.data.ourag_aprice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          this.detailForm.get('organizationzname').setValue(value.data.organizationzname);
          this.submitt.emit(value.data);
        } else {
          this.submitt.emit(null);
        }

        // const msg = 'اطلاعات با شماره پیگیری ' + (<any>value).data.id + ' با موفقیت ذخیره شد.';
        // this.showInfoMessageBox('توجه', msg);
        // debugger;
        // this.ImportantPapersComponent.ImportantPapersListComponent.taminDataGrid.refreshData();
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
          //  this.redirectTo(`/il/load-from-file/${param.item.traceCode}/${param.item.status.id}`);
        }

      });
  }
}
