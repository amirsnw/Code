import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminPersianService} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-subdomain-approve',
  templateUrl: './subdomain-approve.component.html',
  styleUrls: ['./subdomain-approve.component.css']
})
export class SubdomainApproveComponent extends TaminPageBaseComponent {
  public formsub: FormGroup;
  @ViewChild('organizationId') organizationId: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('subdomainGrid') subdomainGrid: TaminDataGridComponent;
  public personalId: string;
  private router: ActivatedRoute;
  private _overlay: any;
  searchParams: SearchParam[];

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initialize(personalId) {
    this.loadData(personalId);
  }

  initializePage() {
    this._initializeDataGrid();
    this.createForm();
    this._initializeBranch();


  }

  private createForm() {
    this.formsub = this.formBuilder.group({
      organizationId: ['', [Validators.required]]

    });
  }

  ApproveClick() {

    if (!this.formsub.valid) {
      this.markFormGroupAsTouched(this.formsub);
      this.hideOverlay(this._overlay);
      return;
    }

    const values = this.formsub.getRawValue();
    // if (this.personalId === null || this.personalId === undefined) {
    //   this.personalId = this.router.snapshot.params['personalid'];
    // }
    const searchParams1 = new Array<SearchParam>();
    const searchParam1 = new SearchParam();

    searchParam1.property = 'id';
    searchParam1.value = this.personalId;
    searchParam1.operator = SearchOperator.EQ;
    searchParams1.push(searchParam1);


    this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams1, [])
      .then(value => {
        const requestDetail = {organizationId: values.organizationId};
        this.restService.update(Urls.RegRequestSubPut, value.data.list[0].request.id.toString(), requestDetail)
          .then(result => {

            const massage = 'درخواست شما با کد  ' + result.data.refCode + ' در صف بررسی مرکز قرار گرفته است.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
          })
          .catch(error => {
            this.showErrorMessageBox('خطا', error.error.data.message, () => {
            });
          });
      })
      .catch(error => {
        this.showErrorMessageBox('خطا', error.data.message);
      });
  }

  loadData(personalId: string) {

    this.personalId = personalId;
    this.subdomainGrid.serviceUrl = Urls.PersonalPost;

    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    if (personalId !== null) {
      searchParam.property = 'parentId.id';
      searchParam.value = personalId;

    }
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.subdomainGrid.searchParams = this.searchParams;
    this.subdomainGrid.refreshData();

  }

  private _initializeDataGrid() {
    this.subdomainGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'nationalId', columnCaption: 'کدملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dateOfBirth', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خوانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dependency.dependencyDesc', columnCaption: 'نسبت', columnViewType: 'Label'})
      .setShowActionColumn(false)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
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
}
