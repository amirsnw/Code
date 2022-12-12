import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent, TaminPageBaseComponent, TaminValidators, TaminImageGalleryManagedComponent } from 'tamin-framework';
import { Urls } from '../../../../../settings/urls';
import { TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, SearchOperator, SearchParam, OverlayService } from 'tamin-framework';
import { TaminStaticDataService } from '../../../../../services/tamin-static-data.service/tamin-static-data.service';
import { PersonalModel } from 'src/app/models/registration/personal.model';
import { ActivatedRoute } from '@angular/router';
import { SubdominantDocumentComponent } from "../document/subdominant-document.component";
// import { SubdomainListComponent } from "../subdomain-list/subdomain-list.component";
import { StpUrls } from '../../../../../modules/stp/stp-urls';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-subdomain-new',
  templateUrl: './subdomain-new.component.html',
  styleUrls: ['./subdomain-new.component.css']
})
export class SubdomainNewComponent extends TaminPageBaseComponent {
  public formpersonalsub: FormGroup;
  public personalId: string;
  //genders = [];
  private original: any;
  public restUrlImages;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('subdominantDocument') subdominantDocument: SubdominantDocumentComponent;
  @ViewChild('dependentTypeCombobox') dependentTypeCombobox: TaminFieldAutoCompleteDataGridComponent;
  // @ViewChild('bailTypeCombobox') bailTypeCombobox: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfIssue') cityOfIssue: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  // @ViewChild('subdominantList') subdominantList: SubdomainListComponent;

  @Output() closed = new EventEmitter<string>();

  dependentTypes = [];
  public personalModel: PersonalModel;
  private searchParams: SearchParam[];
  private _subscription = new Subscription();
  private _overlay: any;
  private taminStaticDataService: TaminStaticDataService;
  private router: ActivatedRoute;
  isDisabled = true;
  isDisabledMarriage = true;
  private editMode: any;

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.router = injector.get(ActivatedRoute);
  }

  private createForm() {
    this.formpersonalsub = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      // fatherName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      // bailType: ['', [Validators.required]],
      cityOfBirthId: ['', [Validators.required]],
      // certificateSrial: ['', [Validators.required]],
      cityOfIssueId: ['', [Validators.required]],
      /*idCardNumber: ['', [Validators.required]],*/
      dependentType: ['', [Validators.required]],
      nationalId: ['', [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]],

      /*gender: ['', [TaminValidators.requiredNumber]]*/
    });
  }
  /*
  
    get formValues() {
      return this.formpersonalsub.getRawValue();
    }
  */


  initializePage() {
    this.createForm();
    this._initializeFormGroup();
    this._initializeBaseDependentTypeCombobox();
    this._initializeCityOfBirth();
    this._initializeCityOfIssuance();

    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
    this.restUrlImages = Urls.UploadImage;
debugger;
    this.personalId = this.router.snapshot.params['personalId'];

  }
  private _initializeFormGroup() {
    this._subscription.add(this.formpersonalsub.get('dependentType').valueChanges.subscribe(value => {
      if (value == 1) {
        this.isDisabledMarriage = false;
      } else {
        this.isDisabledMarriage = true;
      }
      if (value == 2) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      // this.showAnswer = true;
      // this.answerEnd = this.answer.find(c => c.value === value);
      // this.theForm.get('answer').setValue(this.answerEnd.name);

    }));
  }
  // private _initializeFormGroup() {
  //   this._subscription.add(this.theForm.get('crmReason').valueChanges.subscribe(value => {
  //     if (value == 7 || value == 5) {
  //       this.showImage = true;
  //     } else {
  //       this.showImage = false;
  //     }
  //     this.showAnswer = true;
  //     this.answerEnd = this.answer.find(c => c.value === value);
  //     this.theForm.get('answer').setValue(this.answerEnd.name);

  //   }));
  // }
  loadPageData() {

  }
  //  loadData() {
  //   debugger;
  //   const theUrl = `${FacUrls.SIG_OWNER}/` + this.requestId;
  //   this.restService.getAll(theUrl)
  //     .then(values => {
  //       debugger;
  //       // &&  this.editMode === '1'
  //       if (values.data &&  this.editMode === '1' ) {
  //         this.editForm.patchValue(values.data.list[0]);
  //         this.detStackholdersId = values.data.list[0].detStackholdersId;
  //              }
  //     })
  //     .catch(error => {
  //       this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  //     });
  // }

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

        // this.subdominantList.loadData(this.personalModel.parentId.id.toString());
        this.imageGallery.clearImages();
        this.formpersonalsub.reset();
        // this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت پوشش با موفقیت ثبت شد');
        this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت پوشش با موفقیت ثبت شد', () => {
          this.redirectTo('/subdomain/' + this.personalModel.parentId.id.toString());
        });
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
  return() {
    if (this.personalModel == null) {
      this.redirectTo('/subdomain/-1');
    } else {
      this.redirectTo('/subdomain/' + this.personalModel.parentId.id.toString());
    }
  }
  /*private _initializebaseBailTypesCombobox() {
    this.bailTypeCombobox.valueField = 'code';
    this.bailTypeCombobox.displayField = 'description';
    this.bailTypeCombobox.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.baseBailTypes)
      .setShowPager(true)
      .setFirstLoad(false)
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
  }*/

  // saveData() {
  //   this._overlay = this.showOverlay();
  //   if (!this.formpersonalsub.valid) {
  //     this.markFormGroupAsTouched(this.formpersonalsub);
  //     this.hideOverlay(this._overlay);
  //     return;
  //   }

  //   const values = this.formpersonalsub.getRawValue();
  //   if (new Date(values.dateOfBirth).getTime() > new Date().getTime()) {
  //     this.showErrorMessageBox('خطا', 'تاریخ تولد از تاریخ روز نمی تواند بزرگتر باشد.');
  //     return;
  //   }
  //   const item = this.dependentTypeCombobox.theGrid.dataItems.filter(c => c.id === values.dependentType)[0];

  //   const personall = {
  //     id: null,
  //     nation: '01',
  //     countryId: '0001',
  //     cityOfBirthId: values.cityOfBirthId,
  //     cityOfIssueId: values.cityOfIssueId,
  //     parentId: { id: this.personalId === '-1' ? null : this.personalId },
  //     nationalId: values.nationalId,
  //     firstName: values.firstName,
  //     lastName: values.lastName,
  //     dateOfBirth: values.dateOfBirth,
  //     bailType: { code: item.reasonCode },
  //     dependentType: { code: item.dependencyCode },
  //     dependency: { id: values.dependentType },
  //     requestFileList:[]
  //   };
  //   this.imageGallery.images.forEach(value => {
  //       let type = '';
  //       switch (value.tag) {
  //         case 'image1':
  //           type = '01';
  //           break;
  //         case 'image2':
  //           type = '02';
  //           break;
  //         case 'image3':
  //           type = '03';
  //           break;
  //         case 'image4':
  //           type = '04';
  //           break;
  //         // case 'image5':
  //         //   type = '05';
  //         //   break;
  //         // case 'image6':
  //         //   type = '06';
  //         //   break;
  //         // case 'image7':
  //         //   type = '07';
  //         //   break;
  //         // case 'image8':
  //         //   type = '08';
  //         //   break;
  //       }
  //       personall.requestFileList.push(
  //         {
  //           id: null,
  //           personal:null,// this.personalModel,
  //           documentFile: { id: value.guid },
  //           documentType: type

  //         }
  //       );
  //     });
  //   this.restService.create(Urls.PersonalPost, personall)
  //     .then(resulttt => {
  //       this.hideOverlay(this._overlay);
  //               debugger;
  //       this.personalModel = resulttt.data as PersonalModel;

  //       this.subdominantList.loadData(this.personalModel.parentId.id.toString());
  //          this.subdominantList.newSubdominant=false;
  //       // this.subdominantDocument.personalid =  resulttt.data.id.toString();

  //       // this.subdominantDocument.open(this.personalModel.id.toString());
  //       // this.saveForm();
  //       // this.close(this.personalModel.parentId.id.toString());
  //       // this.router.navigateByUrl('/document/' + this.personalModel.id);
  //     })
  //     .catch(result => {
  //       this.hideOverlay(this._overlay);
  //       alert(result.error.data.cause);
  //     });



  // }


  // open() {
  //   this.formpersonalsub.reset();
  //   this.theModal.show();
  // }

  // close(id: string) {
  //   this.theModal.hide();
  //   this.closed.emit(id);
  // }

  // hasImage(name: string): boolean {
  //   return this.imageGallery.images.filter(c => c.tag == name).length != 0;
  // };




  // initialize(personelid) {
  //   // debugger;
  //   // this.loadData(personelid);
  // }


  // saveForm() {//personalId
  //   return new Promise<string>((resolve, reject) => {
  //     // const documentModelLocal = new DocumentModel();
  //     const ppp = [];
  //     const documentFile = {};
  //     // this.personal.id = this.personalId;
  //     // documentModelLocal.id = null;
  //     // documentModelLocal.personal = this.personalModel;

  //     debugger;
  //     this.imageGallery.images.forEach(value => {
  //       let type = '';
  //       switch (value.tag) {
  //         case 'image1':
  //           type = '01';
  //           break;
  //         case 'image2':
  //           type = '02';
  //           break;
  //         case 'image3':
  //           type = '03';
  //           break;
  //         case 'image4':
  //           type = '04';
  //           break;
  //         // case 'image5':
  //         //   type = '05';
  //         //   break;
  //         // case 'image6':
  //         //   type = '06';
  //         //   break;
  //         // case 'image7':
  //         //   type = '07';
  //         //   break;
  //         // case 'image8':
  //         //   type = '08';
  //         //   break;
  //       }
  //       ppp.push(
  //         {
  //           id: null,
  //           personal: this.personalModel,
  //           documentFile: { id: value.guid },
  //           documentType: type

  //         }
  //       );
  //     });
  //     if (JSON.stringify(this.original) === JSON.stringify(ppp)) {
  //       resolve('true');
  //       return;
  //     }
  //     this.restService.update(Urls.Document, this.personalModel.id.toString(), ppp).then(() => {
  //       resolve('true');
  //     });
  //   });
  // }

  // // loadData(id) {
  // //   // this.imageGallery.images.push();
  // //   debugger;
  // //   this._overlay = this.showOverlay();
  // //   this.searchParams = new Array<SearchParam>();
  // //   const searchParam = new SearchParam();
  // //   searchParam.property = 'personal.id';
  // //   searchParam.value = id;
  // //   searchParam.operator = SearchOperator.EQUAL;
  // //   this.searchParams.push(searchParam);
  // //   this.restService.getPage(Urls.Document, 1, 10, this.searchParams, [])
  // //     .then(value => {
  // //       this.original = value.data.list;
  // //       this.hideOverlay(this._overlay);
  // //       if (value.data.list.length > 0) {
  // //         (<Array<any>>value.data.list).forEach((item) => {
  // //           this.imageGallery.downloadImage(item.documentFile.id, this.getImageTitle(item.documentType), '0', '0', true, this.getTag(item.documentType));
  // //         });
  // //       }
  // //       if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
  // //         this.personalId = value.data.list[0].id.toString();
  // //       }
  // //     })
  // //     .catch(error => {
  // //       this.hideOverlay(this._overlay);
  // //     });
  // // }

  // addImage(title: string, id: string) {
  //   this.imageGallery.selectImage(title, id);
  // }

  // getImageTitle(index) {
  //   switch (index) {
  //     // case '01':
  //     //   return 'تصویر پرسنلی';
  //     // case '02':
  //     //   return 'صفحه اول پرسشنامه';
  //     case '01':
  //       return 'صفحه اول شناسنامه';
  //     case '02':
  //       return 'صفحه دوم شناسنامه';
  //     case '03':
  //       return 'صفحه مراتب عقد در عقدنامه';
  //     case '04':
  //       return 'گواهی اشتغال به تحصیل  ';
  //     // case '05':
  //     //   return 'صفحه اول کارت ملی';
  //     // case '06':
  //     //   return 'صفحه دوم کارت ملی';
  //     // case '07':
  //     //   return 'صفحه توضیحات شناسنامه';
  //     // case '08':
  //     //   return 'صفحه دوم پرسشنامه';
  //   }
  // }

  // getTag(index) {
  //   switch (index) {
  //     case '01':
  //       return 'image1';
  //     case '02':
  //       return 'image2';
  //     case '03':
  //       return 'image3';
  //     case '04':
  //       return 'image4';
  //     // case '05':
  //     //   return 'image5';
  //     // case '06':
  //     //   return 'image6';
  //     // case '07':
  //     //   return 'image7';
  //     // case '08':
  //     //   return 'image8';
  //   }
  // }

}
