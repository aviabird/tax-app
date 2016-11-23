import { Observable } from 'rxjs/Observable';
import { Investor } from './../../models/investor';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'ta-tax-detail',
  templateUrl: './tax-detail.component.html',
  styleUrls: ['./tax-detail.component.css']
})
export class TaxDetailComponent implements OnInit, OnChanges {
  investor$: Observable<Investor>;
  tax: number;
  reducedTax: number;
  maxElssSaving: number = 46350; 

  constructor(private store: Store<fromRoot.State>,
              private router: Router) { }

  ngOnInit() {
    this.investor$ = this.store.let(fromRoot.getInvestorData);
    this.investor$.subscribe(
      investor => {
        // TODO: Move it out to a service
        if (!investor.tax) {
          this.goBack();
        }

        this.tax = +investor.tax;
        if (this.tax && this.tax > this.maxElssSaving) {
          this.reducedTax = this.tax - this.maxElssSaving;
        } else if ( this.tax && this.tax < this.maxElssSaving) {
          this.reducedTax = this.maxElssSaving - this.tax;
        } else { // equal taxsaving possible & tax
          this.reducedTax = 0;
        }
      }
    );  
  }

  goBack() {
    this.router.navigateByUrl("/investor-detail");
  }

  ngOnChanges() {
    console.log('changed value', this.investor$);
  }

}
