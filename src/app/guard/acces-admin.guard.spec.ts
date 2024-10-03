import { TestBed } from '@angular/core/testing';

import { AccesAdminGuard } from './acces-admin.guard';

describe('AccesAdminGuard', () => {
  let guard: AccesAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
