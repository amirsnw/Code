import {Component, Injector, ViewChild} from '@angular/core';
import {TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ClaimUrls} from '../../../claim-urls';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  @ViewChild('workshopAutoComplete') workshopAutoComplete: TaminFieldAutoCompleteDataGridComponent;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }


  protected initializePage() {
    this.theForm = this.formBuilder.group({
      workshop: ['', Validators.required],
      contractNumber: [''],
      file1: ['', Validators.required],
      file2: ['', Validators.required],
    });

    this.theForm.get('workshop').valueChanges.subscribe(value => {
      if (value && value.contractNumber) {
        this.theForm.get('contractNumber').setValue(value.contractNumber);
      } else {
        this.theForm.get('contractNumber').setValue('');
      }
    });

    this.initializeWorkshopAutoComplete();
  }

  private initializeWorkshopAutoComplete() {
    this.workshopAutoComplete.valueField = 'workshop';
    this.workshopAutoComplete.displayField = 'workshop.title';
    this.workshopAutoComplete.searchPattern = '{term}';
    this.workshopAutoComplete.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshops)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'workshop.code', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.title', columnCaption: 'نام کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.contractNumber', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.organization.title', columnCaption: 'شعبه', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  sendFiles() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

/*
    const filename1 = this.theForm.get('file1').value.files[0].name.split('0');
    const filename2 = this.theForm.get('file2').value.files[0].name.split('0');
*/

/*
    if (filename1[filename1.length - 1] !== 'dbf' || filename2[filename1.length - 2] !== 'dbf') {
      this.showErrorMessageBox('خطا', '');
      return;
    }
*/

    const formData = new FormData();
    formData.append('workshopId', this.theForm.get('workshop').value.id);
    formData.append('workerfile', this.theForm.get('file2').value);
    formData.append('workshopfile', this.theForm.get('file1').value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    // this.overlay = this.showOverlay();
    this.httpClient.post(ClaimUrls.fileUpload, formData/*, httpOptions*/)
      .toPromise()
      .then(value => {
        const message = 'کارفرمای گرامی، لیست بیمه با شماره پیگیری ' + (value as any).data.traceCode + ' با موفقیت بارگذاری گردید.';
        this.showInfoMessageBox('توجه', message, () => {
          this.redirectTo('il/workshop-history/view/' + (value as any).data.id);
        });
      })
      .catch(reason => {
        switch (reason.status) {
          case 400:
            let errors = '';
            this.flattenErrors(reason.error.data).forEach(value => {
              errors += '<p>' + value + '</p>';
            });
            this.showErrorMessageBox('خطا', errors);
            break;
          case 500:
            this.showErrorMessageBox('خطا', reason.error.data.message);
            break;
        }
      });
  }

  private flattenErrors(errors: Array<any>): Array<string> {
    const result = [];
    errors.forEach(value => {
      if (value.hasOwnProperty('objectViolations')) {
        (value.objectViolations as Array<any>).forEach(ov => {
          result.push(ov);
        });
      }
      if (value.hasOwnProperty('propertyViolations')) {
        (value.objectViolations as Array<any>).forEach(pv => {
          result.push(pv);
        });
      }
    });
    return result;
  }

}
