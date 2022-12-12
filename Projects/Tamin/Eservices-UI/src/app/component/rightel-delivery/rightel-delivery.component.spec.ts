import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightelDeliveryComponent } from './rightel-delivery.component';

describe('RightelDeliveryComponent', () => {
  let component: RightelDeliveryComponent;
  let fixture: ComponentFixture<RightelDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightelDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightelDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
