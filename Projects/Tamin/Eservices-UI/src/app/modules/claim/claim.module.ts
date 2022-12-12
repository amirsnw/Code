import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaminFrameworkModule} from 'tamin-framework';
import {ClaimRoutingModule} from './claim.routing.module';
import {PursueListComponent} from './insurance-list/pages/pursue-list/Pursue-listComponent';
import {ListFullOperationComponent} from './insurance-list/pages/list-full-operation/list-full-operation.component';
import {ListFullOperationModalComponent} from './insurance-list/pages/list-full-operation/list-full-operation-modal/list-full-operation-modal.component';
import {ListDetailsComponent} from './insurance-list/list-details/list-details.component';
import {ListDetailItemRowComponent} from './insurance-list/list-detail-item-row/list-detail-item-row.component';
import {ListDetailItemRowModalComponent} from './insurance-list/list-detail-item-row/list-detail-item-row-modal/list-detail-item-row-modal.component';
import {LoadFromFileComponent} from './insurance-list/load-from-file/load-from-file.component';
import {UploadFromFileComponent} from './insurance-list/load-from-file/upload-from-file/upload-from-file.component';
import {LoadFormFileDisplayedComponent} from './insurance-list/load-from-file/load-form-file-displayed/load-form-file-displayed.component';
import {ProcessingFormComponent} from './insurance-list/load-from-file/processing-form/processing-form.component';
import {DisplayErrorModalComponent} from './insurance-list/load-from-file/load-form-file-displayed/display-error-modal/display-error-modal.component';
import {UploadFileModelComponent} from './insurance-list/pages/pursue-list/upload-file-model/upload-file-model.component';
import {ErroreListModalComponent} from './insurance-list/pages/pursue-list/errore-list-modal/errore-list-modal.component';
import {DisplayInfoWorkerModalComponent} from './insurance-list/load-from-file/load-form-file-displayed/display-info-worker-modal/display-info-worker-modal.component';
import {CloneListComponent} from './insurance-list/clone-list/clone-list.component';
import {CloneListSearchComponent} from './insurance-list/clone-list/clone-list-search/clone-list-search.component';
import {CloneListModalComponent} from './insurance-list/clone-list/clone-list-modal/clone-list-modal.component';
import {CloneListListComponent} from './insurance-list/clone-list/clone-list-list/clone-list-list.component';
import {MenuListComponent} from './insurance-list/new/menu-list/menu-list.component';
import {WorkshopHistoryComponent} from './insurance-list/new/workshop-history/workshop-history.component';
import {InsuranceListNewComponent} from './insurance-list/new/insurance-list-new/insurance-list-new.component';
import {FullFledgedListComponent} from './insurance-list/new/full-fledged-list/full-fledged-list/full-fledged-list.component';
import {FullFledgedListNewComponent} from './insurance-list/new/full-fledged-list/full-fledged-list-new/full-fledged-list-new.component';
import {WorkshopHistoryViewComponent} from './insurance-list/new/workshop-history-view/workshop-history-view.component';
import {MainComponent} from './insurance-list/pages/main/main.component';
import {SectionComponent} from './insurance-list/new/menu-list/section/section.component';
import {UploadFilesComponent} from './insurance-list/new/upload-files/upload-files.component';
import {CreateOnlineListComponent} from './insurance-list/new/online-list/create-online-list/create-online-list.component';
import {EmployeeComponent} from './insurance-list/new/online-list/employee/employee.component';
import {OnlineListDetailsComponent} from './insurance-list/new/online-list/online-list-details/online-list-details.component';
import {DesktopComponent} from './insurance-list/new/desktop/desktop.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule,
    ClaimRoutingModule,
  ],
  entryComponents: [
    UploadFromFileComponent,
    ProcessingFormComponent,
    LoadFormFileDisplayedComponent
  ],
  declarations: [
    PursueListComponent,
    CloneListSearchComponent,
    // CloneListModalComponent,
    CloneListListComponent,
    CloneListComponent,
    ListFullOperationComponent,
    ListFullOperationModalComponent,
    ListDetailsComponent,
    ListDetailItemRowComponent,
    ListDetailItemRowModalComponent,
    LoadFromFileComponent,
    UploadFromFileComponent,
    LoadFormFileDisplayedComponent,
    ProcessingFormComponent,
    DisplayErrorModalComponent,
    UploadFileModelComponent,
    ErroreListModalComponent,
    DisplayInfoWorkerModalComponent,
    WorkshopHistoryComponent,
    InsuranceListNewComponent,
    FullFledgedListComponent,
    FullFledgedListNewComponent,
    WorkshopHistoryViewComponent,
    CloneListModalComponent,
    MenuListComponent,
    MainComponent,
    SectionComponent,
    UploadFilesComponent,
    CreateOnlineListComponent,
    EmployeeComponent,
    OnlineListDetailsComponent,
    DesktopComponent
  ]
})
export class ClaimModule {
}
