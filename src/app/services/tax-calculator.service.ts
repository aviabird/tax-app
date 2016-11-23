import { Investor } from './../models/investor';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaxSlabsService } from './tax-slabs.service';
import { Slab } from '../models/slab';
import { SalaryRange } from '../models/salary-range';

@Injectable()
export class TaxCalculatorService {
  slabs: Slab[];
  // investor$: Observable<any>;

  constructor(private taxSlabService: TaxSlabsService) { 
   this.slabs  = taxSlabService.getSlabs();
  }


  // This Function Calculates tax for investor
  // using his information i.e Age and Income
  taxReturn(income: number, age: number): any {
    var salaryRanges: SalaryRange[] = this.retriveSalaryRange(age);
    var initialTax =  this.calculateInitialTaxAmt(salaryRanges, income);
    var surCharge  =  this.calcSurchargeIfAny(income, initialTax);
    var eduCess    = this.calcEduCess(initialTax, surCharge);
    var totalTax  = this.calcTotalTax(initialTax, eduCess, surCharge);
    // this.investor$.tax = totalTax;
    return totalTax;
  }

  // Retrive Salary Range in which the investor falls
  retriveSalaryRange(age: number): SalaryRange[] {
    var salaryRange: SalaryRange[] = [];
    this.slabs.forEach(slab => {
      // Check for min-max age condition
      slab.maxAge = (slab.maxAge == -1) ? Infinity:slab.maxAge;
     
      console.log("Slab maxAge is and age is" + slab.maxAge + " " + age);   
      if(slab.minAge <= age && age <= slab.maxAge){
        console.log("Found Slab Range and In If condition");
        salaryRange = slab.salaryRanges;
      }
    })
    return salaryRange;
  }

  // Calculate Initial Tax Amount i.e Tax excluding Edu Cess and Surrcharge
  calculateInitialTaxAmt(salaryRanges: SalaryRange[], income: number) {
    var remain_hash = {};
    var constTax:number = 0;
    var constDiffAmt:number = 0;
    var tax:number = 0;
    
    salaryRanges.forEach(salaryRange => {
      // Check for -1, if yes convert it to infinity
      salaryRange.maxSal = (salaryRange.maxSal == -1) ? Infinity: salaryRange.maxSal;
      
      if (salaryRange.minSal <= income && income <= salaryRange.maxSal){
        tax = this.currentSalRangeTaxPlusConstTax(income,
                                                  constDiffAmt,
                                                  constTax,
                                                  salaryRange.percentage
                                                )
        console.log("Tax in Salary range is :", tax)
        console.log("Calculating tax in salary range", salaryRange.maxSal);
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
  currentSalRangeTaxPlusConstTax(income:      number,
                                constDiffAmt: number,
                                constTax:     number,
                                percentage:   number): number {
    return ((income - constDiffAmt) * percentage + constTax);
  }

  // Calculate Diff Amount between two ranges
  // E.g 25,0000 to 50,0000 = 25,00000 
  calcConstDiffAmt(minSal: number, maxSal: number): number {
    return (maxSal - minSal);
  }

  // Calculate ConstTax for a range
  // E.g: Tax For salary Range between 0-2,50000
  // will always be 0
  //  that is first 2,50000 for all individuals will always  
  // have no tax
  calcConstTax(minSal: number, maxSal: number, percentage: number): number {
    return ((maxSal - minSal) * percentage)
  }

  // Surcharge
  // Calculates Surcharge if investor income
  // is greater than 1 Cr;
  // Surcharge of 15% is charged on tax
  // if income is greater than 1 crore
  // Else surcharge is 0%;
  calcSurchargeIfAny(income: number, tax: number): number {
    if (income < 10000000){
      return 0
    }
    else{
      var initialSurcharge = (tax * 0.15);
      var finalSurcharge = this.checkForMarginalRelief(initialSurcharge, income, tax);
      return finalSurcharge;
    }
  }

  // Check if person falls under margianl relief by
  // comparing incrementalIncome and initial_surcharge
  // return the one that is less
  checkForMarginalRelief(initialSurcharge: number, income: number, tax: number): number {
    // income above 1 Cr.
    var incrementalIncome = (income - 10000000)
    if (incrementalIncome < initialSurcharge){
      return incrementalIncome;
    }
    else{
      return initialSurcharge;
    }
  }


  // Education Cess
  
  // Calculates education cess on tax
  // Default Education cess on tax in India is 3%
  calcEduCess(initialTax: number, surCharge: number): number {
    return ((initialTax + surCharge) * 0.03);
  }

  // Total tax

  // Finnaly Add Educationl Cess , Surcharge to Inital tax
  // and get Total Tax for the investor;
  calcTotalTax(initialTax: number, eduCess: number, surCharge: number): number {
    return (initialTax + eduCess + surCharge);
  }
}
// End