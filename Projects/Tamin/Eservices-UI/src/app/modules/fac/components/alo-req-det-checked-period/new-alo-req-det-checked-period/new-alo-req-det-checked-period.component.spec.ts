import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAloReqDetCheckedPeriodComponent } from './new-alo-req-det-checked-period.component';

describe('NewAloReqDetCheckedPeriodComponent', () => {
  let component: NewAloReqDetCheckedPeriodComponent;
  let fixture: ComponentFixture<NewAloReqDetCheckedPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAloReqDetCheckedPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAloReqDetCheckedPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
