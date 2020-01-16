import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtocartmodalComponent } from './addtocartmodal.component';

describe('AddtocartmodalComponent', () => {
  let component: AddtocartmodalComponent;
  let fixture: ComponentFixture<AddtocartmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtocartmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtocartmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
