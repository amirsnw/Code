import { Component, ViewChild } from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {PensionSelfInquiryListComponent} from './pension-self-inquiry-list/pension-self-inquiry-list.component';


@Component({
  selector: 'app-pension-self-inquiry',
  templateUrl: './pension-self-inquiry.component.html',
  styleUrls: ['./pension-self-inquiry.component.css']
})
export class PensionSelfInquiryComponent extends TaminPageBaseComponent {

  @ViewChild('pensionSelfInquiryListComponent') pensionSelfInquiryListComponent: PensionSelfInquiryListComponent;

}
