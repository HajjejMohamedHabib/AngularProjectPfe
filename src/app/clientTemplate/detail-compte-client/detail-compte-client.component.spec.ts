import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompteClientComponent } from './detail-compte-client.component';

describe('DetailCompteClientComponent', () => {
  let component: DetailCompteClientComponent;
  let fixture: ComponentFixture<DetailCompteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCompteClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
