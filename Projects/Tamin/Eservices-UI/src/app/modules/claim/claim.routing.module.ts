import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListFullOperationComponent} from './insurance-list/pages/list-full-operation/list-full-operation.component';
import {ListDetailsComponent} from './insurance-list/list-details/list-details.component';
import {ListDetailItemRowComponent} from './insurance-list/list-detail-item-row/list-detail-item-row.component';
import {LoadFromFileComponent} from './insurance-list/load-from-file/load-from-file.component';
import {CloneListComponent} from './insurance-list/clone-list/clone-list.component';
import {MenuListComponent} from './insurance-list/new/menu-list/menu-list.component';
import {WorkshopHistoryComponent} from './insurance-list/new/workshop-history/workshop-history.component';
import {InsuranceListNewComponent} from './insurance-list/new/insurance-list-new/insurance-list-new.component';
import {FullFledgedListComponent} from './insurance-list/new/full-fledged-list/full-fledged-list/full-fledged-list.component';
import {FullFledgedListNewComponent} from './insurance-list/new/full-fledged-list/full-fledged-list-new/full-fledged-list-new.component';
import {WorkshopHistoryViewComponent} from './insurance-list/new/workshop-history-view/workshop-history-view.component';
import {UploadFilesComponent} from './insurance-list/new/upload-files/upload-files.component';
import {CreateOnlineListComponent} from './insurance-list/new/online-list/create-online-list/create-online-list.component';
import {EmployeeComponent} from './insurance-list/new/online-list/employee/employee.component';
import {OnlineListDetailsComponent} from './insurance-list/new/online-list/online-list-details/online-list-details.component';
import {DesktopComponent} from './insurance-list/new/desktop/desktop.component';


const routes: Routes = [
  {
    path: 'il',
    children: [
      {path: '', component: MenuListComponent},
      {path: 'workshop-history', component: WorkshopHistoryComponent},
      {path: 'workshop-history/view/:id', component: WorkshopHistoryViewComponent},
      {path: 'insurance-list-new', component: InsuranceListNewComponent},
      {path: 'full-fledged-list', component: FullFledgedListComponent},
      {path: 'full-fledged-list-new', component: FullFledgedListNewComponent},
      {path: 'clone-list', component: CloneListComponent},
      {path: 'menu-list', component: MenuListComponent},
      {path: 'load-from-file', component: LoadFromFileComponent},
      {path: 'load-from-file/:tracecode/:status', component: LoadFromFileComponent},
      {path: 'list-full-operation', component: ListFullOperationComponent},
      {path: 'list-details', component: ListDetailsComponent},
      {path: 'list-details/:listid', component: ListDetailsComponent},
      {path: 'list-details-item-row', component: ListDetailItemRowComponent},
      {path: 'list-details-item-row/:listid', component: ListDetailItemRowComponent},
      {path: 'list-details-item-row/:listid/:listifnoid', component: ListDetailItemRowComponent},
      {path: 'upload-files', component: UploadFilesComponent},
      {path: 'create-online-list', component: CreateOnlineListComponent},
      {path: 'employee/:lid/:liid', component: EmployeeComponent},
      {path: 'online-list-details/:id', component: OnlineListDetailsComponent},
      {path: 'desktop', component: DesktopComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule {
}
