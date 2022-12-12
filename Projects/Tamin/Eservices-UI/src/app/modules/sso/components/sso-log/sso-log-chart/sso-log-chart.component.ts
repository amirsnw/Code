import {Component, ElementRef, Injector, Input, ViewChild} from '@angular/core';
import {TaminLazyLoadService, TaminPageBaseComponent} from 'tamin-framework';
import {SsoLogChartData} from '../models/sso-log-chart-data';

declare let Chart: any;


@Component({
  selector: 'app-sso-log-chart',
  templateUrl: './sso-log-chart.component.html',
  styleUrls: ['./sso-log-chart.component.css']
})
export class SsoLogChartComponent extends TaminPageBaseComponent {
  @Input() chartType = 'bar';
  private _overlay: any;
  private _chart: any;
  title: string;
  @ViewChild('canvas') canvas: ElementRef;

  constructor(injector: Injector, private taminLazyLoadService: TaminLazyLoadService) {
    super(injector);
  }


  protected initializePage(): void {
  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.taminLazyLoadService.loadJs('assets/chartjs/Chart.js')
      .toPromise()
      .then(value => {
        this.taminLazyLoadService.loadCss('assets/chartjs/Chart.min.css').toPromise()
          .then(value1 => {
            this.hideOverlay(this._overlay);
            this._chart = new Chart(this.canvas.nativeElement, {
              type: this.chartType
            });
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  drawChart(data: SsoLogChartData) {
    this._chart.options = {
      title: {
        display: true,
        text: data.title,
        fontFamily: 'main-font'
      },
      tooltip: {
        titleFontFamily: 'main-font',
        bodyFontFamily: 'main-font',
        footerFontFamily: 'main-font',
      },
      legend: {
        display: true,
        position: 'right',
        label: {
          fontFamily: 'main-font'
        },
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    };

    this._chart.data = {
      labels: data.labels,
      datasets: data.datasets
    };

    this._chart.update();
  }
}
