import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AloReqDetCheckedPeriodComponent } from './alo-req-det-checked-period.component';

describe('AloReqDetCheckedPeriodComponent', () => {
  let component: AloReqDetCheckedPeriodComponent;
  let fixture: ComponentFixture<AloReqDetCheckedPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AloReqDetCheckedPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AloReqDetCheckedPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
