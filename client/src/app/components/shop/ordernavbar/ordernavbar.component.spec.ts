import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdernavbarComponent } from './ordernavbar.component';

describe('OrdernavbarComponent', () => {
  let component: OrdernavbarComponent;
  let fixture: ComponentFixture<OrdernavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdernavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
