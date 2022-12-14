import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ClaimUrls} from '../../../claim-urls';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-insurance-list-new',
  templateUrl: './insurance-list-new.component.html',
  styleUrls: ['./insurance-list-new.component.css']
})
export class InsuranceListNewComponent extends TaminPageBaseComponent {
  newForm: FormGroup;
  @ViewChild('workshop') workshop: TaminFieldAutoCompleteDataGridComponent;
  private httpClient: HttpClient;
  private overlay: any;
  errors = [];

  constructor(injector: Injector) {
    super(injector);
    this.httpClient = injector.get(HttpClient);
  }

  protected initializePage(): void {
    this.newForm = this.formBuilder.group({
      contactNumber: [''],
      workshopId: ['', Validators.required],
      fileName1: [''],
      fileName2: [''],
      file1: [null, Validators.required],
      file2: [null, Validators.required]
    });
    this.newForm.get('workshopId').valueChanges.subscribe(value => {
      if (value) {
        const selectedWorkshop = (this.workshop.theGrid.dataItems as Array<any>).find(c => c.workshop.id === value);
        if (selectedWorkshop) {
          this.newForm.get('contactNumber').setValue(selectedWorkshop.workshop.contactNumber ? selectedWorkshop.workshop.contactNumber : '');
        }
      }
    });
    this.initializeWorkshopAutoCompleteDataGrid();
  }

  private initializeWorkshopAutoCompleteDataGrid() {
    this.workshop.valueField = 'workshop.id';
    this.workshop.displayField = 'workshop.title';
    this.workshop.searchPattern = '*{term}*';
    this.workshop.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshops)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'workshop.id', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.title', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.contactNumber', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
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
    this.errors = [];
    if (!this.newForm.valid) {
      this.markFormGroupAsTouched(this.newForm);
      return;
    }
    const formData = new FormData();
    formData.append('workshopId', this.newForm.get('workshopId').value);
    formData.append('workerfile', this.newForm.get('file1').value);
    formData.append('workshopfile', this.newForm.get('file2').value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    this.overlay = this.showOverlay();
    this.httpClient.post(ClaimUrls.fileUpload, formData/*, httpOptions*/)
      .toPromise()
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'فایل ها با موفقیت ارسال شد', () => {
          this.redirectTo('il/workshop-history');
        });
      }).catch(reason => {
      this.hideOverlay(this.overlay);
      console.log(reason.error.data);
      this.errors = this.flattenErrors(reason.error.data);
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


  onFile1Change(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.newForm.patchValue({
        fileName1: file.name,
        file1: file
      });
    }
  }

  onFile2Change(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.newForm.patchValue({
        fileName2: file.name,
        file2: file
      });
    }
  }
}
