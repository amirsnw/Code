import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaminValidators} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent} from 'tamin-framework';
import { TaminStaticDataService } from '../../../../services/tamin-static-data.service/tamin-static-data.service';


@Component({
  selector: 'app-special-diseases',
  templateUrl: './special-diseases.component.html',
  styleUrls: ['./special-diseases.component.css']
})
export class SpecialDiseasesComponent implements OnInit {
  public theForm: FormGroup;
  @ViewChild('specialDiseasesType') specialDiseasesType: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('submitBaseCertificate') submitBaseCertificate: TaminFieldAutoCompleteDataGridComponent;

  constructor(private formBuilder: FormBuilder, private taminStaticDataService: TaminStaticDataService) {
  }

  private createForm() {
    this.theForm = this.formBuilder.group({
      submitBaseCertificate: ['', [Validators.required]],
      submitDate: ['', [Validators.required]],
      certificateDate: ['', [Validators.required]],
      certificateNumber: ['', [Validators.required]],
      specialDiseasesType: ['', [Validators.required]],
      specialDiseasesStartDate: ['', [Validators.required]],
    });
  }

  get formValues() {
    return this.theForm.getRawValue();
  }


  ngOnInit() {
    this.createForm();
    this._initializeSpecialDiseasesType();
    this._initializeSubmitBaseCertificate();
  }

  private _initializeSpecialDiseasesType() {
    this.specialDiseasesType.valueField = 'illnessTypeCode';
    this.specialDiseasesType.displayField = 'illnessTypeDesc';
    this.specialDiseasesType.searchPattern = '%{term}%';
    this.specialDiseasesType.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.illnessTypes)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'illnessTypeCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'illnessTypeDesc', columnCaption: 'نام', columnViewType: 'Label'})
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
  private _initializeSubmitBaseCertificate() {
    this.submitBaseCertificate.valueField = 'code';
    this.submitBaseCertificate.displayField = 'description';
    this.submitBaseCertificate.searchPattern = '%{term}%';
    this.submitBaseCertificate.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'description', columnCaption: 'نام', columnViewType: 'Label'})
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

}
