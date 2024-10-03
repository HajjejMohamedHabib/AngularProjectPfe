import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccountAdminComponent } from './detail-account-admin.component';

describe('DetailAccountAdminComponent', () => {
  let component: DetailAccountAdminComponent;
  let fixture: ComponentFixture<DetailAccountAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAccountAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAccountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
