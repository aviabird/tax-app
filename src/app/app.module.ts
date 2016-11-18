import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from './app.component';
import { InvestorDetailComponent } from './components/investor-detail/investor-detail.component';
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { ElssDetailComponent } from './components/elss-detail/elss-detail.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { InvestorEffects } from './effects/investor';

import { reducer } from './reducers';

import { TaxCalculatorService } from './services/tax-calculator.service';
import { TaxSlabsService } from './services/tax-slabs.service';

import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    InvestorDetailComponent,
    TaxDetailComponent,
    ElssDetailComponent,
    PlatformsComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(InvestorEffects),
  ],
  providers: [
    TaxCalculatorService,
    TaxSlabsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
