import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictListSubdominantComponent } from './sso-edict-list-subdominant.component';

describe('SsoEdictListSubdominantComponent', () => {
  let component: SsoEdictListSubdominantComponent;
  let fixture: ComponentFixture<SsoEdictListSubdominantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictListSubdominantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictListSubdominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
