import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesCheckoutComponent } from './succes-checkout.component';

describe('SuccesCheckoutComponent', () => {
  let component: SuccesCheckoutComponent;
  let fixture: ComponentFixture<SuccesCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
