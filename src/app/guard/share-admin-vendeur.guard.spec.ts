import { TestBed } from '@angular/core/testing';

import { ShareAdminVendeurGuard } from './share-admin-vendeur.guard';

describe('ShareAdminVendeurGuard', () => {
  let guard: ShareAdminVendeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShareAdminVendeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
