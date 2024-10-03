import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAjoutComponent } from './search-ajout.component';

describe('SearchAjoutComponent', () => {
  let component: SearchAjoutComponent;
  let fixture: ComponentFixture<SearchAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
