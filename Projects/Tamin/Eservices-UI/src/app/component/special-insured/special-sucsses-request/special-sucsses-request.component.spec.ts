import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SpecialSucssesRequestComponent} from './special-sucsses-request.component';

describe('SpecialInsuredContractComponent', () => {
  let component: SpecialSucssesRequestComponent;
  let fixture: ComponentFixture<SpecialSucssesRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialSucssesRequestComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSucssesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
