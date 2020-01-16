import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertmodalComponent } from './alertmodal.component';

describe('AlertmodalComponent', () => {
  let component: AlertmodalComponent;
  let fixture: ComponentFixture<AlertmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
