import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFledgedListComponent } from './full-fledged-list.component';

describe('FullFledgedListComponent', () => {
  let component: FullFledgedListComponent;
  let fixture: ComponentFixture<FullFledgedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFledgedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFledgedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
