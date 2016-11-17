/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaxCalculatorService } from './tax-calculator.service';

describe('Service: TaxCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxCalculatorService]
    });
  });

  it('should ...', inject([TaxCalculatorService], (service: TaxCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
