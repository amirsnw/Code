import {Injectable} from '@angular/core';
import {ImageModelManaged, SearchOperator, SearchParam, TaminRestService} from 'tamin-framework';
import {Urls} from '../../settings/urls';
import {CordovaHelper} from '../../helpers/cordova-helper';

@Injectable({
  providedIn: 'root'
})
export class StageThreeFormGeneratorService {

  overlay: any;

  constructor(private restService: TaminRestService) { }

  downloadForm4PdfMobile(requestNumber: string, commNationalCode: string, commBirthDate: Date, mainDoctorFirstName: string,
                         mainDoctorLastName: string, mainDoctorSpeciality: string, demandInfoId: number,
                         component: any) {
    if (!requestNumber || !commNationalCode || !commBirthDate || !mainDoctorFirstName
        || !mainDoctorLastName || !mainDoctorSpeciality || !demandInfoId) {
      component.showErrorMessageBox('پیام سیستم', 'اطلاعات تکمیل نشده');
      return;
    }

    const searchParams: Array<SearchParam> = [];
    const searchRequestNum = new SearchParam();
    searchRequestNum.property = 'requestNumber';
    searchRequestNum.operator = SearchOperator.EQUAL;
    searchRequestNum.value = requestNumber;
    searchParams.push(searchRequestNum);

    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchMainDoctorFirstName = new SearchParam();
    searchMainDoctorFirstName.property = 'mainDoctorFirstName';
    searchMainDoctorFirstName.operator = SearchOperator.EQUAL;
    searchMainDoctorFirstName.value = mainDoctorFirstName;
    searchParams.push(searchMainDoctorFirstName);

    const searchMainDoctorLastName = new SearchParam();
    searchMainDoctorLastName.property = 'mainDoctorLastName';
    searchMainDoctorLastName.operator = SearchOperator.EQUAL;
    searchMainDoctorLastName.value = mainDoctorLastName;
    searchParams.push(searchMainDoctorLastName);

    const searchMainDoctorSpeciality = new SearchParam();
    searchMainDoctorSpeciality.property = 'mainDoctorSpeciality';
    searchMainDoctorSpeciality.operator = SearchOperator.EQUAL;
    searchMainDoctorSpeciality.value = mainDoctorSpeciality;
    searchParams.push(searchMainDoctorSpeciality);

    const searchDemandInfoId = new SearchParam();
    searchDemandInfoId.property = 'demandIdInfo';
    searchDemandInfoId.operator = SearchOperator.EQUAL;
    searchDemandInfoId.value = demandInfoId.toString();
    searchParams.push(searchDemandInfoId);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeMainPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form4 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm4PdfDesktop(requestNumber: string, commNationalCode: string, commBirthDate: Date, mainDoctorFirstName: string,
                          mainDoctorLastName: string, mainDoctorSpeciality: string, demandInfoId: number,
                          component: any) {
    if (!requestNumber || !commNationalCode || !commBirthDate || !mainDoctorFirstName
      || !mainDoctorLastName || !mainDoctorSpeciality || !demandInfoId) {
      component.showErrorMessageBox('پیام سیستم', 'اطلاعات تکمیل نشده');
      return;
    }

    const searchParams: Array<SearchParam> = [];
    const searchRequestNum = new SearchParam();
    searchRequestNum.property = 'requestNumber';
    searchRequestNum.operator = SearchOperator.EQUAL;
    searchRequestNum.value = requestNumber;
    searchParams.push(searchRequestNum);

    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchMainDoctorFirstName = new SearchParam();
    searchMainDoctorFirstName.property = 'mainDoctorFirstName';
    searchMainDoctorFirstName.operator = SearchOperator.EQUAL;
    searchMainDoctorFirstName.value = mainDoctorFirstName;
    searchParams.push(searchMainDoctorFirstName);

    const searchMainDoctorLastName = new SearchParam();
    searchMainDoctorLastName.property = 'mainDoctorLastName';
    searchMainDoctorLastName.operator = SearchOperator.EQUAL;
    searchMainDoctorLastName.value = mainDoctorLastName;
    searchParams.push(searchMainDoctorLastName);

    const searchMainDoctorSpeciality = new SearchParam();
    searchMainDoctorSpeciality.property = 'mainDoctorSpeciality';
    searchMainDoctorSpeciality.operator = SearchOperator.EQUAL;
    searchMainDoctorSpeciality.value = mainDoctorSpeciality;
    searchParams.push(searchMainDoctorSpeciality);

    const searchDemandInfoId = new SearchParam();
    searchDemandInfoId.property = 'demandIdInfo';
    searchDemandInfoId.operator = SearchOperator.EQUAL;
    searchDemandInfoId.value = demandInfoId.toString();
    searchParams.push(searchDemandInfoId);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeMainPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form4 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadHospitalFormPdfMobile(nationalCode: string, commBirthDate: Date, hospitalName: string,
                               requestNumber: string, demandIdInfo: any, index: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = nationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchHospitalName = new SearchParam();
    searchHospitalName.property = 'hospitalName';
    searchHospitalName.operator = SearchOperator.EQUAL;
    searchHospitalName.value = hospitalName;
    searchParams.push(searchHospitalName);

    const searchRequestNumber = new SearchParam();
    searchRequestNumber.property = 'requestNumber';
    searchRequestNumber.operator = SearchOperator.EQUAL;
    searchRequestNumber.value = requestNumber + '/' + ++index;
    searchParams.push(searchRequestNumber);

    const searchDemandIdInfo = new SearchParam();
    searchDemandIdInfo.property = 'demandIdInfo';
    searchDemandIdInfo.operator = SearchOperator.EQUAL;
    searchDemandIdInfo.value = demandIdInfo;
    searchParams.push(searchDemandIdInfo);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeHospitalPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form5 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadHospitalFormPdfDesktop(commNationalCode: string, commBirthDate: Date, hospitalName: string,
                                 requestNumber: string, demandIdInfo: any, index: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchHospitalName = new SearchParam();
    searchHospitalName.property = 'hospitalName';
    searchHospitalName.operator = SearchOperator.EQUAL;
    searchHospitalName.value = hospitalName;
    searchParams.push(searchHospitalName);

    const searchRequestNumber = new SearchParam();
    searchRequestNumber.property = 'requestNumber';
    searchRequestNumber.operator = SearchOperator.EQUAL;
    searchRequestNumber.value = requestNumber + '/' + ++index;
    searchParams.push(searchRequestNumber);

    const searchDemandIdInfo = new SearchParam();
    searchDemandIdInfo.property = 'demandIdInfo';
    searchDemandIdInfo.operator = SearchOperator.EQUAL;
    searchDemandIdInfo.value = demandIdInfo;
    searchParams.push(searchDemandIdInfo);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeHospitalPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form5 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm1PdfMobile(commNationalCode: string, commBirthDate: Date, insuranceNumber: string,
                              requestNumber: string, demandIdInfo: any, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchInsuranceNumber = new SearchParam();
    searchInsuranceNumber.property = 'insuranceNumber';
    searchInsuranceNumber.operator = SearchOperator.EQUAL;
    searchInsuranceNumber.value = insuranceNumber;
    searchParams.push(searchInsuranceNumber);

    const searchRequestNumber = new SearchParam();
    searchRequestNumber.property = 'requestNumber';
    searchRequestNumber.operator = SearchOperator.EQUAL;
    searchRequestNumber.value = requestNumber;
    searchParams.push(searchRequestNumber);

    const searchDemandIdInfo = new SearchParam();
    searchDemandIdInfo.property = 'demandIdInfo';
    searchDemandIdInfo.operator = SearchOperator.EQUAL;
    searchDemandIdInfo.value = demandIdInfo;
    searchParams.push(searchDemandIdInfo);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeDoctorPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form1 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm1PdfDesktop(commNationalCode: string, commBirthDate: Date, insuranceNumber: string,
                               requestNumber: string, demandIdInfo: any, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchCommBirthDate = new SearchParam();
    searchCommBirthDate.property = 'commBirthDate';
    searchCommBirthDate.operator = SearchOperator.EQUAL;
    searchCommBirthDate.value = commBirthDate.getTime().toString();
    searchParams.push(searchCommBirthDate);

    const searchInsuranceNumber = new SearchParam();
    searchInsuranceNumber.property = 'insuranceNumber';
    searchInsuranceNumber.operator = SearchOperator.EQUAL;
    searchInsuranceNumber.value = insuranceNumber;
    searchParams.push(searchInsuranceNumber);

    const searchRequestNumber = new SearchParam();
    searchRequestNumber.property = 'requestNumber';
    searchRequestNumber.operator = SearchOperator.EQUAL;
    searchRequestNumber.value = requestNumber;
    searchParams.push(searchRequestNumber);

    const searchDemandIdInfo = new SearchParam();
    searchDemandIdInfo.property = 'demandIdInfo';
    searchDemandIdInfo.operator = SearchOperator.EQUAL;
    searchDemandIdInfo.value = demandIdInfo;
    searchParams.push(searchDemandIdInfo);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeDoctorPdfForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form1 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm6(nationalCode: string, centralCommissionId: any, demandInfoId: any, component: any) {
    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchCentralCommission = new SearchParam();
    searchCentralCommission.property = 'centralCommissionId';
    searchCentralCommission.operator = SearchOperator.EQUAL;
    searchCentralCommission.value = centralCommissionId;
    searchParams.push(searchCentralCommission);

    const searchDemandId = new SearchParam();
    searchDemandId.property = 'demandIdInfo';
    searchDemandId.operator = SearchOperator.EQUAL;
    searchDemandId.value = demandInfoId;
    searchParams.push(searchDemandId);

    this.overlay = component.showOverlay();
    this.restService.getAll(Urls.MedicalCommitteePollPdfForm, searchParams).then(value => {
      return this.restService.getAll(Urls.UploadImage + `/${value.data}/156/0`);
    }).then(image => {
      component.hideOverlay(this.overlay);
      image.data = 'data:application/png;base64,' + image.data;
      const a = document.createElement('a');
      a.href = image.data;
      a.download = 'form' + component.getPersianDate(new Date()) + '.png';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadDefectiveLetters(letterScanId: number, nationalCode: string, demandIdInfo: string, docType: number, component: any) {
    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchLetterScanId = new SearchParam();
    searchLetterScanId.property = 'letterScanId';
    searchLetterScanId.operator = SearchOperator.EQUAL;
    searchLetterScanId.value = letterScanId.toString();
    searchParams.push(searchLetterScanId);

    const searchDemandId = new SearchParam();
    searchDemandId.property = 'demandIdInfo';
    searchDemandId.operator = SearchOperator.EQUAL;
    searchDemandId.value = demandIdInfo;
    searchParams.push(searchDemandId);

    const searchDocumentTypeId = new SearchParam();
    searchDocumentTypeId.property = 'documentTypeId';
    searchDocumentTypeId.operator = SearchOperator.EQUAL;
    searchDocumentTypeId.value = docType.toString();
    searchParams.push(searchDocumentTypeId);

    this.overlay = component.showOverlay();
    this.restService.getAll(Urls.MedicalCommitteeMissDocForm, searchParams).then(value => {
      return this.restService.getAll(Urls.UploadImage + `/${value.data}/156/0`);
    }).then(image => {
      component.hideOverlay(this.overlay);
      image.data = 'data:application/png;base64,' + image.data;
      const a = document.createElement('a');
      a.href = image.data;
      a.download = 'form' + component.getPersianDate(new Date()) + '.png';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadFinancialPdfMobile(nationalCode: string, birthDate: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = birthDate.toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeFinancialForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form1 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadFinancialPdfDesktop(nationalCode: string, birthDate: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = birthDate.toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeFinancialForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form1 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadFinalPdfMobile(nationalCode: string, birthDate: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = birthDate.toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeFinalForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form1 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadFinalPdfDesktop(nationalCode: string, birthDate: number, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = birthDate.toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeFinalForm, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form1 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadMissDoc(nationalCode: string, demandIdInfo: any, letterScanId: any, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchDemandInfoId = new SearchParam();
    searchDemandInfoId.property = 'demandIdInfo';
    searchDemandInfoId.operator = SearchOperator.EQUAL;
    searchDemandInfoId.value = demandIdInfo.toString();
    searchParams.push(searchDemandInfoId);

    const searchletterScanId = new SearchParam();
    searchletterScanId.property = 'letterScanId';
    searchletterScanId.operator = SearchOperator.EQUAL;
    searchletterScanId.value = letterScanId.toString();
    searchParams.push(searchletterScanId);

    const searchDocumentTypeId = new SearchParam();
    searchDocumentTypeId.property = 'documentTypeId';
    searchDocumentTypeId.operator = SearchOperator.EQUAL;
    searchDocumentTypeId.value = '69';
    searchParams.push(searchDocumentTypeId);

    this.overlay = component.showOverlay();
    this.restService.getAll(Urls.MedicalCommitteeMissDocForm, searchParams).then(value => {
      return this.restService.getAll(Urls.UploadImage + `/${value.data}/69/0`);
    }).then(image => {
      component.hideOverlay(this.overlay);
      image.data = 'data:application/png;base64,' + image.data;
      const a = document.createElement('a');
      a.href = image.data;
      a.download = 'miss-doc-form' + component.getPersianDate(new Date()) + '.png';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm9PdfMobile(nationalCode: string, birthDate: Date, branchName: string, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBranchName = new SearchParam();
    searchBranchName.property = 'branchName';
    searchBranchName.operator = SearchOperator.EQUAL;
    searchBranchName.value = branchName;
    searchParams.push(searchBranchName);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = Number(birthDate.getTime()).toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeForm9, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const fileName = 'form1 ' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          component.showInfoMessageBox('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          });
        })
        .catch(reason => {
          component.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }

  downloadForm9PdfDesktop(nationalCode: string, birthDate: Date, branchName: string, component: any) {

    const searchParams: Array<SearchParam> = [];
    const searchNationalCode = new SearchParam();
    searchNationalCode.property = 'nationalCode';
    searchNationalCode.operator = SearchOperator.EQUAL;
    searchNationalCode.value = nationalCode;
    searchParams.push(searchNationalCode);

    const searchBranchName = new SearchParam();
    searchBranchName.property = 'branchName';
    searchBranchName.operator = SearchOperator.EQUAL;
    searchBranchName.value = branchName;
    searchParams.push(searchBranchName);

    const searchBirthdate = new SearchParam();
    searchBirthdate.property = 'birthDate';
    searchBirthdate.operator = SearchOperator.EQUAL;
    searchBirthdate.value = Number(birthDate.getTime()).toString();
    searchParams.push(searchBirthdate);

    this.overlay = component.showOverlay();
    this.restService.getBlob(Urls.MedicalCommitteeForm9, searchParams).then(value => {
      component.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'form1 ' + component.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      component.hideOverlay(this.overlay);
      component.showErrorMessageBox('پیام سیستم', component.constants.getNetworkErrorMessage());
    });
  }
}
