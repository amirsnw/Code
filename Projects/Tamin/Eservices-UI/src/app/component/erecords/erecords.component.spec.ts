import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErecordsComponent } from './erecords.component';

describe('ErecordsComponent', () => {
  let component: ErecordsComponent;
  let fixture: ComponentFixture<ErecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
