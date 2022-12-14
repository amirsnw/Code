import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent, TaminPageBaseComponent, TaminValidators, TaminImageGalleryManagedComponent } from 'tamin-framework';
import { Urls } from '../../../../../settings/urls';
import { TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, SearchOperator, SearchParam, OverlayService } from 'tamin-framework';
import { TaminStaticDataService } from '../../../../../services/tamin-static-data.service/tamin-static-data.service';
import { PersonalModel } from 'src/app/models/registration/personal.model';
import { ActivatedRoute } from '@angular/router';
import { StpUrls } from '../../../../../modules/stp/stp-urls';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-subdomain-no-presence',
  templateUrl: './subdomain-no-presence.component.html',
  styleUrls: ['./subdomain-no-presence.component.css']
})
export class SubdomainNoPresenceComponent extends TaminPageBaseComponent {
  public formpersonalsubNoPresence: FormGroup;
  public personalId: string;

  public restUrlImages;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('dependentTypeCombobox') dependentTypeCombobox: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfBirth') cityOfBirth: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityOfIssue') cityOfIssue: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() closed = new EventEmitter<string>();
  @Output() branchWorkshop: Array<any> = [];
  dependentTypes = [];
  public personalModel: PersonalModel;

  private _subscription = new Subscription();
  private _overlay: any;
  private taminStaticDataService: TaminStaticDataService;
  private router: ActivatedRoute;
  isDisabled = true;
  isDisabledMarriage = true;
  isDisabledIdCard = true;
  isDisabledConfirm = true;
  isDisabledOffice = false;
  agree = false;
  age = false;
  agreeBoy = false;

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.router = injector.get(ActivatedRoute);
  }


  private createForm() {
    this.formpersonalsubNoPresence = this.formBuilder.group({
      lastName: [''],//, [Validators.required, Validators.maxLength(50)]
      firstName: [''],
      fatherName: [''],
      dateOfBirth: ['', [Validators.required]],
      cityOfBirthId: ['', [Validators.required]],
      cityOfIssueId: ['', [Validators.required]],
      dependentType: ['', [Validators.required]],
      nationalId: ['', [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]],
      branchCode: ['', Validators.required]
    });
  }
  /*
  
    get formValues() {
      return this.formpersonalsubNoPresence.getRawValue();
    }
  */


  initializePage() {
     this.loadBranchData();
    this.createForm();
    this._initializeFormGroup();
    this._initializeBaseDependentTypeCombobox();
    this._initializeCityOfBirth();
    this._initializeCityOfIssuance();
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
    this.restUrlImages = Urls.UploadImage;
    

  }
  private _initializeFormGroup() {
    // this._subscription.add(this.formpersonalsubNoPresence.get('dependentType').valueChanges.subscribe(value => {
    // if (value == 1) {
    //   this.isDisabledMarriage = false;
    // } else {
    //   this.isDisabledMarriage = true;
    // }

    // if (value == 2) {//پسر
    //   this.isDisabled = false;
    // } else {
    //   this.isDisabled = true;
    // }
    // if (value == 2 || value == 3) {
    //   this.isDisabledIdCard = true;
    // } else {
    //   this.isDisabledIdCard = false;
    // }
    // this.showAnswer = true;
    // this.answerEnd = this.answer.find(c => c.value === value);
    // this.theForm.get('answer').setValue(this.answerEnd.name);

    // }));
  }
  getOfficeData(): Promise<any> {
    debugger;
    const values = this.formpersonalsubNoPresence.getRawValue();
    if (new Date(values.dateOfBirth).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ تولد از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const item = this.dependentTypeCombobox.theGrid.dataItems.filter(c => c.id === values.dependentType)[0];
    return new Promise<any>((resolve, reject) => {
      var theUrl = Urls.GetSubdominantOffice + '/' + values.nationalId + '/' + new Date(values.dateOfBirth).getTime() + '/' + item.dependencyCode;
      this.restService.getAll(theUrl, null)
        .then(value => {
          this.formpersonalsubNoPresence.patchValue(value.data);
          // this.data = value.data;
          // this.dataLoaded.emit(value.data);
          this.formpersonalsubNoPresence.get('firstName').setValue(value.data.firstName);
          this.formpersonalsubNoPresence.get('lastName').setValue(value.data.lastName);
          this.formpersonalsubNoPresence.get('fatherName').setValue(value.data.fatherName);
          this.manageForm(value.data, values.dependentType);
          // this.loadBranchData();
          resolve();
        }).catch(reason => {
          this.isDisabledConfirm = true;
          this.isDisabledOffice = false;
          this.agree = false;
          this.agreeBoy = false;
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          // reject(reason);
        });
    });
  }
  manageForm(param: any, relType: any) {
    this.isDisabledConfirm = false;
    this.isDisabledOffice = true;
    if (param.age >= 18 && relType === 3) {//taahod name baraye dokhtare balaye 18 sal
      this.agree = true;
    } else {
      this.agree = false;
    }
    if (relType === 2 && param.age >= 19) {//govahie eshteghal baraye pesare balaye 19 sal
      this.age = true;
      this.isDisabled = false;
      this.agreeBoy = true;
    } else {
      this.isDisabled = true;
      this.agreeBoy = false;
    }
    if (relType == 1) {//hamsar
      this.isDisabledMarriage = false;
    } else {
      this.isDisabledMarriage = true;
    }
    if (relType == 2 || relType == 3) {//dokhtar pesar
      this.isDisabledIdCard = true;
    } else {//hamsar pedar madar
      this.isDisabledIdCard = false;
    }
  }
  loadBranchData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.getAll(Urls.GetActiveBranch).then(value => {
        (<Array<any>>value.data).forEach(value1 => {
          this.branchWorkshop.push({
            name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
            value: value1.branchCode
          });
        });
        resolve();
      }).catch(reason => {
        this.isDisabledConfirm = true;
        this.isDisabledOffice = true;
        this.agree = false;
        this.agreeBoy = false;
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
             this.redirectTo('/subdominant');
            });
        // reject(reason);
      });
    });
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
  // ApproveClick() {

  //   if (!this.formsub.valid) {
  //     this.markFormGroupAsTouched(this.formsub);
  //     this.hideOverlay(this._overlay);
  //     return;
  //   }

  //   const values = this.formsub.getRawValue();
  //   // if (this.personalId === null || this.personalId === undefined) {
  //   //   this.personalId = this.router.snapshot.params['personalid'];
  //   // }
  //   const searchParams1 = new Array<SearchParam>();
  //   const searchParam1 = new SearchParam();

  //   searchParam1.property = 'id';
  //   searchParam1.value = this.personalId;
  //   searchParam1.operator = SearchOperator.EQ;
  //   searchParams1.push(searchParam1);


  //   this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams1, [])
  //     .then(value => {
  //       const requestDetail = { organizationId: values.organizationId };
  //       this.restService.update(Urls.RegRequestSubPut, value.data.list[0].request.id.toString(), requestDetail)
  //         .then(result => {

  //           const massage = 'درخواست شما با کد  ' + result.data.refCode + ' در صف بررسی مرکز قرار گرفته است.';
  //           this.showInfoMessageBox('پیام سیستم', massage, () => {
  //             this.redirectTo('/me');
  //           });
  //         })
  //         .catch(error => {
  //           this.showErrorMessageBox('خطا', error.error.data.message, () => {
  //           });
  //         });
  //     })
  //     .catch(error => {
  //       this.showErrorMessageBox('خطا', error.data.message);
  //     });
  // }
  saveData() {
    // this._overlay = this.showOverlay();
    if (!this.formpersonalsubNoPresence.valid) {
      this.markFormGroupAsTouched(this.formpersonalsubNoPresence);
      this.hideOverlay(this._overlay);
      return;
    }
    const values = this.formpersonalsubNoPresence.getRawValue();
    if (new Date(values.dateOfBirth).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ تولد از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const item = this.dependentTypeCombobox.theGrid.dataItems.filter(c => c.id === values.dependentType)[0];
    debugger;
    const personall = {
      id: null,
      nation: '01',
      countryId: '0001',
      cityOfBirthId: values.cityOfBirthId,
      cityOfIssueId: values.cityOfIssueId,
      parentId: { id: null },// { id: this.personalId === '-1' ? null : this.personalId },
      nationalId: values.nationalId,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      bailType: { code: item.reasonCode },
      dependentType: { code: item.dependencyCode },
      dependency: { id: values.dependentType },
      branchCode: this.formpersonalsubNoPresence.get('branchCode').value,
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
    this.showQuestionBox('پیام سیستم', 'اطلاعات فرد تبعی تحت پوشش شما در شعبه ثبت خواهد شد. آیا مطمئن هستید؟', () => {
      this._overlay = this.showOverlay();
      debugger;
      this.restService.create(Urls.PersonalPost, personall)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          debugger;
          this.personalModel = resulttt.data as PersonalModel;
          this.imageGallery.clearImages();
          this.formpersonalsubNoPresence.reset();
          if (this.age) {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت پوشش با موفقیت ثبت شد و گواهی اشتغال به تحصیل فرزند شما با وزارت علوم بررسی خواهد شد', () => {
              this.redirectTo('/subdominant');//koja bereeeee????????????????????
            });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت پوشش با موفقیت ثبت شد', () => {
              this.redirectTo('/subdominant');
                // this.redirectTo('/me');
            });
          }
        })
        .catch(result => {
          debugger;
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('خطا در ثبت اطلاعات', result.error.data.message);
        });
    }, () => {
    });


  }
  return() {
    this.redirectTo('/subdominant');
  }

}
