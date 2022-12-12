import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMainWebComponent } from './portal-main-web.component';

describe('PortalMainWebComponent', () => {
  let component: PortalMainWebComponent;
  let fixture: ComponentFixture<PortalMainWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMainWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMainWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
