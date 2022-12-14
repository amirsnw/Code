import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnlineListComponent } from './create-online-list.component';

describe('CreateOnlineListComponent', () => {
  let component: CreateOnlineListComponent;
  let fixture: ComponentFixture<CreateOnlineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOnlineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOnlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
