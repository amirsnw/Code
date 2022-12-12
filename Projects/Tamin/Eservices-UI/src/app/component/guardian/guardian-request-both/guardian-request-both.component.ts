import {ChangeDetectorRef, Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';

import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Urls} from '../../../settings/urls';
import {GuardianInsInfoComponent} from '../guardian-ins-info/guardian-ins-info.component';
import {GuardianInitializeService} from '../guardian-initialize.service';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-guardian-request',
  templateUrl: './guardian-request-both.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianRequestBothComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private looper;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('guardianInsInfoComponent') guardianInsInfoComponent: GuardianInsInfoComponent;

  @ViewChild('expCityCombo') expCityCombo: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('birthCityCombo') birthCityCombo: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('expCityCombo2') expCityCombo2: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('birthCityCombo2') birthCityCombo2: TaminFieldAutoCompleteDataGridComponent;

  @ViewChild('panel') panel: ElementRef;
  currentUser: any;
  branchWorkshop = [];
  isDisabledConfirm = true;
  isDisabledOffice = false;
  guardianDocumentMissing = false;
  lowerAgeLimit: boolean;
  isSSO: boolean;
  isDisabledSpouse = true;
  firstNameFather: any;
  lastNameFather: any;
  firstNameMother: any;
  lastNameMother: any;

  ssoNationalCode: string;
  ssoTicket: string;

  requestTypeList = [
    {'value': 1, 'name': 'والدین (پدر و مادر)'},
    {'value': 2, 'name': 'پدر'},
    {'value': 3, 'name': 'مادر'},
    {'value': 4, 'name': 'فرزند ذکور از کارافتاده'},
  ];

  @ViewChild('typeCombo') typeCombo: TaminFieldComboBoxStaticComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute, private router: Router, private changeDetector: ChangeDetectorRef,
              private guardianInitService: GuardianInitializeService) {
    super(injector);
    changeDetector.detach();
    this.looper = setInterval(() => {
      try {
        this.changeDetector.checkNoChanges();
      } catch (err) {
        this.changeDetector.detectChanges();
      }
    }, 200);
  }

  protected initializePage(): void {
    this._initializeExpCityCombo();
    this._initializeBirthCityCombo();
    this._initializeExpCityCombo2();
    this._initializeBirthCityCombo2();
    this.lowerAgeLimit = false;
    this.theForm = this.formBuilder.group({
      requestDate: [''],
      nationalIdFather: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), TaminValidators.nationalId]],
      fullNameFather: [''],
      birthDateFather: ['', [Validators.required, Validators.minLength(10)]],
      ageFather: [''],
      insuranceStatusFather: [''],
      nationalIdMother: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), TaminValidators.nationalId]],
      fullNameMother: [''],
      birthDateMother: ['', [Validators.required, Validators.minLength(10)]],
      ageMother: [''],
      insuranceStatusMother: [''],
      requestStatus: [''],
      type: ['', ],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      branchCode: ['', Validators.required],
      requestType: ['', Validators.required],
      expCityCode: ['', [Validators.required]],
      birthCityCode: ['', [Validators.required, ]],
      expCityCode2: ['', [Validators.required]],
      birthCityCode2: ['', [Validators.required]],
      insuredMobile: ['', [Validators.required]]
    });
    this.imageGallery.getUrl = Urls.UploadImage;
    this.imageGallery.saveUrl = Urls.UploadImage;

    this.typeCombo.dataItems = [
      {
        name: 'گواهی پزشک معالج (در صورت عدم احراز شرایط سنی والدین)',
        value: '03'
      },
      {
        name: 'صفحه مشخصات فرزندان شناسنامه پدر',
        value: '07'
      },
      {
        name: 'صفحه مشخصات فرزندان شناسنامه مادر',
        value: '08'
      },
      {
        name: 'صفحه اول شناسنامه بیمه شده اصلی',
        value: '04'
      }
    ];

    this.securityService.getCurrentUser().then(value => {
      // this.currentUser = value ;
      if (value.gender === 'f') {
        this.isDisabledSpouse = false;
        this.requestTypeList.push({'value': 5, 'name': 'همسر'});
      } else {
        this.isDisabledSpouse = true;
      }
    });
  }

  loadPageData() {
    if (this.activeRoute.snapshot.data.nationalCode !== undefined
      && this.activeRoute.snapshot.data.ticket !== undefined) {
      this.isSSO = true;
      this.ssoNationalCode = this.activeRoute.snapshot.data.nationalCode;
      this.ssoTicket = this.activeRoute.snapshot.data.ticket;
      this.guardianInsInfoComponent.isSSO = true;
      this.guardianInsInfoComponent.ssoNationalCode = this.ssoNationalCode;
      this.guardianInsInfoComponent.ssoTicket = this.ssoTicket;
    } else {
      if (this.router.url.includes('sso/guardian')) {
        this.redirectTo('sso/guardian');
        return;
      }
    }
    this.loadBranchData();
    this.securityService.getCurrentUser().then(result => {
      this.theForm.get('insuredMobile').setValue(result.mobile);
    }).catch(error => {
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
      });
    });

    this.guardianInsInfoComponent.loadData();
    this.theForm.get('requestType').setValue(1);
    this.theForm.get('requestType').valueChanges.subscribe(select => {
      let route;
      switch (select) {
        case 1:
          if (this.isSSO) {
            route = this.router.config.find(r => r.path === 'sso');
            route = route.children.find(r => r.path === 'guardian');
            route = route.children.find(r => r.path === 'guardian-request');
            route.data = {nationalCode: this.ssoNationalCode, ticket: this.ssoTicket};
            this.router.navigateByUrl('/sso/guardian/guardian-request');
            break;
          }
          this.router.navigate(['/guardian-request']);
          break;
        case 2:
          if (this.isSSO) {
            route = this.router.config.find(r => r.path === 'sso');
            route = route.children.find(r => r.path === 'guardian');
            route = route.children.find(r => r.path === 'guardian-request-father');
            route.data = {nationalCode: this.ssoNationalCode, ticket: this.ssoTicket};
            this.router.navigateByUrl('/sso/guardian/guardian-request-father');
            break;
          }
          this.router.navigate(['/guardian-request-father']);
          break;
        case 3:
          if (this.isSSO) {
            route = this.router.config.find(r => r.path === 'sso');
            route = route.children.find(r => r.path === 'guardian');
            route = route.children.find(r => r.path === 'guardian-request-mother');
            route.data = {nationalCode: this.ssoNationalCode, ticket: this.ssoTicket};
            this.router.navigateByUrl('/sso/guardian/guardian-request-mother');
            break;
          }
          this.router.navigate(['/guardian-request-mother']);
          break;
        case 4:
          if (this.isSSO) {
            route = this.router.config.find(r => r.path === 'sso');
            route = route.children.find(r => r.path === 'guardian');
            route = route.children.find(r => r.path === 'guardian-request-child');
            route.data = {nationalCode: this.ssoNationalCode, ticket: this.ssoTicket};
            this.router.navigateByUrl('/sso/guardian/guardian-request-child');
            break;
          }
          this.router.navigate(['/guardian-request-child']);
          break;
        case 5:
          if (this.isSSO) {
            route = this.router.config.find(r => r.path === 'sso');
            route = route.children.find(r => r.path === 'guardian');
            route = route.children.find(r => r.path === 'guardian-request-spouse');
            route.data = {nationalCode: this.ssoNationalCode, ticket: this.ssoTicket};
            this.router.navigateByUrl('/sso/guardian/guardian-request-spouse');
            break;
          }
          this.router.navigate(['/guardian-request-spouse']);
          break;
      }
    });

    this.theForm.get('nationalIdFather').valueChanges.subscribe(value => {
      if (this.theForm.get('birthDateMother').valid && this.theForm.get('birthDateFather').valid
        && this.theForm.get('nationalIdMother').valid && this.theForm.get('nationalIdFather').valid) {
        this.isDisabledOffice = false;
      } else {
        this.isDisabledOffice = true;
        this.isDisabledConfirm = true;
      }
    });

    this.theForm.get('birthDateFather').valueChanges.subscribe(value => {
      if (this.theForm.get('birthDateMother').valid && this.theForm.get('birthDateFather').valid
        && this.theForm.get('nationalIdMother').valid && this.theForm.get('nationalIdFather').valid) {
        this.isDisabledOffice = false;
      } else {
        this.isDisabledOffice = true;
        this.isDisabledConfirm = true;
      }
    });

    this.theForm.get('nationalIdMother').valueChanges.subscribe(value => {
      if (this.theForm.get('birthDateMother').valid && this.theForm.get('birthDateFather').valid
        && this.theForm.get('nationalIdMother').valid && this.theForm.get('nationalIdFather').valid) {
        this.isDisabledOffice = false;
      } else {
        this.isDisabledOffice = true;
        this.isDisabledConfirm = true;
      }
    });

    this.theForm.get('birthDateMother').valueChanges.subscribe(value => {
      if (this.theForm.get('birthDateMother').valid && this.theForm.get('birthDateFather').valid
        && this.theForm.get('nationalIdMother').valid && this.theForm.get('nationalIdFather').valid) {
        this.isDisabledOffice = false;
      } else {
        this.isDisabledOffice = true;
        this.isDisabledConfirm = true;
      }
    });

    this.theForm.get('nationalIdFather').setValue('');
    this.theForm.get('birthDateFather').setValue('');
    this.theForm.get('nationalIdMother').setValue('');
    this.theForm.get('birthDateMother').setValue('');


  }

  getOfficeData(): Promise<any> {
    const values = this.theForm.getRawValue();
    if (new Date(values.birthDateFather).getTime() > new Date().getTime() || new Date(values.birthDateMother).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ تولد از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    if (values.birthDateFather === '' && values.nationalIdFather !== '') {
      this.showErrorMessageBox('خطا', 'لطفا تاریخ را به صورت کامل وارد نمایید.');
      return;
    }
    if (values.birthDateMother === '' && values.nationalIdMother !== '') {
      this.showErrorMessageBox('خطا', 'لطفا تاریخ را به صورت کامل وارد نمایید.');
      return;
    }

    let urlFather;
    let urlMother;
    if (values.nationalIdFather !== '') {
      urlFather = values.nationalIdFather + '/' + momentNs.from(new Date(values.birthDateFather).toString(), 'en').locale('fa').format('YYYYMMDD') + '/' + '05';
    } else {
      urlFather = '0' + '/' + 0 + '/' + '05';
    }
    if (values.nationalIdMother !== '') {
      urlMother = values.nationalIdMother + '/' + momentNs.from(new Date(values.birthDateMother).toString(), 'en').locale('fa').format('YYYYMMDD') + '/' + '06';
    } else {
      urlMother = '0' + '/' + 0 + '/' + '06';
    }
    this._overlay = this.showOverlay();

    let searchParams;
    if (this.isSSO) {
      searchParams = new Array<SearchParam>();
      const natParam = new SearchParam();
      natParam.property = 'ssoNationalCode';
      natParam.value = this.ssoNationalCode;
      natParam.operator = SearchOperator.EQUAL;
      searchParams.push(natParam);

      const ticketParam = new SearchParam();
      ticketParam.property = 'ssoTicket';
      ticketParam.value = this.ssoTicket;
      ticketParam.operator = SearchOperator.EQUAL;
      searchParams.push(ticketParam);
    } else {
      searchParams = null;
    }

    return new Promise<any>((resolve, reject) => {
      const theUrl = (this.isSSO ? Urls.GUARDIAN_REQUEST_SSO + '/sso' : Urls.GUARDIAN_REQUEST) + '/' + urlFather + '/' + urlMother;
      this.restService.getAll(theUrl, searchParams)
        .then(value => {
          this.hideOverlay(this._overlay);
          this.theForm.patchValue(value.data);
          if (value.data.registrationOfficeFather !== undefined) {
            this.firstNameFather = value.data.registrationOfficeFather.firstName;
            this.lastNameFather = value.data.registrationOfficeFather.lastName;
            this.theForm.get('fullNameFather').setValue(value.data.registrationOfficeFather.firstName + ' ' + value.data.registrationOfficeFather.lastName);
            this.theForm.get('ageFather').setValue(value.data.registrationOfficeFather.age);
            this.theForm.get('insuranceStatusFather').setValue(value.data.insuredStatusFather === '1' ? 'دارای ارتباط بیمه ای' : 'فاقد ارتباط بیمه ای');
            this.manageForm(value.data.registrationOfficeFather.age, '05', value.data.insuredStatusFather);
          }
          if (value.data.registrationOfficeMather !== undefined) {
            this.firstNameMother = value.data.registrationOfficeMather.firstName;
            this.lastNameMother = value.data.registrationOfficeMather.lastName;
            this.theForm.get('fullNameMother').setValue(value.data.registrationOfficeMather.firstName + ' ' + value.data.registrationOfficeMather.lastName);
            this.theForm.get('ageMother').setValue(value.data.registrationOfficeMather.age);
            this.theForm.get('insuranceStatusMother').setValue(value.data.insuredStatusMather === '1' ? 'دارای ارتباط بیمه ای' : 'فاقد ارتباط بیمه ای');
            this.manageForm(value.data.registrationOfficeMather.age, '06', value.data.insuredStatusMather);
          }
          resolve();
        }).catch(reason => {
        this.hideOverlay(this._overlay);
        this.isDisabledConfirm = true;
        this.isDisabledOffice = false;
        if (reason.error !== undefined && reason.error.data != null && reason.error.data.message !== undefined) {
          if (reason.error.data.message.includes('XML')) {
            this.showErrorMessageBox('پیام سیستم', 'در این لحظه دریافت اطلاعات از ثبت احوال امکانپذیر نیست; دوباره تلاش کنید.');
            return;
          } else {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
            return;
          }
        }
        if (reason.data !== undefined && reason.data.message !== undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.data.message);
          return;
        }
        if (reason.error !== undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error);
          return;
        }
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    });
  }


  manageForm(param: any, relType: any, insuranceStatus: any) {
    if (insuranceStatus === '1') { // hamsar && pedar
      this.isDisabledConfirm = true;
      this.isDisabledOffice = true;
      this.showErrorMessageBox('خطا', 'با توجه به بیمه پرداز بودن فرد، ثبت برقراری کفالت امکان پذیر نمی باشد. ');
      return;
    }
    if (relType === '06' && param < 55) { // madar
      // this.motherLowerAgeLimit = true;
    }
    if ((relType === '05' || relType === '02') && param < 60) { // hamsar && pedar
      this.showInfoMessageBox('با موفقیت دریافت شد', 'با توجه به عدم احراز شرایط سنی پدر لطفا مدارک لازم در خصوص ازکارافتادگی ایشان را بارگذاری نمایید.');
      this.lowerAgeLimit = true;
    } else {
      this.lowerAgeLimit = false;
    }
    this.isDisabledConfirm = false;
    this.isDisabledOffice = true;
  }

  saveData() {
    const missingStatus = this.checkImageMissingStatus();
    if (!this.theForm.valid || missingStatus) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    // if(this.theForm.get('ageMother').value || this.theForm.get('ageFather').value )

    this._overlay = this.showOverlay();
    const data = {
      guardionDocLists: [],
      guardianRelationlistList: [],
      status: '0',
      requestDate: new Date().getTime(),
      address: this.theForm.get('address').value,
      zipCode: this.theForm.get('zipCode').value,
      brchCode: this.theForm.get('branchCode').value,
      insuredMobile: this.theForm.get('insuredMobile').value,
      requestType: '1'
    };

    if (this.theForm.get('nationalIdFather').value !== '') {
      data.guardianRelationlistList.push(
        {
          expCityCode: this.theForm.get('expCityCode').value,
          birthCityCode: this.theForm.get('birthCityCode').value,
          firstName: this.firstNameFather,
          lastName: this.lastNameFather,
          birthDate: momentNs.from(new Date(this.theForm.get('birthDateFather').value).toString(), 'en').locale('fa').format('YYYYMMDD'),
          age: this.theForm.get('ageFather').value,
          natinoalCode: this.theForm.get('nationalIdFather').value,
          isinsured: this.theForm.get('insuranceStatusFather').value === 'بیمه پرداز می باشد' ? '1' : '0',
          depperrelTypeCode: '05',
        }
      );
    }
    if (this.theForm.get('nationalIdMother').value !== '') {
      data.guardianRelationlistList.push(
        {
          expCityCode: this.theForm.get('expCityCode2').value,
          birthCityCode: this.theForm.get('birthCityCode2').value,
          firstName: this.firstNameMother,
          lastName: this.lastNameMother,
          birthDate: momentNs.from(new Date(this.theForm.get('birthDateMother').value).toString(), 'en').locale('fa').format('YYYYMMDD'),
          age: this.theForm.get('ageMother').value,
          natinoalCode: this.theForm.get('nationalIdMother').value,
          isinsured: this.theForm.get('insuranceStatusMother').value === 'بیمه پرداز می باشد' ? '1' : '0',
          depperrelTypeCode: '06',
        }
      );
    }

    this.imageGallery.images.forEach(value => {
      data.guardionDocLists.push(
        {
          documentFile: {id: value.guid},
          docTypeCode: value.tag,
        }
      );
    });

    this.restService.create(this.isSSO ? `${Urls.GUARDIAN_REQUEST_SSO}/${this.ssoNationalCode}/${this.ssoTicket}`
      : Urls.GUARDIAN_REQUEST, data).then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'اطلاعات فرد تحت کفالت با موفقیت ثبت و در نوبت رسیدگی شعبه قرار گرفت و نتیجه توسط پیامک به شما اطلاع رسانی می گردد و همچنین جهت مشاهده وضعیت درخواست می توان به تامین من مراجعه فرمایید. ', () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }


  return() {
    if (this.isSSO) {
      this.redirectTo('sso/thirty-seventy');
    } else {
      this.redirectTo('/');
    }
  }

  private _initializeExpCityCombo() {
    this.expCityCombo.valueField = 'cityCode';
    this.expCityCombo.displayField = 'cityName';
    this.expCityCombo.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
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

  private _initializeBirthCityCombo() {
    this.birthCityCombo.valueField = 'cityCode';
    this.birthCityCombo.displayField = 'cityName';
    this.birthCityCombo.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
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

  private _initializeExpCityCombo2() {
    this.expCityCombo2.valueField = 'cityCode';
    this.expCityCombo2.displayField = 'cityName';
    this.expCityCombo2.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
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

  private _initializeBirthCityCombo2() {
    this.birthCityCombo2.valueField = 'cityCode';
    this.birthCityCombo2.displayField = 'cityName';
    this.birthCityCombo2.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
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

  addImage() {
    const theform = this.theForm.getRawValue();
    if (theform.type == null || theform.type === '') {
      this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
      return;
    }
    this.imageGallery.selectImage(this.gridCellRequestTypeTranslator(theform.type), theform.type);

  }

  gridCellRequestTypeTranslator(item) {
    switch (item) {
      case '03':
        return 'گواهی پزشک معالج';
      case '04':
        return 'صفحه اول شناسنامه بیمه شده اصلی';
      case '07':
        return 'صفحه مشخصات فرزندان شناسنامه پدر';
      case '08':
        return 'صفحه مشخصات فرزندان شناسنامه مادر';
      default:
        return '';
    }
  }

  loadBranchData(): void {
    this._overlay = this.showOverlay(this.panel.nativeElement);
    if (this.isSSO) {
      this.restService.getAll(this.isSSO ? `${Urls.GetActiveBranch_SSO}/${this.ssoNationalCode}/${this.ssoTicket}/guardian`
        : Urls.GetActiveBranch).then(value => {
        this.branchWorkshop = [];
        (<Array<any>>value.data).forEach(item => {
          this.branchWorkshop.push({
            name: item.branchName,
            value: item.branchCode
          });
        });
        if (this.branchWorkshop.length === 1) {
          this.theForm.get('branchCode').setValue(this.branchWorkshop[0].value);
        }
        this.hideOverlay(this._overlay);
      }).catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data && reason.error.data.message) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('sso/guardian');
          });
          return;
        }
        if (reason.data && reason.data.message) {
          this.showErrorMessageBox('پیام سیستم', reason.data.message, () => {
            this.redirectTo('sso/guardian');
          });
          return;
        }
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('sso/guardian');
        });
      });
    } else {
      this.guardianInitService.guardianResult.then(result => {
        this.branchWorkshop = result;
        if (result.length === 1) {
          this.theForm.get('branchCode').setValue(this.branchWorkshop[0].value);
        }
        this.hideOverlay(this._overlay);
      }).catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data && reason.error.data.message) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
          });
          return;
        }
        if (reason.data && reason.data.message) {
          this.showErrorMessageBox('پیام سیستم', reason.data.message, () => {
            this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
          });
          return;
        }
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      });
    }
  }

  private checkImageMissingStatus() {
    this.guardianDocumentMissing = false;
    let bitWize = 0b0000;
    if (this.imageGallery.images.length === 0
      || !this.imageGallery.areAllImagesUploaded()) {
      this.guardianDocumentMissing = true;
      return true;
    } else {
      this.imageGallery.images.forEach(item => {
        switch (item.tag) {
          case '03':
            // tslint:disable-next-line:no-bitwise
            bitWize |= 0B1000;
            break;
          case '04':
            // tslint:disable-next-line:no-bitwise
            bitWize |= 0B0100;
            break;
          case '07':
            // tslint:disable-next-line:no-bitwise
            bitWize |= 0B0010;
            break;
          case '08':
            // tslint:disable-next-line:no-bitwise
            bitWize |= 0B0001;
            break;
        }
      });
      // tslint:disable-next-line:no-bitwise
      if ((bitWize | 0B1000) !== 0B1111 || (this.lowerAgeLimit && (bitWize | 0B0111) !== 0B1111)) {
        this.guardianDocumentMissing = true;
        return true;
      }
      return false;
    }
  }

  protected destroyPage() {
    clearInterval(this.looper);
    this.changeDetector.reattach();
  }
}
