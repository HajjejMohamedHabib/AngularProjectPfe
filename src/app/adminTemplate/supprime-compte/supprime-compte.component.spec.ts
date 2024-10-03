import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimeCompteComponent } from './supprime-compte.component';

describe('SupprimeCompteComponent', () => {
  let component: SupprimeCompteComponent;
  let fixture: ComponentFixture<SupprimeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimeCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
