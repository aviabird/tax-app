import { Observable } from 'rxjs/Rx';
import { ActionTypes } from './../actions/investor';
import * as investor from '../actions/investor';
import { Investor } from '../models/investor';

export interface State {
    investor_data: Object | any;
}

const initialState: State = {
    investor_data: { id: null,
                     age: null,
                     salary: null,
                     email: null,
                     tax: null,
                   }
}

export function reducer(state = initialState, action: investor.Actions): State {
    switch (action.type) {
        case investor.ActionTypes.CALCULATE_TAX: {
            let investor = action.payload;
            // Change this with logic
            console.log("CALCULATE_TAX action run");
            return {
                investor_data: {
                    id: investor.id,
                    age: investor.age,
                    salary: investor.salary,
                    tax: investor.tax,
                    email: investor.email
                }
            };         
        }
        case investor.ActionTypes.TAX_CALCULATION_COMPLETE: {
            // Change this with logic
            let investor = action.payload;
            console.log("TAX_CALCULATION_COMPLETE action run", investor);                        
            return {
                investor_data: {
                    id: investor.id,
                    age: investor.age,
                    salary: investor.salary,
                    tax: investor.tax,
                    email: investor.email
                }
            };  
        }
        default: {
            return initialState;
        }
    }
}  

export function getInvestorData(state$: Observable<State>): Observable<Investor> {
    return state$.select(state => state.investor_data);
}