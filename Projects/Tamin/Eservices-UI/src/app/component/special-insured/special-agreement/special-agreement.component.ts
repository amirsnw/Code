import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaminModalComponent} from 'tamin-framework';

@Component({
  selector: 'app-special-agreement',
  templateUrl: './special-agreement.component.html',
  styleUrls: ['./special-agreement.component.css']
})
export class SpecialAgreementComponent implements OnInit {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();
  public alldisabled = false;
  public fullName : any;

  constructor() {
  }

  ngOnInit() {
  }

  show(data: any) {
    this.fullName = data.firstName + ' ' + data.lastName;
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
