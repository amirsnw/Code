import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsSpecComponent } from './years-spec.component';

describe('YearsSpecComponent', () => {
  let component: YearsSpecComponent;
  let fixture: ComponentFixture<YearsSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearsSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
