import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InvestorDetailComponent } from './components/investor-detail/investor-detail.component';
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { ElssDetailComponent } from './components/elss-detail/elss-detail.component';
import { PlatformsComponent } from './components/platforms/platforms.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestorDetailComponent,
    TaxDetailComponent,
    ElssDetailComponent,
    PlatformsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
