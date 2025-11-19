import { TestBed } from '@angular/core/testing';

import { ShopApi } from './shop-api';

describe('ShopApi', () => {
  let service: ShopApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
