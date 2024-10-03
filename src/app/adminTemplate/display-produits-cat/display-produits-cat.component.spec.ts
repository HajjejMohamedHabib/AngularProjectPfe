import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProduitsCatComponent } from './display-produits-cat.component';

describe('DisplayProduitsCatComponent', () => {
  let component: DisplayProduitsCatComponent;
  let fixture: ComponentFixture<DisplayProduitsCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProduitsCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProduitsCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
