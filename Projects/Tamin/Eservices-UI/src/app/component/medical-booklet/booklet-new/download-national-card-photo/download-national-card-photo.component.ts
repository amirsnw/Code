import {Component, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-download-national-card-photo',
  templateUrl: './download-national-card-photo.component.html',
  styleUrls: ['./download-national-card-photo.component.css']
})
export class DownloadNationalCardPhotoComponent extends TaminPageBaseComponent {

  theForm: FormGroup;

  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {

    this.theForm = this.formBuilder.group({
      nationalCardSerial: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  open() {
    this.theModal.show();
  }
}
