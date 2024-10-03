import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProduitComponent } from './content-produit.component';

describe('ContentProduitComponent', () => {
  let component: ContentProduitComponent;
  let fixture: ComponentFixture<ContentProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
