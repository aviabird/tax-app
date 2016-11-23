import { Observable } from 'rxjs/Rx';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import '@ngrx/core/add/operator/select';


import * as fromInvestors from './investor';

// Represents a structure of the database 
export interface State {
    // look at it as individual tables/models which make up your app
    investor: fromInvestors.State; 
}

const reducers = {
    investor: fromInvestors.reducer
};

const developmentReducer: ActionReducer<State> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

// 

// should return investor state
export const getInvestorState = (state$: Observable<State>) =>
    state$.select(s => s.investor);


// should return investor data
export const getInvestorData = compose(fromInvestors.getInvestorData, getInvestorState);
