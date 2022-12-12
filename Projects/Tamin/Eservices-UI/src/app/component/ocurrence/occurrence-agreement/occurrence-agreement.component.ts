import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {StpUrls} from '../../../modules/stp/stp-urls';

@Component({
  selector: 'app-occurrence-agreement',
  templateUrl: './occurrence-agreement.component.html',
  styleUrls: ['../main-occurence/main-occurrence.component.css']
})
export class OccurrenceAgreementComponent extends TaminPageBaseComponent {

  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() introApproved = new EventEmitter<boolean>();

  initializePage(): void {
    this.show();
  }

  show() {
    this.theModal.show();
  }

  onAgree() {
    this.introApproved.emit(true);
    this.theModal.hide();
  }

  onDisagree() {
    this.introApproved.emit(false);
    this.theModal.hide();
  }
}

