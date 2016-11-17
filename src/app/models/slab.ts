import {SalaryRange } from './salary-range'

export interface Slab {
    minAge: number,
    maxAge: number,
    salaryRanges: SalaryRange[]
}