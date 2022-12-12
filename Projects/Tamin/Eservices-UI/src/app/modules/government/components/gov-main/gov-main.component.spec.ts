import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovMainComponent } from './gov-main.component';

describe('GovMainComponent', () => {
  let component: GovMainComponent;
  let fixture: ComponentFixture<GovMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
