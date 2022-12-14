import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminSecurityService, TaminValidators} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {ActivatedRoute} from '@angular/router';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {PersonalModel} from 'src/app/models/registration/personal.model';

@Component({
  selector: 'app-registration-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent extends TaminPageBaseComponent {

  public restUrlPersonalPost;
  public restUrlPersonalGet;
  public formpersonalbase: FormGroup;
  public personalid: string;
  public genders;
  private original: any;
  public personalModel: PersonalModel;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfIssuance') cityOfIssuance: TaminFieldAutoCompleteDataGridComponent;
  private searchParams: SearchParam[];
  private _overlay: any;
  private taminStaticDataService: TaminStaticDataService;
  private router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.router = injector.get(ActivatedRoute);
  }

  private createForm() {
    this.formpersonalbase = this.formBuilder.group({
      lastName: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(50)]],
      firstName: [{value: '', disabled: true}, [Validators.maxLength(50)]],
      // fatherName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: [{value: '', disabled: true}, [Validators.required]],
      cityOfBirthId: ['', [Validators.required]],
      cityOfIssueId: ['', [Validators.required]],
      // idCardNumber: ['', [Validators.required, Validators.maxLength(10)]],
      // gender: ['', [Validators.required]],
      nationalId: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]],
    });

  }

  get formValues() {
    return this.formpersonalbase.getRawValue();
  }

  initializePage() {
    this.createForm();
    this._initializeCityOfBirth();
    this._initializeCityOfIssuance();
    this.genders = this.taminStaticDataService.getGender();

  }

  loadPageData() {
    if (this.router.snapshot.params['personalid'] !== null && this.router.snapshot.params['personalid'] !== undefined && this.router.snapshot.params['personalid'] !== '-1') {
      this.personalid = this.router.snapshot.params['personalid'];
    }
    if (this.personalid === undefined) {
      this.personalid = null;
    }
    this.loadData(this.personalid);
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
      .setFirstLoad(true)
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
      .setFirstLoad(true)
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

  confirmStepOneClick() {
    return new Promise<string>((resolve, reject) => {
      if (!this.formpersonalbase.valid) {
        this.markFormGroupAsTouched(this.formpersonalbase);
        reject();
        return;
      }
      const values = this.formpersonalbase.getRawValue();
      const dirty = JSON.stringify(this.original) !== JSON.stringify(values);
      if (!dirty) {
        resolve(this.personalid);
        return;
      }
      const personall = {
        id: this.personalid,
        nation: '01',
        countryId: '0001',
        cityOfBirthId: values.cityOfBirthId,
        cityOfIssueId: values.cityOfIssueId,
        dateOfBirth: values.dateOfBirth,
        // fatherName: values.fatherName,
        firstName: values.firstName,
        // gender: values.gender,
        // idCardNumber: values.idCardNumber,
        lastName: values.lastName,
        nationalId: values.nationalId,
      };
      if (this.personalid == null) {
        this.restService.create(Urls.PersonalPost, personall)
          .then(resulttt => {
            this.personalModel = (<PersonalModel>resulttt).data;
            this.personalid = this.personalModel.id.toString();
            resolve(this.personalid);
          })
          .catch(result => {
            alert(result.error.data.cause);
            reject('');
          });
      } else {
        // this.restService.restUrl =Urls.PersonalPost + '/' + this.personalid;
        this.restService.update(Urls.PersonalPost, this.personalid.toString(), personall)
          .then(resulttt => {
            this.personalModel = resulttt.data as PersonalModel;
            resolve(this.personalid);
          })
          .catch(result => {
            // alert("ttt");
          });
      }
      return true;
    });


  }

  loadData(id) {

    if (id === null) {
      this.securityService.getCurrentUser()
        .then(data => {
          data.nationalId = data.nationalCode;
          this.formpersonalbase.patchValue(data);
          this.formpersonalbase.controls.dateOfBirth.setValue(data.birthDate);
        }).catch(error => {
      });

    } else {
      this._overlay = this.showOverlay();

      this.searchParams = new Array<SearchParam>();
      const searchParam = new SearchParam();
      searchParam.property = 'id';
      searchParam.value = id;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
      this.restService.getPage(Urls.PersonalPost, 1, 10, this.searchParams, [])
        .then(value => {
          this.hideOverlay(this._overlay);
          // console.log(id, ',', value);
          this.formpersonalbase.patchValue(value.data.list[0]);
          // this.formpersonalbase.markAsPristine();
          this.original = this.formpersonalbase.getRawValue();
          this.personalid = value.data.list[0].id;
        })
        .catch(error => {
          this.hideOverlay(this._overlay);
          // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
        });
    }
  }
}
