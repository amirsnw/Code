import {Component, Injector, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {RequestListComponent} from 'src/app/component/request/request-list/request-list.component';
import {
  SearchOperator,
  SearchParam,
  TaminLazyLoadService,
  TaminPageBaseComponent,
  TaminPersianService
} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends TaminPageBaseComponent {

  @ViewChild('requestListComponent') requestListComponent: RequestListComponent;

  constructor(injector: Injector, private router: ActivatedRoute) {
    super(injector);
  }

  loadPageData() {
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.value = '03';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';
    searchParams.push(searchParam);
    if (this.router.snapshot.params['requestid'] !== null && this.router.snapshot.params['requestid'] !== undefined) {
      const requestSearchParam = new SearchParam();
      requestSearchParam.property = 'id';
      requestSearchParam.value = this.router.snapshot.params['requestid'];
      requestSearchParam.operator = SearchOperator.EQ;
      searchParams.push(requestSearchParam);
    }
    this.onSearchSubmit(searchParams);
  }

  onSearchSubmit(param: any) {
    this.requestListComponent.taminDataGrid.searchParams = param;
    this.requestListComponent.taminDataGrid.refreshData();
  }

  backToPanelClick() {
    this.redirectTo('me');
  }
}
