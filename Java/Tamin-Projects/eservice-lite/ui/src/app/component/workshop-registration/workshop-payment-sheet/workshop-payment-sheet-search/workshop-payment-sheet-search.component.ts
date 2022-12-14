import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {OverlayService, TaminFieldComboBoxStaticComponent, TaminPageBaseComponent, TaminPersianService} from 'tamin-framework';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../settings/urls';


@Component({
  selector: 'app-workshop-payment-sheet-search',
  templateUrl: './workshop-payment-sheet-search.component.html',
  styleUrls: ['./workshop-payment-sheet-search.component.css']
})
export class WorkshopPaymentSheetSearchComponent extends TaminPageBaseComponent {
  @Output() output = new EventEmitter<any>();
  searchForm: FormGroup;
  private taminStaticDataService: TaminStaticDataService;
  paymentSheetStatus = [];
  debitReason = [];

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
  }

  protected initializePage(): void {
    this._initializeFromGroup();
    this.paymentSheetStatus = this.taminStaticDataService.getPaymentSheetStatus();
    this.loadServiceDebitReason();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      paymentIdFrom: [''],
      paymentIdTo: [''],
      docDateFrom: [''],
      docDateTo: [''],
      debitReason: [''],
      paymentSheetStatus: ['']
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.output.emit();
  }

  searchFormSubmit(values, valid) {
    this.output.emit(this.searchForm.getRawValue());
  }

  private loadServiceDebitReason() {
    this.restService.getAll(Urls.debitReason)
      .then(value => {
        (<Array<any>>value.data.list).forEach((item) => {
          this.debitReason.push({
            name: item.debitCreateReasonDesc,
            value: item.debitCreateReasonCode
          });
        });
      })
      .catch(reason => {
      });
  }
}
