import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent} from "tamin-framework";

@Component({
  selector: 'app-wage-assignment-agreement',
  templateUrl: './wage-assignment-agreement.component.html',
  styleUrls: ['./wage-assignment-agreement.component.css']
})
export class WageAssignmentAgreementComponent implements OnInit {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();
  data: any;


  constructor() {
  }

  ngOnInit() {
  }

  show(data: any) {
    this.data = data;
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
