import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  TaminDataGridConfigurationFactory,
  TaminModalComponent,
  TaminPageBaseComponent,
  TaminDataGridComponent,
  DataColumnViewType,
  PersianNumberPipe
} from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { FormGroup, Validators } from '@angular/forms';
import { WorkshopHistoriesModel } from 'src/app/models/workshop/workshopHistories.model';

@Component({
  selector: 'app-display-info-worker-modal',
  templateUrl: './display-info-worker-modal.component.html',
  styleUrls: ['./display-info-worker-modal.component.css']
})
export class DisplayInfoWorkerModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @Output() refreshData = new EventEmitter<any>();

  private overlay: any;
  // detailErroreForm: FormGroup;
  public workshopHistoriesModel: WorkshopHistoriesModel;
  public persianNumberPipe: PersianNumberPipe;


  initializePage() {
    this.persianNumberPipe = new PersianNumberPipe();
    // this.getPersianDate(new Date())
  }

  show(data: any) {
    this.theModal.width = '70%';
    this.theModal.show();
    this.workshopHistoriesModel=data;
  }

  hide() {
    this.theModal.hide();
  }
}
