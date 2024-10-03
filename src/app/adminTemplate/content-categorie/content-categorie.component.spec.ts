import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCategorieComponent } from './content-categorie.component';

describe('ContentCategorieComponent', () => {
  let component: ContentCategorieComponent;
  let fixture: ComponentFixture<ContentCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
