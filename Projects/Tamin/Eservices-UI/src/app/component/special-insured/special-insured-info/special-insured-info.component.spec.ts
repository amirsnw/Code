import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SpecialInsuredInfoComponent} from './special-insured-info.component';

describe('SpecialInsuredInfoComponent', () => {
  let component: SpecialInsuredInfoComponent;
  let fixture: ComponentFixture<SpecialInsuredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialInsuredInfoComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialInsuredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
