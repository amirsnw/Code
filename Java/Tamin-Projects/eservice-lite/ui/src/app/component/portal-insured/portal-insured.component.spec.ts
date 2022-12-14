import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalInsuredComponent } from './portal-insured.component';

describe('PortalInsuredComponent', () => {
  let component: PortalInsuredComponent;
  let fixture: ComponentFixture<PortalInsuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalInsuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
