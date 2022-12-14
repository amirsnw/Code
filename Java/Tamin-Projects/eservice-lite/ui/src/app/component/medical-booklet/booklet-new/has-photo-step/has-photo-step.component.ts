import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-has-photo-step',
  templateUrl: './has-photo-step.component.html',
  styleUrls: ['./has-photo-step.component.css']
})
export class HasPhotoStepComponent extends TaminPageBaseComponent {
  @Input() photoSource;
  @Output() nextStep = new EventEmitter<Boolean>();
  @Output() prevStep = new EventEmitter<any>();

  initialize(photoSource: any) {
    this.photoSource = photoSource;
  }
}
