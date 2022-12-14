import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-guardion-agreement',
  templateUrl: './guardion-agreement.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianAgreementComponent extends TaminPageBaseComponent {

  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();

  initializePage(): void {
    this.show();
  }

  show() {
    this.theModal.show();
  }

  onAgree() {
    this.redirectTo('/guardian-request');
    this.theModal.hide();
    this.agree.emit();
  }

  onDisagree() {
    this.theModal.hide();
    this.disagree.emit();
    this.redirectTo('/');
  }
}
