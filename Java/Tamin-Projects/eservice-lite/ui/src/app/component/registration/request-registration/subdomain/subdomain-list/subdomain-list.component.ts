import { Component, Injector, ViewChild } from '@angular/core';
import { DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminValidators, TaminImageGalleryManagedComponent, TaminFieldAutoCompleteDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent } from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';
import { SubdomainNewComponent } from '../subdomain-new/subdomain-new.component';
import { SubdomainApproveComponent } from '../subdomain-approve/subdomain-approve.component';
import { SubdominantDocumentComponent } from "../document/subdominant-document.component";
import { Urls } from '../../../../../settings/urls';
import { TaminStaticDataService } from '../../../../../services/tamin-static-data.service/tamin-static-data.service';
import { PersonalModel } from 'src/app/models/registration/personal.model';
import { FormGroup, Validators } from '@angular/forms';
import { StpUrls } from '../../../../../modules/stp/stp-urls';
@Component({
  selector: 'app-registration-subdomain-list',
  templateUrl: './subdomain-list.component.html',
  styleUrls: ['./subdomain-list.component.css']
})
export class SubdomainListComponent extends TaminPageBaseComponent {
  @ViewChild('subdomainGrid') subdomainApprove: SubdomainApproveComponent;
  @ViewChild('subdomainGrid') subdomainGrid: TaminDataGridComponent;
  @ViewChild('subdomainNew') subdomainNew: SubdomainNewComponent;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('dependentTypeCombobox') dependentTypeCombobox: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfIssue') cityOfIssue: TaminFieldAutoCompleteDataGridComponent;

  searchParams: SearchParam[];
  newSubdominant = false;
  private personalId: string;
  private router: ActivatedRoute;
  private _overlay: any;
  isVisibleConfirm = true;
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);

  }
  dependentTypes = [];
  public personalModel: PersonalModel;
  private taminStaticDataService: TaminStaticDataService;
  public formpersonalsub: FormGroup;
  private original: any;
  public restUrlImages;


  initializePage() {
    this._initializeDataGrid();
    this.createForm();

    this._initializeBaseDependentTypeCombobox();
    this._initializeCityOfBirth();
    this._initializeCityOfIssuance();
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
    this.restUrlImages = Urls.UploadImage;

  }
  private createForm() {
    this.formpersonalsub = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]],
      cityOfBirthId: ['', [Validators.required]],
      cityOfIssueId: ['', [Validators.required]],
      dependentType: ['', [Validators.required]],
      nationalId: ['', [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]],

    });
  }
  initialize(personalId) {
    this.personalId = personalId;
    if (personalId === null || personalId === undefined) {
      this.personalId = this.router.snapshot.params['personalid'];
      this.loadData(this.personalId);
    } else if (personalId !== -1) {
      this.personalId = personalId;
      this.loadData(personalId);
    }
  }

  private _initializeDataGrid() {
    this.subdomainGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'nationalId', columnCaption: 'کدملی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'dateOfBirth', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.PersianDate })
      .addVisibleColumn({ columnName: 'firstName', columnCaption: 'نام', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'dependency.dependencyDesc', columnCaption: 'نسبت', columnViewType: 'Label' })
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      },
    )
      //   .addActionColumn({
      //     columnName: 'addDoc',
      //     columnCaption: 'بارگزاری مدارک',
      //     columnViewType: 'Button',
      //     columnIconUrl: '',
      //     icon: '',
      //     columnActionName: 'addDoc',
      //     isActionAuthorized: false,
      //     visible: true,
      //     enable: true
      //   },
      // )
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.subdomainGrid.afterRefreshData.subscribe(() => {
      if (this.subdomainGrid.dataItems.length > 0) {
        this.personalId = this.subdomainGrid.dataItems[0].parentId.id;
        this.subdomainApprove.personalId=this.personalId;
      }else{

        this.redirectTo('/subdominant-new/' + this.personalId);
      }
    });
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(Urls.PersonalPost+"/delete", param.item.id.toString()).then(value => {
            this.hideOverlay(this._overlay);
            this.loadData(this.personalId);
          }).catch(error => {
            this.hideOverlay(this._overlay);
          });
        }, () => {
        });
        break;
      case 'addDoc':
        //   this.subdominantDocument.personalid = param.item.id.toString();
        //   this.subdominantDocument.open(this.subdominantDocument.personalid);
        break;
    }
  }

  loadData(personalId: string) {
    debugger;
    this.personalId = personalId;
    this.subdomainGrid.serviceUrl = Urls.PersonalPost;

    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    if (personalId !== null && personalId != '-1') {
      searchParam.property = 'parentId.id';
      searchParam.value = personalId;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
      this.subdomainGrid.searchParams = this.searchParams;
    }
    this.subdomainGrid.refreshData();

    // debugger;
    // this.personalId = this.subdomainGrid.dataItems[0].parentid.id;

  }

  NextFormClick() {
    // this.newSubdominant = true;
    this.redirectTo('/subdominant-new/' + this.personalId);

  }
  hasImage(name: string): boolean {
    return this.imageGallery.images.filter(c => c.tag == name).length != 0;

  };
  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
  }

  getImageTitle(index) {
    switch (index) {
      case '03':
        return 'صفحه اول شناسنامه';
      case '04':
        return 'صفحه دوم شناسنامه';
      case '10':
        return 'صفحه مراتب عقد در عقدنامه';
      case '09':
        return 'گواهی اشتغال به تحصیل  ';
    }
  }

  getTag(index) {
    switch (index) {
      case '09':
        return 'image1';
      case '10':
        return 'image2';
      case '03':
        return 'image3';
      case '04':
        return 'image4';
    }
  }
  saveData() {
    this._overlay = this.showOverlay();
    if (!this.formpersonalsub.valid) {
      this.markFormGroupAsTouched(this.formpersonalsub);
      this.hideOverlay(this._overlay);
      return;
    }

    const values = this.formpersonalsub.getRawValue();
    if (new Date(values.dateOfBirth).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ تولد از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const item = this.dependentTypeCombobox.theGrid.dataItems.filter(c => c.id === values.dependentType)[0];

    const personall = {
      id: null,
      nation: '01',
      countryId: '0001',
      cityOfBirthId: values.cityOfBirthId,
      cityOfIssueId: values.cityOfIssueId,
      parentId: { id: this.personalId === '-1' ? null : this.personalId },
      nationalId: values.nationalId,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      bailType: { code: item.reasonCode },
      dependentType: { code: item.dependencyCode },
      dependency: { id: values.dependentType },
      requestFileList: []
    };
    this.imageGallery.images.forEach(value => {
      let type = '';
      switch (value.tag) {
        case 'image1':
          type = '03';
          break;
        case 'image2':
          type = '04';
          break;
        case 'image3':
          type = '10';
          break;
        case 'image4':
          type = '09';
          break;
      }
      personall.requestFileList.push(
        {
          id: null,
          personal: null,// this.personalModel,
          documentFile: { id: value.guid },
          documentType: type

        }
      );
    });
    this.restService.create(Urls.PersonalPost, personall)
      .then(resulttt => {
        this.hideOverlay(this._overlay);
        debugger;
        this.personalModel = resulttt.data as PersonalModel;

        this.loadData(this.personalModel.parentId.id.toString());
        this.imageGallery.clearImages();
        this.formpersonalsub.reset();
        this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت پوشش با موفقیت ثبت شد');
        // this.newSubdominant = false;
        // this.subdominantDocument.personalid =  resulttt.data.id.toString();

        // this.subdominantDocument.open(this.personalModel.id.toString());
        // this.saveForm();
        // this.close(this.personalModel.parentId.id.toString());
        // this.router.navigateByUrl('/document/' + this.personalModel.id);
      })
      .catch(result => {
        debugger;
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('خطا در ثبت اطلاعات', result.error.data.message);
        // alert(result.error.data.cause);
      });



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
      .addVisibleColumn({ columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label' })
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
    this.cityOfIssue.valueField = 'cityCode';
    this.cityOfIssue.displayField = 'cityName';
    this.cityOfIssue.searchPattern = '*{term}*';
    this.cityOfIssue.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label' })
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

  private _initializeBaseDependentTypeCombobox() {
    this.dependentTypeCombobox.valueField = 'id';
    this.dependentTypeCombobox.displayField = 'dependencyDesc';
    this.dependentTypeCombobox.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BaseDependencytypes)
      .setShowPager(false)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'dependencyDesc', columnCaption: 'نسبت', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }


}


