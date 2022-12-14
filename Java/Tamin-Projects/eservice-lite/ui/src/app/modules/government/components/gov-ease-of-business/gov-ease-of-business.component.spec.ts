import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovEaseOfBusinessComponent } from './gov-ease-of-business.component';

describe('GovEaseOfBusinessComponent', () => {
  let component: GovEaseOfBusinessComponent;
  let fixture: ComponentFixture<GovEaseOfBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovEaseOfBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovEaseOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
