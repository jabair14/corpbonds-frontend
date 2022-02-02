import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Bonds Routes
import { BondComponent } from './bondsFolder/bond/bond.component';
import { BondsComponent } from './bondsFolder/bonds/bonds.component';
import { HomeComponent } from './home/home.component';
import { StocksComponent } from './stocks/stocks.component';
import { EtfComponent } from './etf/etf.component';
import { LocationsComponent } from './locationsFolder/locations/locations.component';
import { LocationComponent } from './locationsFolder/location/location.component';
import { RetcalcComponent } from './retcalc/retcalc.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';

//Closed-End Funds Routes
import { FundComponent } from './fundsPlace/fund/fund.component';
import { FundsComponent } from './fundsPlace/funds/funds.component';
import { CreateFundsComponent } from './fundsPlace/createfunds/createfunds.component';
import { EditFundsComponent } from './fundsPlace/editfunds/editfunds.component';


//Mutual Funds Routes
import { MutualFundsComponent } from './mutual_funds_content/mutual-funds/mutual-funds.component';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "bonds", component: BondsComponent},
  {path: "funds", component: FundsComponent},
  {path: "funds/create", component: CreateFundsComponent},
  {path: "funds/:id", component: FundComponent},
  {path: "funds/:id/edit", component: EditFundsComponent},
  {path: "bonds/:id", component: BondComponent},
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "stocks", component: StocksComponent},
  {path: "retcalc", component: RetcalcComponent},
  {path: "etfs", component: EtfComponent},
  {path: "locations", component: LocationsComponent, pathMatch: "full"},
  {path: "locations/:id", component: LocationComponent},
  {path: "retcalc", component: RetcalcComponent},
  {path: "socialmedias", component: SocialmediaComponent},
  {path: "", component: HomeComponent, pathMatch: "full"},
  
  // Mutual Funds Routes
  {path: "mutual_funds", component: MutualFundsComponent},
  {path: "mutual_funds/:id", component: MutualFundsComponent}

//User-Service Routes
import { LoginComponent } from './usersFolder/login/login.component';
import { AccountsComponent } from './usersFolder/accounts/accounts.component';
import { RegisterComponent } from './usersFolder/register/register.component';
import { Token } from '@angular/compiler';
import { TokenComponent } from './usersFolder/token/token.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bonds', component: BondsComponent },
  { path: 'funds', component: FundsComponent },
  { path: 'funds/create', component: CreateFundsComponent },
  { path: 'funds/:id', component: FundComponent },
  { path: 'funds/:id/edit', component: EditFundsComponent },
  { path: 'bonds/:id', component: BondComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent },
  { path: 'retcalc', component: RetcalcComponent },
  { path: 'etfs', component: EtfComponent },
  { path: 'locations', component: LocationsComponent, pathMatch: 'full' },
  { path: 'locations/:id', component: LocationComponent },
  { path: 'retcalc', component: RetcalcComponent },
  { path: 'socialmedias', component: SocialmediaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration/:token', component: TokenComponent },
  { path: 'account', component: AccountsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
