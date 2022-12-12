import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  PersianNumberPipe, SearchOperator, SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup, Validators} from "@angular/forms";
import {SsoSubdominantInfoComponent} from "../../sso-wage-assignment/sso-subdominant-info/sso-subdominant-info.component";
import {WageAssignmentBranchModel} from "../../../../../../models/pensioner/wageAssignmentBranch.model";
import {ActivatedRoute} from "@angular/router";
import {Urls} from "../../../../../../settings/urls";
import {SubdominantModel} from "../../../../../../models/pensioner/subdominant.model";

@Component({
  selector: 'app-sso-subdominant-view',
  templateUrl: './sso-subdominant-view.component.html',
  styleUrls: ['./sso-subdominant-view.component.css']
})
export class SsoSubdominantViewComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;
  @ViewChild('dependency') dependency: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('subdominantComponent') subdominantComponent: SsoSubdominantInfoComponent;
  private _overlay: any;
  private subdominantModel: SubdominantModel;
  private router: ActivatedRoute;
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  protected initializePage(): void {
    debugger;
    this.createForm();
    this._initializeDependency();
  }

  loadPageData() {
    debugger;
    if (this.router.snapshot.params['id'] !== null && this.router.snapshot.params['id'] !== undefined) {
      this.loadData(this.router.snapshot.params['id']);
    }
    else{
      this.subdominantModel=new SubdominantModel();
    }
  }


  private createForm() {
    this.viewForm = this.formBuilder.group({
      dependency: ['',[Validators.required]],
      nationalId: ['', [Validators.required]],
      birthDate: ['',[Validators.required]],
      pensionerId: ['',[Validators.required]],
      pensionerNationalId: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      id: ['',[Validators.required]],
    });
  }

  private _initializeDependency() {
    this.dependency.valueField = 'code';
    this.dependency.displayField = 'description';
    this.dependency.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.DEPENDENCY_TYPE)
      .setShowPager(true)
      .setFirstLoad(true)
      .setId('code')

      .addVisibleColumn({columnName: 'description', columnCaption: 'نسبت', columnViewType: DataColumnViewType.Label})

      .setPagerCurrentPage(1)
      .setPagerSize(50)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }
  confirmClick(values) {
    debugger;

    debugger;
    this._overlay = this.showOverlay();
    if (values.id == null || values.id == '') {
      this.restService.create(Urls.FAMILY_INFO, values)
        .then(resulttt => {
          this.hideOverlay(this._overlay);



          this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ثبت شد.', () => {
            this.redirectTo('/sso/subdominant/list');
          });


        })
        .catch(result => {
          debugger;
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', result.error.data.message);
        });
    }
    else {
      this.restService.update(Urls.FAMILY_INFO,values.id .toString(), values)
        .then(resulttt => {
          this.hideOverlay(this._overlay);



          this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ثبت شد.', () => {
            this.redirectTo('/sso/subdominant/list');
          });
        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', result.error.data.message);
        });
    }
  }
  loadData(id) {
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    this.restService.getById(Urls.FAMILY_INFO, id.toString())
      .then(value => {

        this.hideOverlay(this._overlay);

        this.viewForm.patchValue(value.data);
        //this.viewForm.get('dependency').setValue(this.wageAssignmentModel.bank.bankName);


      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }

}
