import {Component, ElementRef, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-portal-user-profile',
  templateUrl: './portal-user-profile.component.html',
  styleUrls: ['./portal-user-profile.component.css']
})
export class PortalUserProfileComponent extends TaminPageBaseComponent {

  data = {
    fullName: '',
    nationalCode: '',
    mobile: '',
    email: '',
    gender: '',
    creationDate: '',
    placeOfBirth: '',
    status: ''
  };
  private _overlay: any;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('userImage') userImage: ElementRef;

  protected initializePage(): void {
  }


  setUserImage(image) {
    this.userImage.nativeElement.src = image;
  }


  show() {
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.USER_PROFILE)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.data.fullName = value.data.list[0].firstName + ' ' + value.data.list[0].lastName;
        this.data.nationalCode = this.getPersianNumber(value.data.list[0].nationalCode);
        this.data.mobile = this.getPersianNumber(value.data.list[0].mobile);
        this.data.email = value.data.list[0].email === 'test@test.test' ? '' : value.data.list[0].email;
        this.data.gender = value.data.list[0].gender === 'm' ? 'مرد' : 'زن';
        this.data.creationDate = this.getPersianNumber(value.data.list[0].creationDateFarsi);
        this.data.placeOfBirth = '';
        if (value.data.list[0].userDetail &&
          value.data.list[0].userDetail.geoUnit &&
          value.data.list[0].userDetail.geoUnit.parent &&
          value.data.list[0].userDetail.geoUnit.parent.parent &&
          value.data.list[0].userDetail.geoUnit.parent.parent.title) {
          this.data.placeOfBirth += value.data.list[0].userDetail.geoUnit.parent.parent.title + ' - ';
        }

        if (value.data.list[0].userDetail &&
          value.data.list[0].userDetail.geoUnit &&
          value.data.list[0].userDetail.geoUnit.parent.title) {
          this.data.placeOfBirth += value.data.list[0].userDetail.geoUnit.parent.title + ' - ';
        }

        if (value.data.list[0].userDetail &&
          value.data.list[0].userDetail.geoUnit &&
          value.data.list[0].userDetail.geoUnit.title) {
          this.data.placeOfBirth += value.data.list[0].userDetail.geoUnit.title;
        }

        switch (value.data.list[0].status) {
          case 'Active':
            this.data.status = 'فعال';
            break;
          case 'Deleted':
            this.data.status = 'حذف شده';
            break;
          case 'Disabled':
            this.data.status = 'غیرفعال';
            break;
        }
        this.theModal.show();
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

}
