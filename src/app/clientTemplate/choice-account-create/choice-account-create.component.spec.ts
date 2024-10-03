import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAccountCreateComponent } from './choice-account-create.component';

describe('ChoiceAccountCreateComponent', () => {
  let component: ChoiceAccountCreateComponent;
  let fixture: ComponentFixture<ChoiceAccountCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceAccountCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
