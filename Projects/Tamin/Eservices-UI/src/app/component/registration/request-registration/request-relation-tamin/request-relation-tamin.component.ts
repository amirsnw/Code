import {Component, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Subscription} from 'rxjs';
import {RelationWithTaminModel} from 'src/app/models/registration/RelationWithTamin.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-request-relation-tamin',
  templateUrl: './request-relation-tamin.component.html',
  styleUrls: ['./request-relation-tamin.component.css']
})
export class RequestRelationTaminComponent extends TaminPageBaseComponent {

  public restUrlrequestrelationtamin;
  private _subscription = new Subscription();
  showWorkshop: boolean;
  public relationWithTaminModel: RelationWithTaminModel;
  public personalId: string;
  public refcode: string;
  private router: ActivatedRoute;
  private id: number;
  private original: any;
  public requestrelationtaminform: FormGroup;
  relationWithTamins = [];
  @ViewChild('organizationId') organizationId: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('workshopId') workshopId: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('rwitc') rwitc: TaminFieldComboBoxStaticComponent;
  @ViewChild('job') job: TaminFieldAutoCompleteDataGridComponent;
  private _overlay: any;
  private searchParams: SearchParam[];
  private taminStaticDataService: TaminStaticDataService;


  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.router = injector.get(ActivatedRoute);
  }

  private createForm() {
    this.requestrelationtaminform = this.formBuilder.group({
      organizationId: ['', [Validators.required]],
      workshopId: [''],
      relationWithTamin: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]],
      job: [''],
    });
  }

  get formValues() {
    return this.requestrelationtaminform.getRawValue();
  }


  initialize(personalId) {
    this.createForm();
    this._initializeBranch();
    this._initializeWorkshopCode();
    this._initializeJob();
    this.relationWithTamins = this.taminStaticDataService.getRelationTypes();

    this.requestrelationtaminform.get('relationWithTamin').setValue(this.relationWithTamins[0].name);
    this.onChanges();
    if (personalId === null || personalId === undefined) {
      this.personalId = this.router.snapshot.params['personalid'];

      this.loadData(this.personalId);

    } else if (personalId !== -1) {
      this.personalId = personalId;
      this.loadData(this.personalId);
    }
    this.rwitc.itemRenderer = (data) => {
      if (`${data.value}` === '44') {
        return `<p>${data.name}</p>` + `<div class="hint"><i class="icon-lightbulb"></i><p>افرادی که در کارگاه یا شرکتی استخدام شده و می خواهند از طریق محل کار خود بیمه شوند.</p></div>`;

      } else if (`${data.value}` === '9') {
        return `<p>${data.name}</p>` + `<div class="hint"><i class="icon-lightbulb"></i><p>افرادی که فاقد شغل یا دارای شغل آزاد می باشند و می خواهند شخصا بیمه شوند.</p></div>`;
      } else {
        return `<p>${data.name}</p>` + `<div class="hint"><i class="icon-lightbulb"></i><p>صاحب کار/مدیر و ... که از محل کار خود حقوق و دستمزد دریافت نمی کنند.</p></div>`;

      }
    };
  }

  private _initializeBranch() {
    this.organizationId.valueField = 'code';
    this.organizationId.displayField = 'name';
    this.organizationId.searchPattern = '%{term}%';
    this.organizationId.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesAll)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchAddress', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
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

  private _initializeWorkshopCode() {
    this.workshopId.searchOperatorType = SearchOperator.EQ;
    this.workshopId.valueField = 'workshopId';
    this.workshopId.displayField = 'workshopName';
    this.workshopId.searchPattern = '{term}';
    this.workshopId.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.workshop)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('workshopId')
      // .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام', columnViewType: 'Label'})
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

  onChanges() {
    this._subscription.add(this.requestrelationtaminform.get('relationWithTamin').valueChanges.subscribe(val => {
      switch (val) {
        case '44':
          this.showWorkshop = true;
          break;
        case '9':
          this.showWorkshop = false;
          break;
        case '52':
          this.showWorkshop = true;
          break;
        default:
          this.showWorkshop = false;
      }
    }));
  }

  confirmStepOneClick(personalId): Promise<string> {
    if (personalId === null || personalId === undefined) {
      personalId = this.personalId;
    }

    return new Promise<string>((resolve, reject) => {
      if (!this.requestrelationtaminform.valid) {
        this.markFormGroupAsTouched(this.requestrelationtaminform);
        reject();
        return;
      }
      const values = this.requestrelationtaminform.getRawValue();
      const dirty = JSON.stringify(this.original) !== JSON.stringify(values);
      if (!dirty) {
        resolve(this.personalId);
        return;
      }
      if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
        this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
        reject(false);
        return;
      }

      if (!this.showWorkshop) {
        values.workshopId = null;
        values.job = null;
        values.workshopName = null;
      } else if (values.workshopId !== null && values.workshopId !== '') {
        // const item = this.workshopId.theGrid.dataItems.filter(c => c.workshopId === values.workshopId)[0];

        values.workshopName = this.workshopId.inputElement.nativeElement.value;
        // values.workshopId = item.workshopId;
      }

      if (values.organizationId.code !== undefined) {
        values.organizationId = values.organizationId.code;
      }
      const personal = {};
      values.personal = personal;
      values.personal.id = personalId === '-1' ? null : personalId;
      values.id = this.id;
      if (this.id == null) {
        // this.genericRestServiceLocal.restUrl = this.restUrlrequestrelationtamin;
        this.restService.create(Urls.RelationWithTamin, values)
          .then(resulttt => {
            this.relationWithTaminModel = resulttt.data as RelationWithTaminModel;
            this.personalId = this.relationWithTaminModel.personal.id.toString();
            this.id = this.relationWithTaminModel.id;
            resolve(this.personalId);
          })
          .catch(result => {
            // alert(result.error.data.cause);
            reject('');
          });
      } else {
        // this.genericRestServiceLocal.restUrl = this.restUrlrequestrelationtamin + '/' + this.personalId;
        this.restService.update(Urls.RelationWithTamin, this.id.toString(), values)
          .then(resulttt => {
            this.relationWithTaminModel = resulttt.data as RelationWithTaminModel;
            this.id = this.relationWithTaminModel.id;
            this.personalId = this.relationWithTaminModel.personal.id.toString();
            resolve(this.personalId);
            // this.NextFormClick();
          })
          .catch(result => {
            reject('');
            // alert(result.error.data.cause);
          });
      }
    });
  }


  loadData(personalId: string) {
    this.id = null;
    this._overlay = this.showOverlay();
    // this.genericRestServiceLocal.restUrl = this.restUrlrequestrelationtamin;
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    if (personalId !== null) {
      searchParam.property = 'personal.id';
      searchParam.value = personalId;
    }
    searchParam.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.RelationWithTamin, 1, 10, this.searchParams, [])
      .then(value => {
        this.hideOverlay(this._overlay);
        const relationWithTamin = value.data.list[0].relationWithTamin;
        value.data.list[0].relationWithTamin = relationWithTamin.toString();
        this.id = value.data.list[0].id;
        this.requestrelationtaminform.patchValue(value.data.list[0]);
        this.original = this.requestrelationtaminform.getRawValue();
        if (value.data.list[0] !== undefined && value.data.list[0] != null) {
          this.personalId = value.data.list[0].personal.id;
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }
}
