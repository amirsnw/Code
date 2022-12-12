import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalWorkshopComponent } from './portal-workshop.component';

describe('PortalWorkshopComponent', () => {
  let component: PortalWorkshopComponent;
  let fixture: ComponentFixture<PortalWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
