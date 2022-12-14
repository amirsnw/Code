import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMainComponent } from './portal-main.component';

describe('PortalMainComponent', () => {
  let component: PortalMainComponent;
  let fixture: ComponentFixture<PortalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
