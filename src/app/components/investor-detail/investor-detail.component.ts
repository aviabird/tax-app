import { Router, ActivatedRoute } from '@angular/router';
import { ActionTypes } from './../../actions/investor';
import 'rxjs/add/operator/let';
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
  investor$: Observable<any>; 
  invest$: Observable<any>;
  salary$: Observable<Investor>; 
  investorDetailForm: FormGroup;
  testInvestor$: Observable<any>;
  // investor$: Observable<any>;

  constructor(private store: Store<fromRoot.State>,
              private formBuilder: FormBuilder,
              private router: Router) { 
    this.investor$ = this.store.let(fromRoot.getInvestorData);
  }
 
  ngOnInit() {
    // init form here
    this.initForm();
  }

  sanitiseFormData(): Investor {
    return this.investorDetailForm.value;
  }
 
  onSubmit() {
    let investor: Investor = this.sanitiseFormData();
    // dispatch action here
    // this.store.dispatch(new investor.CalculateTax(this.investorDetailForm.value));
    this.store.dispatch({type: 'CALCULATE_TAX', payload: investor});
    this.navigateToNextPage()
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  navigateToNextPage() {
    this.router.navigateByUrl("/tax-detail");
  }

  initForm() {
    console.log('Initializing investor detail form');
    let age: number = null;
    let salary: number = null;

    // if we already have investor info present
    this.investor$.subscribe(
      investor => {
        console.log('Fetching current investor state from store', investor);
        if (investor.salary) {
          console.log('used already existing salary');
          salary = investor.salary;
        }
        if(investor.age) {
          console.log('used already existing age');          
          age = investor.age;
        }
      }
    );

    // create form groups and their form controls
    console.log('creating form groups');    
    this.investorDetailForm = this.formBuilder.group({
      'age':    [age, Validators.required],
      'salary': [salary, Validators.required]
    });
  }

}
