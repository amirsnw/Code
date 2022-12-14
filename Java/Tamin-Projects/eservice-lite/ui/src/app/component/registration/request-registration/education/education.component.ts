import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {EducationModel} from 'src/app/models/registration/education.model';
import {PersonalModel} from 'src/app/models/registration/personal.model';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent extends TaminPageBaseComponent {
  public personalId: string;

  public formeducationdata: FormGroup;
  public educationModel: EducationModel;
  @ViewChild('educationfield') educationfield: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('education') education: TaminFieldAutoCompleteDataGridComponent;

  private _overlay: any;

  private searchParams: SearchParam[];
  private id: number;

  private createForm() {
    this.formeducationdata = this.formBuilder.group({
      dateOfGraduate: ['', [Validators.required]],
      educationfield: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]],
      education: ['', [Validators.required]],
    });
  }

  get formValues() {
    return this.formeducationdata.getRawValue();
  }

  initialize(personalId) {
    this.loadDate(personalId);
  }

  initializePage() {
    this.createForm();
    this._initializeEducation();
    this._initializelastcertificate();
  }

  private _initializeEducation() {
    this.educationfield.valueField = 'educationFieldCode';
    this.educationfield.displayField = 'educationFieldDescription';
    this.educationfield.searchPattern = '*{term}*';
    this.educationfield.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setId('educationFieldCode')
      .addUrl(Urls.educationFields)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'educationFieldCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'educationFieldDescription', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializelastcertificate() {
    this.education.valueField = 'educationCode';
    this.education.displayField = 'educationDescription';
    this.education.searchPattern = '*{term}*';
    this.education.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.baseEducation)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('educationCode')
      .addVisibleColumn({columnName: 'educationCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'educationDescription', columnCaption: 'نام', columnViewType: 'Label'})
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

  confirmClickk(values, valid) {
    if (!this.formeducationdata.valid) {
      this.markFormGroupAsTouched(this.formeducationdata);
      return;
    }
    if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    this._overlay = this.showOverlay();
    values.education = values.education;
    values.educationfield = values.educationfield;
    values.personal = new PersonalModel();
    values.id = this.id;
    values.personal.id = parseInt(this.personalId, 10);
    if (this.id == null) {
      this.restService.create(Urls.Education, values)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.educationModel = resulttt.data as EducationModel;
          this.id = this.educationModel.id;
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات تحصیلی با موفقیت ثبت شد.');

        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    } else {
      this.restService.update(Urls.Education, this.id.toString(), values)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.educationModel = resulttt.data as EducationModel;
          this.id = this.educationModel.id;
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات تحصیلی با موفقیت ثبت شد.');

        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }

  loadDate(personalId) {
    this.id = null;
    this.personalId = personalId;
    this._overlay = this.showOverlay();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'personal.id';
    searchParam.value = personalId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.Education, 1, 10, this.searchParams, [])
      .then(value => {
        this.hideOverlay(this._overlay);

        this.formeducationdata.patchValue(value.data.list[0]);
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }
}
