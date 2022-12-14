import { Component, OnInit } from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-full-fledged-list-new',
  templateUrl: './full-fledged-list-new.component.html',
  styleUrls: ['./full-fledged-list-new.component.css']
})
export class FullFledgedListNewComponent extends TaminPageBaseComponent{
  newForm: FormGroup;
  months = [
    {name: 'فروردین', value: '01'},
    {name: 'اردیبهشت', value: '02'},
    {name: 'خرداد', value: '03'},
    {name: 'تیر', value: '04'},
    {name: 'مرداد', value: '05'},
    {name: 'شهریور', value: '06'},
    {name: 'مهر', value: '07'},
    {name: 'آبان', value: '08'},
    {name: 'آذر', value: '09'},
    {name: 'دی', value: '10'},
    {name: 'بهمن', value: '11'},
    {name: 'اسفند', value: '12'}
  ];

  protected initializePage(): void {
    this.newForm = this.formBuilder.group({
      workshopCode: [''],
      year: [''],
      month: [''],
      listNumber: [''],
    });

  }

}
