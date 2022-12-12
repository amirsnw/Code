import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  SearchOperator, SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent, TaminValidators
} from "tamin-framework";
import {Urls} from "../../../../settings/urls";
import {FormGroup, Validators} from "@angular/forms";
import {TaminStaticDataService} from "../../../../services/tamin-static-data.service/tamin-static-data.service";
import {ActivatedRoute} from "@angular/router";
import {PersonalModel} from "../../../../models/registration/personal.model";
import {EmployeeModel} from "../../../../models/registration/employee-model";

@Component({
  selector: 'app-employee-personal',
  templateUrl: './employee-personal.component.html',
  styleUrls: ['./employee-personal.component.css']
})
export class EmployeePersonalComponent extends TaminPageBaseComponent {

  @ViewChild('job') job: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfIssuance') cityOfIssuance: TaminFieldAutoCompleteDataGridComponent;

  private router: ActivatedRoute;
  public personalFormGroup: FormGroup;
  public relationFormGroup: FormGroup;
  public personalid: string;
  private original_personal: any;
  private original_relation: any;
  private searchParams: SearchParam[];
  private _overlay: any;
  private organizationId: String;
  private workshopId: String;
  private personalModel: PersonalModel;
  public requestid: string;
  constructor(injector: Injector) {
    super(injector);
    // this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.createForm();
    this._initializeCityOfBirth();
    this._initializeCityOfIssuance();
    this._initializeJob();
  }

  loadPageData() {
    if (this.router.snapshot.params['workshopid'] !== null && this.router.snapshot.params['workshopid'] !== undefined) {
      this.workshopId = this.router.snapshot.params['workshopid'];
    }
    if (this.router.snapshot.params['organizationid'] !== null && this.router.snapshot.params['organizationid'] !== undefined) {
      this.organizationId = this.router.snapshot.params['organizationid'];
    }
    if (this.router.snapshot.params['personalid'] !== null && this.router.snapshot.params['personalid'] !== undefined && this.router.snapshot.params['personalid'] !== '-1') {
      this.requestid = this.router.snapshot.params['personalid'];
    }
    if (this.requestid === undefined) {
      this.requestid = null;
    }
    if (this.requestid !== null) {
      this.loadData(this.requestid);
    }
  }


  private createForm() {
    this.personalFormGroup = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]],
      cityOfBirthId: ['', [Validators.required]],
      cityOfIssueId: ['', [Validators.required]],
      nationalId: ['', [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]]
    });
    this.relationFormGroup = this.formBuilder.group({
      dateOfStart: ['', [Validators.required]],
      job: ['', [Validators.required]],
      id:[''],
    });

  }

  private _initializeJob() {
    this.job.searchOperatorType = SearchOperator.EQ;
    this.job.valueField = 'jobCode';
    this.job.displayField = 'jobDescription';
    this.job.searchPattern = '*{term}*';
    this.job.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Job)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('jobCode')
      // .addVisibleColumn({ columnName: 'jobCode', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({columnName: 'jobDescription', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeCityOfBirth() {
    this.cityOfBirth.valueField = 'cityCode';
    this.cityOfBirth.displayField = 'cityName';
    this.cityOfBirth.searchPattern = '*{term}*%';
    this.cityOfBirth.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      /*.addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})*/
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeCityOfIssuance() {
    this.cityOfIssuance.valueField = 'cityCode';
    this.cityOfIssuance.displayField = 'cityName';
    this.cityOfIssuance.searchPattern = '*{term}*';
    this.cityOfIssuance.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      /*.addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})*/
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
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

  loadData(id) {
    this._overlay = this.showOverlay();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'personal.request.id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.RelationWithTamin, 1, 1, this.searchParams, [])
      .then(value => {
debugger;
        this.hideOverlay(this._overlay);
        this.personalModel =value.data.list[0].personal;
        this.personalFormGroup.patchValue(value.data.list[0].personal);
        this.relationFormGroup.patchValue(value.data.list[0]);
        this.original_personal = this.personalFormGroup.getRawValue();
        this.original_relation = this.relationFormGroup.getRawValue();
        this.personalid = value.data.list[0].personal.id;

        this.workshopId = value.data.list[0].workshopId;
        this.organizationId = value.data.list[0].organizationId;
        this.requestid = value.data.list[0].request.id;
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }

  confirmStepOneClick() {
    debugger;
    return new Promise<PersonalModel>((resolve, reject) => {
      if (!this.personalFormGroup.valid) {
        this.markFormGroupAsTouched(this.personalFormGroup);
        reject();
        return;
      }
      if (!this.relationFormGroup.valid) {
        this.markFormGroupAsTouched(this.relationFormGroup);
        reject();
        return;
      }
      const personalvalues = this.personalFormGroup.getRawValue();
      const relationvalues = this.relationFormGroup.getRawValue();
      const dirty = JSON.stringify(this.original_personal) !== JSON.stringify(personalvalues)
        || JSON.stringify(this.original_relation) !== JSON.stringify(relationvalues);

      if (!dirty) {
        resolve(this.personalModel);
        return;
      }
      const personall = {
        id: this.personalid,
        nation: '01',
        countryId: '0001',
        cityOfBirthId: personalvalues.cityOfBirthId,
        cityOfIssueId: personalvalues.cityOfIssueId,
        dateOfBirth: personalvalues.dateOfBirth,
        firstName: personalvalues.firstName,
        lastName: personalvalues.lastName,
        nationalId: personalvalues.nationalId,
      };
      const relation = {
        id: relationvalues.id,
        personal: {id: this.personalid === null ? null : this.personalid},

        organizationId: this.organizationId,
        workshopId: this.workshopId,
        dateOfStart: relationvalues.dateOfStart,
        job: relationvalues.job,

      };
      const model = {
        personal: personall,
        relationWithTamin: relation
      }
      if (this.personalid == null) {
        this.restService.create(Urls.EmployeeRegistration, model)
          .then(resulttt => {
            this.personalModel = (<PersonalModel>resulttt).data;
            this.personalid = this.personalModel.id.toString();
            resolve(this.personalModel);
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
            console.log(error);
            this.showErrorMessageBox('خطا', error.error.data.message);
          });
      } else {
        // this.restService.restUrl =Urls.PersonalPost + '/' + this.personalid;
        this.restService.update(Urls.EmployeeRegistration, this.personalid.toString(), model)
          .then(resulttt => {
            this.personalModel = (<PersonalModel>resulttt).data;
            this.personalid = this.personalModel.id.toString();
            resolve(this.personalModel);
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
            console.log(error);
            this.showErrorMessageBox('خطا', error.error.data.message);
          });
      }
      return true;
    });
  }
}
