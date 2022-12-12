import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {FacUrls} from '../../fac-urls';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent  extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private taminStaticDataService: TaminStaticDataService;
  private _overlay: any;
  private requestId: string;
  private nationalCode: string;
  loadCompleted = false;
  @ViewChild('panel') panel: ElementRef;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
  }
  protected initializePage(): void {
    debugger;
    this.requestId = this.route.snapshot.params['id'];
    this.nationalCode = this.route.snapshot.params['nationalCode'];
    this._initializeDataGrid();
    }
  private _initializeDataGrid() {
      debugger;
    const theUrl = `${FacUrls.AUDIT_ALL_REQ_PORTAL}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
        .clearActionColumns()
        .clearSearchParams()
        .clearSortParams()
        .clearVisibleColumns()
        .setFirstLoad(false)
        .addUrl(theUrl)
        .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
        .addVisibleColumn({columnName: 'portalFormId', columnCaption: 'نام فرم ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceFormDescTranslator})
        .addVisibleColumn({columnName: 'formStatus', columnCaption: 'وضعيت اطلاعات', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceStatusTranslator})
        .setPagerCurrentPage(1)
        .setPagerSize(21)
        .setRowDeletable(false)
        .setRowEditable(false)
        .setShowActionColumn(false)
        .setActionColumnCaption('مشاهده و اصلاح اطلاعات')
        .addActionColumn({
          columnName: 'onForms',
          columnCaption: 'مشاهده و اصلاح اطلاعات',
          columnViewType: 'Button',
          icon: '',
          columnIconUrl: '',
          columnActionName: 'onForms',
          isActionAuthorized: false,
          visible: true,
          enable: true

        })
        .setPagerCurrentPage(1)
        .setPagerSize(21)
        .setRowDeletable(false)
        .setRowEditable(false)
        .setShowActionColumn(true)
        .setShowFooter(false)
        .setShowPager(true)
        .setViewType('GridView')
        .setFirstLoad(true)
        .getData();

      this.dataGrid.actionRenderer = (item, actionCells) => {
        const result = [];
        result.push(actionCells.find(c => c.columnActionName === 'onForms'));
        return result;
      };
     this.dataGrid.cellRenderer = (item, column) => {
       debugger;
       if (item.formStatus === '3') {
         // this.dataGrid.cellStyler(item , column);
       } else if (item.formStatus === '2') {
           // this.dataGrid.cellStyler(item , column);
         }
        return {handled: false, data: ''};
      };
    this.dataGrid.rowStyler = ( item ) => {
      if (item.formStatus === '3') {
        return {
          'color': 'green',
          'font-weight': 'bold'
        };
      } else if (item.formStatus === '2') {
        return {
          'color': 'orange',
          'font-weight': 'bold'
        };
      }
    };

    }
   gridCellServiceStatusTranslator(item) {
    switch (item) {
      case '1':
        return 'اقدام نشده';
      case '2':
        return 'در دست اقدام';
      case '3':
        return 'تکمیل شده';
      default:
        return 'نامشخص';
    }
  }
  gridCellServiceFormDescTranslator(item) {
    switch (item) {
     default:
        return item.formDesc;
    }
  }
  loadData() {
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this._overlay = this.showOverlay(this.panel.nativeElement);
      this.dataGrid.serviceUrl = `${FacUrls.AUDIT_ALL_REQ_PORTAL}/${this.requestId}`;
      this.dataGrid
        .refreshData()
        .then(value => {
          debugger;
          this.hideOverlay(this._overlay);
          this.loadCompleted = true;
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject(reason);
        });
    });
  }
  onView(data) {
      debugger;
      switch ( data.item.portalFormId.orderId - 1 ) {
        case 0 :
          this.redirectTo('/fac/infHaghighiHoghoghi/' + this.requestId);
          break;
        case 1 :
          this.redirectTo('/fac/detStackholders/' + this.requestId);
          break;
        case 2 :
          this.redirectTo('/fac/responsible/' + this.requestId);
          break;
        case 3 :
          this.redirectTo('/fac/infoSubWorkshop/' + this.requestId);
          break;
        case 4 :
          this.redirectTo('/fac/detTaxLocation/' + this.requestId);
          break;
        case 5 :
          this.redirectTo('/fac/companyAccountPeriod/' + this.requestId);
          break;
        case 6 :
          this.redirectTo('/fac/detRequestAuditors/' + this.requestId);
          break;
        case 7 :
          this.redirectTo('/fac/aloReqDetCheckedPeriod/' + this.requestId);
          break;
        case 8 :
          this.redirectTo('/fac/yearsSpec/' + this.requestId);
          break;
        case 9 :
          this.redirectTo('/fac/profitLoss/' + this.requestId);
          break;
        case 10 :
          this.redirectTo('/fac/stock/' + this.requestId);
          break;
        case 11 :
          this.redirectTo('/fac/contractAcc/' + this.requestId);
          break;
        case 12 :
          this.redirectTo('/fac/prepayAndDeposit/' + this.requestId);
          break;
        case 13 :
          this.redirectTo('/fac/administrativeCharges/' + this.requestId);
          break;
        case 14 :
          this.redirectTo('/fac/finanCost/' + this.requestId);
          break;
        case 15 :
          this.redirectTo('/fac/saleAndDispedCharges/' + this.requestId);
          break;
        case 16 :
          this.redirectTo('/fac/salarCost/' + this.requestId);
          break;
        case 17 :
          this.redirectTo('/fac/reserves/' + this.requestId);
          break;
        case 18 :
          this.redirectTo('/fac/fixedAssets/' + this.requestId);
          break;
        case 19 :
          this.redirectTo('/fac/conContra/' + this.requestId);
          break;
        case 20 :
          this.redirectTo('/fac/incomeCont/' + this.requestId);
          break;
       }
    }
  }

