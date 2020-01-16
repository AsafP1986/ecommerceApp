import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishordermodalComponent } from './finishordermodal.component';

describe('FinishordermodalComponent', () => {
  let component: FinishordermodalComponent;
  let fixture: ComponentFixture<FinishordermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishordermodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishordermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
