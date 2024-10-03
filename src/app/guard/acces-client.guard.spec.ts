import { TestBed } from '@angular/core/testing';

import { AccesClientGuard } from './acces-client.guard';

describe('AccesClientGuard', () => {
  let guard: AccesClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
