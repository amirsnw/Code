import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPensionerComponent } from './portal-pensioner.component';

describe('PortalPensionerComponent', () => {
  let component: PortalPensionerComponent;
  let fixture: ComponentFixture<PortalPensionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalPensionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalPensionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
