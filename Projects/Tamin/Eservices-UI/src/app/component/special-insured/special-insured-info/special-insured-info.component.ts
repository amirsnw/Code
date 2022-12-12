import {Component, EventEmitter, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {PersonalModel} from '../../../models/registration/personal.model';

declare var alertify: any;

@Component({
  selector: 'app-special-insured-info',
  templateUrl: './special-insured-info.component.html',
  styleUrls: ['./special-insured-info.component.css']
})

export class SpecialInsuredInfoComponent extends TaminPageBaseComponent {
  @Output() personalInfo = new EventEmitter<any>();
  public overlay: any;
  public personalModel: PersonalModel;
  public insuranceId = '';
  public persianBirthDate = '';
  public lastContract: any;
  public mobile = '';
  public cityOfIssueName = '';
  public address = '';
  public zipCode = '';
  public phoneNumber = '';

  initializePage() {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.getRegistrationInfo)

        .then(data => {
          this.hideOverlay(this.overlay);
          if (data.data.total === 0) {
            const message = 'متقاضی محترم ابتدا می بایست اطلاعات خود را در سیستم نانویسی ثبت و شماره بیمه اخذ نمایید.';
            alertify.confirm('پیام سیستم', message, () => {
              alertify.alert('در حال حاضر امکان نامنویسی به صورت غیر حضوری وجود ندارد، لطفا به شعبات مراجعه فرمایید.');
            }, () => {
            }).set({labels: {ok: 'تایید', cancel: 'انصراف'}, padding: '20px'});
          } else {
            if (data.data.personalInfo !== undefined && data.data.personalInfo != null) {
              this.personalModel = data.data.personalInfo as PersonalModel;
              if (data.data.personalInfo.cityOfIssue !== undefined && data.data.personalInfo.cityOfIssue !== null) {
                this.cityOfIssueName = data.data.personalInfo.cityOfIssue.description;
              }
            }
            this.persianBirthDate = this.personalModel != null && this.personalModel.dateOfBirth != null ? this.getPersianDate(this.personalModel.dateOfBirth) : null;
            this.insuranceId = data.data.insuranceId;
            if (data.data.lastContact != null && data.data.lastContact !== undefined) {
              this.lastContract = data.data.lastContact;
              this.mobile = this.lastContract.mobile;
              this.address = this.lastContract.address;
              this.zipCode = this.lastContract.zipCode;
              this.phoneNumber = this.lastContract.phoneNumber;
            }
            this.personalInfo.emit(data.data.personalInfo);
          }
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }

  getPersonalInfo() {
    return this.personalModel;
  }
}
