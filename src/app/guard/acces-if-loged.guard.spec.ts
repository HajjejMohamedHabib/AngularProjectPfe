import { TestBed } from '@angular/core/testing';

import { AccesIfLogedGuard } from './acces-if-loged.guard';

describe('AccesIfLogedGuard', () => {
  let guard: AccesIfLogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesIfLogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
