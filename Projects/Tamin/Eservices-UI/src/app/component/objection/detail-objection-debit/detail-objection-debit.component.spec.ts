import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailObjectionDebitComponent } from './detail-objection-debit.component';

describe('ObjectionDebitComponent', () => {
  let component: DetailObjectionDebitComponent;
  let fixture: ComponentFixture<DetailObjectionDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailObjectionDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailObjectionDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
