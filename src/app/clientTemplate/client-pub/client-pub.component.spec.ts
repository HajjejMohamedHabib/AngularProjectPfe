import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPubComponent } from './client-pub.component';

describe('ClientPubComponent', () => {
  let component: ClientPubComponent;
  let fixture: ComponentFixture<ClientPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
