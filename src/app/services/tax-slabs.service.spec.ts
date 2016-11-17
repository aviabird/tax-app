/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaxSlabsService } from './tax-slabs.service';

describe('Service: TaxSlabs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxSlabsService]
    });
  });

  it('should ...', inject([TaxSlabsService], (service: TaxSlabsService) => {
    expect(service).toBeTruthy();
  }));
});
