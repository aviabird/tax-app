import { Action } from "@ngrx/store";

import { Investor } from './../models/investor';

// Declare all the actions as unique strings
export const ActionTypes = {
    CALCULATE_TAX: 'CALCULATE_TAX',
    TAX_CALCULATION_COMPLETE: 'TAX_CALCULATION_COMPLETE'
}

export class CalculateTax implements Action {
    type = ActionTypes.CALCULATE_TAX;

    constructor(public payload: Investor) { }
}

export class TaxCalculateComplete implements Action {
    type = ActionTypes.TAX_CALCULATION_COMPLETE;

    constructor(public payload: Investor) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CalculateTax
  | TaxCalculateComplete