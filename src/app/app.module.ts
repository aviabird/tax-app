import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InvestorDetailComponent } from './components/investor-detail/investor-detail.component';
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { ElssDetailComponent } from './components/elss-detail/elss-detail.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { routes } from './routes';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

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
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
