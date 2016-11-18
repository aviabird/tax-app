import { ActionTypes } from './../../actions/investor';
// import { CalculateTax } from './../../actions/investor';
// import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx'; 
import { Store  } from '@ngrx/store';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Investor } from './../../models/investor';
import * as fromRoot from './../../reducers'; 
import * as investor from '../../actions/investor';

@Component({
  selector: 'ta-investor-detail',
  templateUrl: './investor-detail.component.html',
  styleUrls: ['./investor-detail.component.css']
})
export class InvestorDetailComponent implements OnInit {
  // investor: Observable<Investor>; 
  investorDetailForm: FormGroup;
  // investor$: Observable<any>;

  constructor(private store: Store<fromRoot.State>,
              private formBuilder: FormBuilder) { 
    // this.investor$ = this.store.select('investor');
  }

  ngOnInit() {
    // init form here
    this.initForm()
  }

  onSubmit() {
    console.log('value ', this.investorDetailForm.value);
    let investor = this.investorDetailForm.value;
    // dispatch action here
    // this.store.dispatch(new investor.CalculateTax(this.investorDetailForm.value));
    this.store.dispatch({type: 'CALCULATE_TAX', payload: investor});
  }

  initForm() {
    // Later think about when user returns to this page 
    // change such that it picks from store if values are present
    let age: number = 24;
    let salary: number = null;

    this.investorDetailForm = this.formBuilder.group({
      'age':    [age, Validators.required],
      'salary': [salary, Validators.required]
    });
  }

}
