import { Injectable } from '@angular/core';
import { Slab } from '../models/slab'

@Injectable()
export class TaxSlabsService {
  slabs: Slab[] = [
    { minAge: 0, maxAge: 60, 
      salaryRanges:[
        { minSal: 0,       maxSal: 2500000, percentage: 0.0 },
        { minSal: 250001,  maxSal: 500000,  percentage: 0.1 },
        { minSal: 500001,  maxSal: 1000000, percentage: 0.2 },
        { minSal: 1000000, maxSal: -1,      percentage: 0.3 }
      ] 
    },
    { minAge: 61, maxAge: 80, 
      salaryRanges:[
        { minSal:0,       maxSal: 300000,  percentage: 0.0 },
        { minSal:300001,  maxSal: 500000,  percentage: 0.1 },
        { minSal:500001,  maxSal: 1000000, percentage: 0.2 },
        { minSal:1000000, maxSal: -1,      percentage: 0.3 }
      ] 
    },
    { minAge: 81, maxAge: -1, 
      salaryRanges:[
        { minSal: 0,       maxSal: 500000,  percentage: 0.0 },
        { minSal: 500001,  maxSal: 1000000, percentage: 0.2 },
        { minSal: 1000000, maxSal: -1,      percentage: 0.3 }
      ] 
    }
  ];

  constructor() { }

  getSlabs(){
    return this.slabs;
  }

}
