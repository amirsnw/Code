import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSubdominantListComponent } from './sso-subdominant-list.component';

describe('SsoSubdominantListComponent', () => {
  let component: SsoSubdominantListComponent;
  let fixture: ComponentFixture<SsoSubdominantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSubdominantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSubdominantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
