import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductmodalComponent } from './addproductmodal.component';

describe('AddproductmodalComponent', () => {
  let component: AddproductmodalComponent;
  let fixture: ComponentFixture<AddproductmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
