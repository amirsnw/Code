import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {PensionRequestComponent} from '../pension-request.component';


@Component({
  selector: 'app-pension-agreement',
  templateUrl: './pension-agreement.component.html',
  styleUrls: ['./pension-agreement.component.css']
})
export class PensionAgreementComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();
  @ViewChild('pensionRequest') pensionRequest: PensionRequestComponent;

  initializePage(): void {
     this.show();
  }
  show() {
    this.theModal.show();
  }
  onAgree() {
    this.redirectTo('/pension-request');
    this.theModal.hide();
    this.agree.emit();
  }
  onDisagree() {
    this.theModal.hide();
    this.disagree.emit();
    this.redirectTo('/me');
  }
}
