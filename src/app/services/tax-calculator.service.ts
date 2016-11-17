import { Injectable } from '@angular/core';
import { TaxSlabsService } from './tax-slabs.service'
import { Slab } from '../models/slab'
import { SalaryRange } from '../models/salary-range'   
@Injectable()
export class TaxCalculatorService {
  slabs: Slab[];

  constructor(private taxSlabService: TaxSlabsService) { 
   this.slabs  = taxSlabService.getSlabs();
  }

  // This Function Calculates tax for investor
  // using his information i.e Age and Income
  taxReturn(income: number, age: number): any {
    var salaryRanges:SalaryRange[] = this.retriveSalaryRange(age);
    var initialTax =  this.calculateInitialTaxAmt(salaryRanges, income);
}

  // Retrive Salary Range in which the investor falls
  retriveSalaryRange(age:number): SalaryRange[] {
    var salaryRange: SalaryRange[] = [];
    this.slabs.forEach(slab => {
      // Check for min-max age condition
      slab.maxAge = (slab.maxAge == -1) ? Infinity: slab.maxAge;
      if (slab.minAge <= age && age >= slab.maxAge){
        salaryRange = slab.salaryRanges;
      }
    })
    return salaryRange;
  }

  // Calculate Initial Tax Amount i.e Tax excluding Edu Cess and Surrcharge
  calculateInitialTaxAmt(salaryRanges: SalaryRange[], income: number){
    var remain_hash = {};
    var constTax:number = 0;
    var constDiffAmt:number = 0;
    var tax:number = 0;
    
    salaryRanges.forEach(salaryRange => {
      // Check for -1, if yes convert it to infinity
      salaryRange.maxSal = (salaryRange.maxSal == -1) ? Infinity: salaryRange.maxSal;
      
      if (salaryRange.minSal <= income && income >= salaryRange.maxSal){
        tax = this.currentSalRangeTaxPlusConstTax(income,
                                                  constDiffAmt,
                                                  constTax,
                                                  salaryRange.percentage
                                                )
        return tax;
      }
      else {
        // Calculate Constant amount and constant tax
        // if amount is not in salary range
        constDiffAmt += this.calcConstDiffAmt(salaryRange.minSal, salaryRange.maxSal);
        constTax     += this.calcConstTax(salaryRange.minSal, salaryRange.maxSal, salaryRange.percentage)
      }
    })
    return tax;
  }

  // Constant Tax plus Tax for Current Salary Range
  currentSalRangeTaxPlusConstTax(income, constDiffAmt, constTax, percentage):number{
    return ((income - constDiffAmt) * percentage + constTax);
  }

  // Calculate Diff Amount between two ranges
  // E.g 25,0000 to 50,0000 = 25,00000 
  calcConstDiffAmt(minSal, maxSal):number{
    return (maxSal - minSal);
  }

  // Calculate ConstTax for a range
  // E.g: Tax For salary Range between 0-2,50000
  // will always be 0
  //  that is first 2,50000 for all individuals will always  
  // have no tax
  calcConstTax(minSal, maxSal, percentage): number{
    return ((maxSal - minSal) * percentage)
  }
}
// End