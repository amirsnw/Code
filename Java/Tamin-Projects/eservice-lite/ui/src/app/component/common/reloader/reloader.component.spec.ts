import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloaderComponent } from './reloader.component';

describe('ReloaderComponent', () => {
  let component: ReloaderComponent;
  let fixture: ComponentFixture<ReloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
