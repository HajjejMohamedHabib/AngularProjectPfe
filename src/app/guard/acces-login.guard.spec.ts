import { TestBed } from '@angular/core/testing';

import { AccesLoginGuard } from './acces-login.guard';

describe('AccesLoginGuard', () => {
  let guard: AccesLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
