import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {RequestFaqNewComponent} from './request-faq-new/request-faq-new.component';
import {RequestFaqSearchComponent} from './request-faq-search/request-faq-search.component';
import {RequestFaqModel} from '../../../models/faq/requestFaq.model';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-request-faq',
  templateUrl: './request-faq.component.html',
  styleUrls: ['./request-faq.component.css']
})
export class RequestFaqComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('faqNew') faqNew: RequestFaqNewComponent;
  @ViewChild('answerModal') answerModal: TaminModalComponent;
  @ViewChild('requestFaqSearch') requestFaqSearch: RequestFaqSearchComponent;
  answer = '';
  edit: RequestFaqModel;
  id = '';


  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.REQUEST_FAQ)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'requestType.description', columnCaption: 'نوع درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'requestStatus.requestDesc', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'question', columnCaption: 'سوال', columnViewType: DataColumnViewType.Label})
      // .addVisibleColumn({columnName: 'reply', columnCaption: 'جواب', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'answer',
        columnCaption: 'نمایش پاسخ',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: 'icon-show',
        columnActionName: 'answer',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: 'icon-edit',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();

  }

  protected loadPageData(): void {
    this.dataGrid.refreshData();
  }

  dataGridItemSelect(data: any) {
    this.answer = data.reply;
    const toBeSaved = new RequestFaqModel();
    toBeSaved.question = data.question;
    toBeSaved.reply = data.reply;
    toBeSaved.requestStatus = data.requestStatus;
    toBeSaved.requestType = data.requestType;
    this.edit = toBeSaved;
    this.id = data.id;


  }

  onDataGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {
      case 'answer':
        this.answerModal.show();
        break;
      case 'edit':
        this.faqNew.open(this.id);
        break;
      case 'delete':
        break;
    }
  }

  onSearch(filter: any) {
    this.dataGrid.searchParams = [];
    this.dataGrid.searchParams = filter;
    this.dataGrid.refreshData();
  }
}
