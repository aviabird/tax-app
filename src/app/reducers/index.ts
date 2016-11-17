import * as fromInvestors from './investor';

// Represents a structure of the database 
export interface State {
    // look at it as individual tables/models which make up your app
    user: fromInvestors.State; 
}