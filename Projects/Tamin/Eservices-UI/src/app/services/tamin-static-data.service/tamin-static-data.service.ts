import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TaminStaticDataService {

  constructor() {
  }

  getBookletRequestTypes() {
    return [
      {name: 'صدور دفترچه برای اولین بار', value: '1'},
      {name: 'تعویض دفترچه بدلیل اتمام نسخ قابل استفاده', value: '2'}
      // {name: 'المثني', value: '3'},
      // {name: 'تامین اعتبار دفترچه دارای برگه و فاقد اعتبار ', value: '4'}
    ];
  }

  getBookletPrintStatus() {
    return [
      {name: 'ثبت درخواست', value: '0'},
      {name: 'صف چاپ', value: '1'},
      {name: 'چاپ شده', value: '2'},
      {name: 'بازگشت درخواست', value: '3'},
      {name: 'تحویل درخواست', value: '4'},
    ];
  }

  getBookletRecieveTypes() {
    return [
      {name: 'حضوری', value: '1'},
      {name: 'توسط پیک', value: '2'}
    ];
  }

  getBookletRecieveTimes() {
    return [
      // {name: '09 - 12', value: '1'},
      // {name: '12 - 15', value: '2'},
      // {name: '15 - 17', value: '3'}
      {name: '9 تا 11 صبح', value: '1'},
      {name: '11 تا 12:30 ظهر', value: '2'},
      {name: '12:30 تا 14:30 بعدازظهر', value: '3'}
    ];
  }

  getGender() {
    return [
      {name: 'مرد', value: '01'},
      {name: 'زن', value: '02'}
    ];
  }

  getPersianMonths() {
    return [
      {name: 'فروردین', value: '1'},
      {name: 'اردیبهشت', value: '2'},
      {name: 'خرداد', value: '3'},
      {name: 'تیر', value: '4'},
      {name: 'مرداد', value: '5'},
      {name: 'شهریور', value: '6'},
      {name: 'مهر', value: '7'},
      {name: 'آبان', value: '8'},
      {name: 'آذر', value: '9'},
      {name: 'دی', value: '10'},
      {name: 'بهمن', value: '11'},
      {name: 'اسفند', value: '12'}
    ];
  }

  getRelationTypes() {
    return [
      {name: 'بیمه شده اجباری', value: '44'},
      {name: 'بیمه شده غیر اجباری', value: '9'},
      // {name: 'تبعی', value: '3'},
      {name: 'کارفرما', value: '52'}
    ];
  }

  getPensionerPaymentTypes() {
    return [
      {name: 'پرداخت ماهانه', value: '01'},
      {name: 'عیدی', value: '03'},
      {name: 'تفاوت افزایش معوقه', value: '08'}
    ];
  }

  getStatus() {
    return [
      {requestDesc: 'مختومه-تایید نهایی', requestCode: '0018'},
      {requestDesc: 'مختومه-عدم تایید', requestCode: '0019'}
    ];
  }

  getPaymentSheetStatus() {
    return [
      {name: 'باطل', value: '1'},
      {name: 'وصول', value: '2'},
      {name: 'موثر', value: '3'}
    ];
  }

  getRequestFAQLimitation() {
    return [
      {name: 'کاربر عادی', value: '1'},
      {name: 'کاربر همکار', value: '2'}
    ];
  }

  getInstitutionType() {
    return [
      {name: 'موسسه انتخابی', value: '1'},
      {name: 'موسسه غیر انتخابی', value: '2'}
    ];
  }

   getBookletِDeliverTypes() {
    return [
      {name: 'کارگزاری رسمی', value: '1'},
      {name: 'شرکت ملی پست', value: '2'},
      {name: 'تیپاکس', value: '3'}
    ];
  }

  getOrganizationType() {
    return [
      {name: 'قوه قضائیه', value: '1'},
      {name: 'وزارت دارایی', value: '2'},
      {name: 'وزارت اطلاعات', value: '3'},
      {name: 'سازمان تامین اجتماعی', value: '4'},
    ];
  }
}
