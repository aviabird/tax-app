// 
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InvestorDetailComponent } from './components/investor-detail/investor-detail.component';
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: LandingPageComponent
    },
    {
        path: 'investor-detail',
        component: InvestorDetailComponent
    },
    {
        path: 'tax-detail',
        component: TaxDetailComponent
    }
] 