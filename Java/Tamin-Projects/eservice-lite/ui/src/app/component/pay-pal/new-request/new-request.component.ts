import { Component, OnInit, ViewChild} from '@angular/core';
import { TaminModalComponent } from 'tamin-framework';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {
  @ViewChild('theModal') theModal: TaminModalComponent;

  constructor() { }

  ngOnInit() { }
  show() {
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

}
