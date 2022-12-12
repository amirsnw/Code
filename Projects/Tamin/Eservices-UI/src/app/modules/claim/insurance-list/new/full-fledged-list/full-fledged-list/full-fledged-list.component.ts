import { Component, OnInit } from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-full-fledged-list',
  templateUrl: './full-fledged-list.component.html',
  styleUrls: ['./full-fledged-list.component.css']
})
export class FullFledgedListComponent extends TaminPageBaseComponent {
  searchForm: FormGroup;
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
  onResetForm: any;


  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      branchId: [''],
      workshopId: [''],
      statusId: [''],
      stateDate: [''],
      traceCode: ['']
    });

  }

  onSearch() {
    
  }
}
