import {Component, Input} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent extends TaminPageBaseComponent {
  @Input() image: string;
  @Input() targetUrl: string;
}
