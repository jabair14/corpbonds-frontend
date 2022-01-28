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
import { LearnComponent } from './learn/learn.component';


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
  {path: "learn", component:LearnComponent},
  {path: "", component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
