import {Component, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {SsoLogChartComponent} from '../sso-log-chart/sso-log-chart.component';
import {SsoLogChartData, SsoLogChartDataSet} from '../models/sso-log-chart-data';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-log-statistics',
  templateUrl: './sso-log-statistics.component.html',
  styleUrls: ['./sso-log-statistics.component.css']
})
export class SsoLogStatisticsComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  private _overlay: any;
  @ViewChild('chart') chart: SsoLogChartComponent;

  colors = {
    color01: 'rgba(200, 0, 0, 0.7)',
    color02: 'rgba(255, 128, 0, 0.7)',
    color03: 'rgba(0, 200, 0, 0.7)',
    color04: 'rgba(0, 70, 255, 0.7)',
    color05: 'rgba(0, 255, 255, 0.7)',
    color06: 'rgba(0, 255, 0, 0.7)',
    color07: 'rgba(0, 128, 128, 0.7)',
    color08: 'rgba(0, 128, 0, 0.7)',
    color09: 'rgba(0, 0, 255, 0.7)',
    color10: 'rgba(0, 0, 128, 0.7)',
    color11: 'rgba(0, 0, 0, 0.7)'
  };


  types = [
    {name: 'آمار 1', value: 1},
    {name: 'آمار 2', value: 2},
    {name: 'آمار 3', value: 3},
    {name: 'آمار 4', value: 4},
    {name: 'آمار 5', value: 5}
  ];

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      type: [''],
      createdateFrom: ['', Validators.required],
      createdateTo: ['', Validators.required],
    });
  }

  onLoadData() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const searchParams: SearchParam[] = [];

    const searchParam1 = new SearchParam();
    searchParam1.value = (new Date(this.theForm.get('createdateFrom').value)).getTime().toString();
    searchParam1.operator = SearchOperator.EQ;
    searchParam1.property = 'createdateFrom';
    searchParams.push(searchParam1);

    const searchParam2 = new SearchParam();
    searchParam2.value = (new Date(this.theForm.get('createdateTo').value)).getTime().toString();
    searchParam2.operator = SearchOperator.EQ;
    searchParam2.property = 'createdateTo';
    searchParams.push(searchParam2);

    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.SSO_LOG, searchParams)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.buildChart(value.data.list);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
      });
  }

  buildChart(data: Array<any>) {
    debugger;
    data.forEach((item) => {
      item.createdate = item.createdate.substr(0, 4) + '/' + item.createdate.substr(4, 2) + '/' + item.createdate.substr(6, 2);
    });
    const chartData = new SsoLogChartData();
    const dates = this.groupBy(data, createdate => createdate.createdate);
    const services = this.groupBy(data, serviceFName => serviceFName.serviceFName);
    chartData.labels = Array.from(dates.keys());
    chartData.title = 'آمار سرویس ها';
    Array.from(services.keys()).forEach(service => {
      const d = [];
      Array.from(dates.keys()).forEach(date => {
        let sum = 0;
        data.forEach(value => {
          if (value.serviceFName === service && value.createdate === date) {
            sum += value.countOfService;
          }
        });
        d.push(sum);
      });
      chartData.datasets.push(new SsoLogChartDataSet(d, service, this.getRandomColor(), this.getRandomColor()));
    });
    this.chart.drawChart(chartData);
  }


  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  private getRandomColor() {
    const R = Math.floor(Math.random() * 255) + 1;
    const G = Math.floor(Math.random() * 255) + 1;
    const B = Math.floor(Math.random() * 255) + 1;
    return `rgba(${R}, ${G}, ${B}, 0.7)`;
  }


}
