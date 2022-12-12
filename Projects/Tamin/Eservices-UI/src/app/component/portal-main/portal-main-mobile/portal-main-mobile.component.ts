import {Component, EventEmitter, isDevMode, Output} from '@angular/core';
import {TaminPageBaseComponent, TaminPersianService} from 'tamin-framework';
import {AppHelper} from 'src/app/settings/app-helper';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-portal-main-mobile',
  templateUrl: './portal-main-mobile.component.html',
  styleUrls: ['./portal-main-mobile.component.css']
})
export class PortalMainMobileComponent extends TaminPageBaseComponent {

  @Output() buttonClicked = new EventEmitter<any>();
  @Output() tagClicked = new EventEmitter<any>();
  @Output() handleMenu = new EventEmitter<any>();

  public historyItems: any;
  public salaryItems: any;
  public lastSalary: any;
  public lastBranch: any;
  public lastWorkshop: any;
  userImage: any;

  protected initializePage(): void {
    if (!AppHelper.isWeb() && !isDevMode() && !this.securityService.checkToken()) {
      this.redirectTo('/login');
    }

    if (this.securityService.getToken() && this.securityService.getCurrentUser()) {
      this.restService.getAll(Urls.USER_PROFILE_IMAGE)
        .then(value1 => {
          if (value1.data) {
            this.userImage = 'data:image/png;base64,' + value1.data;
          } else {
            this.userImage = 'assets/images/icons/user.png';
          }
        })
        .catch(reason => {
          // We don't care if there is no image for the user.
        });
    }

  }


  protected loadPageData(): void {
    this.refreshData();
  }

  refreshData() {
    this.restService.getAll(Urls.CombinedHistoryRequest)
      .then(result => {
        this.historyItems = result.data;
      });
    this.restService.getAll(Urls.SalaryRequest)
      .then(result => {
        this.salaryItems = result.data;
        this.refreshUIValues();
      });
  }

  public onButtonClicked(buttonName) {
    this.buttonClicked.emit(buttonName);
  }

  public onTagClicked(item) {
    this.tagClicked.emit(item);
  }

  public onHandleMenu(item) {
    this.handleMenu.emit(item);
  }

  public getPersianDate(): string {
    return new TaminPersianService().getPersianDate(new Date());
  }

  public getHistory(): string {
    if (this.historyItems !== undefined) {
      return this.historyItems.list[0].historyYears + ' سال و ' + this.historyItems.list[0].historyMonths + ' ماه و ' + this.historyItems.list[0].historyDays + ' روز';
    }
    return '';
  }

  public refreshUIValues() {
    let salary = '0';
    let branch = '';
    let workshop = '';
    if (this.salaryItems !== undefined) {
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage1 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/01' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage1.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage2 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/02' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage2.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage3 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/03' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage3.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage4 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/04' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage4.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage5 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/05' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage5.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage6 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/06' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage6.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage7 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/07' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage7.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage8 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/08' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage8.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage9 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/09' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage9.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage10 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/10' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage10.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage11 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/11' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage11.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
      if (this.salaryItems.list[this.salaryItems.total - 1].hiswage12 !== '0') {
        salary = 'سال و ماه : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hisyear + '/12' + ' مبلغ : ' +
          this.salaryItems.list[this.salaryItems.total - 1].hiswage12.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        branch = this.salaryItems.list[this.salaryItems.total - 1].brhname + ' / ' + this.salaryItems.list[this.salaryItems.total - 1].historytypedesc;
        workshop = this.salaryItems.list[this.salaryItems.total - 1].rwshname;
      }
    }
    this.lastSalary = salary + ' ریال';
    this.lastBranch = branch;
    this.lastWorkshop = workshop;
  }
}
