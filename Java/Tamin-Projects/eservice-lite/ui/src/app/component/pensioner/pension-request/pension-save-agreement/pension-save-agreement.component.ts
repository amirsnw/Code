import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent} from 'tamin-framework';

@Component({
  selector: 'app-pension-save-agreement',
  templateUrl: './pension-save-agreement.component.html',
  styleUrls: ['./pension-save-agreement.component.css']
})
export class PensionSaveAgreementComponent implements OnInit {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  show() {
    this.theModal.show();
  }

  onAgreeSave() {
    this.theModal.hide();
    this.agree.emit();
  }

  onDisagreeSave() {
    this.theModal.hide();
    this.disagree.emit();
  }
}
