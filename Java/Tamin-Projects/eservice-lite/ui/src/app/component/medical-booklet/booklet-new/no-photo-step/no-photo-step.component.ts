import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-no-photo-step',
  templateUrl: './no-photo-step.component.html',
  styleUrls: ['./no-photo-step.component.css']
})
export class NoPhotoStepComponent extends TaminPageBaseComponent{
  @Output() nextStep = new EventEmitter<any>();
}
