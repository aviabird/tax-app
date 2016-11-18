import { Investor } from './../models/investor';
// import { ActionTypes } from './../actions/investor';
import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { TaxCalculatorService } from './../services/tax-calculator.service';
import * as investor from '../actions/investor';

@Injectable()
export class InvestorEffects {
    constructor (private actions$: Actions, private taxCal: TaxCalculatorService ) {}

    @Effect()
    calculateTax: Observable<Action> = this.actions$
        .ofType(investor.ActionTypes.CALCULATE_TAX)
        .map((action: Action) => {
            console.log('payload', action.payload); 
            return action.payload
        })
        // use switchMap here 
        // https://www.learnrxjs.io/operators/transformation/switchmap.html
        .map(investor => {
            console.log('we are in effects', investor);
            let salary = +investor.salary;
            let age = +investor.age;
            let totalTax = this.taxCal.taxReturn(salary, age);
            investor.tax = totalTax;
            return {type: 'TAX_CALCULATION_COMPLETE', payload: investor};
        });
}