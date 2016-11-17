import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx'; 
import { Store  } from '@ngrx/store';

import { Investor } from './../../models/investor';
import * as fromRoot from './../../reducers'; 

@Component({
  selector: 'ta-investor-detail',
  templateUrl: './investor-detail.component.html',
  styleUrls: ['./investor-detail.component.css']
})
export class InvestorDetailComponent implements OnInit {
  investor: Observable<Investor>; 

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
  }

}
