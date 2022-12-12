import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditAddressSearchComponent } from './workshop-edit-address-search.component';

describe('WorkshopEditAddressSearchComponent', () => {
  let component: WorkshopEditAddressSearchComponent;
  let fixture: ComponentFixture<WorkshopEditAddressSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditAddressSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
