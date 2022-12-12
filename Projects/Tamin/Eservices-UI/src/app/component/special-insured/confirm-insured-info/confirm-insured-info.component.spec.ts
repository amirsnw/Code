import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ConfirmInsuredInfoComponent} from './confirm-insured-info.component';

describe('ConfirmInsuredInfoComponent', () => {
  let component: ConfirmInsuredInfoComponent;
  let fixture: ComponentFixture<ConfirmInsuredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInsuredInfoComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInsuredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
