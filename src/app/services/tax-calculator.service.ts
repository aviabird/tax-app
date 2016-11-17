import { Injectable } from '@angular/core';
import { TaxSlabsService } from './tax-slabs.service'
import { Slab } from '../models/slab'

@Injectable()
export class TaxCalculatorService {
  slabs: Slab[];

  constructor(private taxSlabService: TaxSlabsService) { 
   this.slabs  = taxSlabService.getSlabs();
  }

  taxReturn(income: number, age: number): number {
    var salaryRange:number = this.retriveSalaryRange(age);
    return salaryRange;
  }

  retriveSalaryRange(age:number): any {
    this.slabs.forEach(slab => {
    }) 
  }

}