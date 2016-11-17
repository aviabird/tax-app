import { Injectable } from '@angular/core';
import { Slab } from '../models/slab'

@Injectable()
export class TaxSlabsService {
  slabs: Slab[] = [
    { minAge:0, maxAge:60, 
      salaryRanges:[
        { minSal:0, maxSal:2500000, percentage: 0.0 }] 
    }
  ];

  constructor() { }

  getSlabs(){
    return this.slabs;
  }

}
