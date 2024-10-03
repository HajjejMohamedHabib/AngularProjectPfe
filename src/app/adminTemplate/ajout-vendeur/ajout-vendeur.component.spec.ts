import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVendeurComponent } from './ajout-vendeur.component';

describe('AjoutVendeurComponent', () => {
  let component: AjoutVendeurComponent;
  let fixture: ComponentFixture<AjoutVendeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutVendeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
