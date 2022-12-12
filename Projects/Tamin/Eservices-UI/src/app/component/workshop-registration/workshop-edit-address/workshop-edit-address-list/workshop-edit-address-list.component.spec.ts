import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditAddressListComponent } from './workshop-edit-address-list.component';

describe('WorkshopEditAddressListComponent', () => {
  let component: WorkshopEditAddressListComponent;
  let fixture: ComponentFixture<WorkshopEditAddressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditAddressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
