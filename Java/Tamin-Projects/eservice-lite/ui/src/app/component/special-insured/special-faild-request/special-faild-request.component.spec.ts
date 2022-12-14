import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SpecialFaildRequestComponent} from './special-faild-request.component';

describe('SpecialInsuredContractComponent', () => {
  let component: SpecialFaildRequestComponent;
  let fixture: ComponentFixture<SpecialFaildRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialFaildRequestComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialFaildRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
