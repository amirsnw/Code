import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {DownloadNationalCardPhotoComponent} from '../download-national-card-photo/download-national-card-photo.component';

@Component({
  selector: 'app-booklet-photo-check',
  templateUrl: './booklet-photo-check.component.html',
  styleUrls: ['./booklet-photo-check.component.css']
})
export class BookletPhotoCheckComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  hasPhoto = false;
  imageSource: any;
  private recieverFullName: any;
  private recieverNationalId: any;
  @ViewChild('userPhoto') userPhoto: ElementRef;
  @ViewChild('downloadNationalCardPhoto') downloadNationalCardPhoto: DownloadNationalCardPhotoComponent;
  @Output() nextStep = new EventEmitter<any>();

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      serial: ['']
    });
  }

  setUserData(recieverFullName, recieverNationalId) {
    this.recieverFullName = recieverFullName;
    this.recieverNationalId = recieverNationalId;
    const thrUrl = Urls.BookletPhoto + '?identityCode=' + this.recieverNationalId + '&serialNumber=123';
    this.restService.getAll(thrUrl)
      .then(value => {
        this.hasPhoto = value.data;
        this.changeDetectorRef.detectChanges();
        const theUrl = `${Urls.BookletPicture}?nationalId=${this.recieverNationalId}&serialNumber=`;
        this.restService.getAll(theUrl)
          .then(data => {
            this.imageSource = 'data:image/jpeg;base64,' + data.data;
          })
          .catch(error => {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });

  }

}
