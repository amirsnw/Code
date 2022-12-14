import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditAddressComponent } from './workshop-edit-address.component';

describe('WorkshopEditAddressComponent', () => {
  let component: WorkshopEditAddressComponent;
  let fixture: ComponentFixture<WorkshopEditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
