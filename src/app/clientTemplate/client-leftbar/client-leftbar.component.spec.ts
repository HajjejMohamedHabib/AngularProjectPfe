import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLeftbarComponent } from './client-leftbar.component';

describe('ClientLeftbarComponent', () => {
  let component: ClientLeftbarComponent;
  let fixture: ComponentFixture<ClientLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
