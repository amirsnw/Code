import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionUpdateContactComponent } from './fraction-update-contact.component';

describe('FractionUpdateContactComponent', () => {
  let component: FractionUpdateContactComponent;
  let fixture: ComponentFixture<FractionUpdateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionUpdateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionUpdateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
