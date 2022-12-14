import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent} from 'tamin-framework';

@Component({
  selector: 'app-history-onjection-agreement',
  templateUrl: './history-onjection-agreement.component.html',
  styleUrls: ['./history-onjection-agreement.component.css']
})
export class HistoryOnjectionAgreementComponent implements OnInit {

  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.theModal.show();
  }

  onAgree() {
    this.theModal.hide();
    this.agree.emit();
  }

  onDisagree() {
    this.theModal.hide();
    this.disagree.emit();
  }

}
