import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFromFileComponent } from './load-from-file.component';

describe('LoadFromFileComponent', () => {
  let component: LoadFromFileComponent;
  let fixture: ComponentFixture<LoadFromFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFromFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
