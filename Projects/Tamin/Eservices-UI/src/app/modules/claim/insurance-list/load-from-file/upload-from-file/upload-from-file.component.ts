import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentUiModel } from 'src/app/models/registration/documentUi.model';
import { TaminPageBaseComponent, TaminFieldAutoCompleteDataGridComponent, TaminDataGridConfigurationFactory } from 'tamin-framework';
import { FormGroup, Validators } from '@angular/forms';
import {Urls} from 'src/app/settings/urls';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-upload-from-file',
  templateUrl: './upload-from-file.component.html',
  styleUrls: ['./upload-from-file.component.css']
})
export class UploadFromFileComponent  extends TaminPageBaseComponent {

  @ViewChild('workshopSpecification') workshopSpecification: TaminFieldAutoCompleteDataGridComponent;

  newForm: FormGroup;
  private overlay: any;

  documentModelUi: DocumentUiModel;
  public restUrlImages;
  public workshopName;
  public branchCode;
  public rcntrow;
  public rcntassignname;


  initializePage() {
    this.newForm = this.formBuilder.group({
      workshopCode: [''],
      // workshopName: [''],
      // contractNumber: [''],
      // contractName: [''],
      DesignGuid1: [''],
      DesignGuid2: ['', ],
      // listNumber: ['', [Validators.required]],
    });

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

  // ------------------------------------
  onImageGuidUploaded1(event) {
    this.setSession('guid1', event);
    this.setSession('guidType1', '01');
  }

  onImageGuidDeleted1(event) {
    this.removeSession('guid1');
    this.removeSession('guidType1');
  }

  // ----------------------- ------------------ ------------------ ------------------
  onImageGuidUploaded2(event: string) {
    this.setSession('guid2', event);
    this.setSession('guidType2', '02');
  }

  onImageGuidDeleted2(event: string) {
    this.removeSession('guid2');
    this.removeSession('guidType2');
  }

  // ----------------------- ------------------ ------------------ ------------------


  getSession(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}
