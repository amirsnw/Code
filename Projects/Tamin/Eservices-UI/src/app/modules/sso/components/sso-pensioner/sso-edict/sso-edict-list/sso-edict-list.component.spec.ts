import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictListComponent } from './sso-edict-list.component';

describe('SsoEdictListComponent', () => {
  let component: SsoEdictListComponent;
  let fixture: ComponentFixture<SsoEdictListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
