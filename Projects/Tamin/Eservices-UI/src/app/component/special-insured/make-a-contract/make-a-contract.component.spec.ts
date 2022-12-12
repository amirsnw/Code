import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MakeAContractComponent} from './make-a-contract.component';

describe('MakeAContractComponent', () => {
  let component: MakeAContractComponent;
  let fixture: ComponentFixture<MakeAContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
