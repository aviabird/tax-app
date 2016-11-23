import { Observable } from 'rxjs/Observable';
import { Investor } from './../../models/investor';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'ta-tax-detail',
  templateUrl: './tax-detail.component.html',
  styleUrls: ['./tax-detail.component.css']
})
export class TaxDetailComponent implements OnInit, OnChanges {
  investor$: Observable<Investor>;
  tax: number;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.investor$ = this.store.let(fromRoot.getInvestorData);

    this.investor$.subscribe(
      investor => {
        console.log('changed value', investor);
        this.tax = +investor.tax;
      }
    );  
  }

  ngOnChanges() {
    console.log('changed value', this.investor$);
  }

}
