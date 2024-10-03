import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorAccountComponent } from './create-vendor-account.component';

describe('CreateVendorAccountComponent', () => {
  let component: CreateVendorAccountComponent;
  let fixture: ComponentFixture<CreateVendorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
