import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDiseasesComponent } from './special-diseases.component';

describe('SpecialDiseasesComponent', () => {
  let component: SpecialDiseasesComponent;
  let fixture: ComponentFixture<SpecialDiseasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
