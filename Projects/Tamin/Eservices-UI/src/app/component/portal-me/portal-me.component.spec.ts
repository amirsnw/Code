import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMeComponent } from './portal-me.component';

describe('PortalMeComponent', () => {
  let component: PortalMeComponent;
  let fixture: ComponentFixture<PortalMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
