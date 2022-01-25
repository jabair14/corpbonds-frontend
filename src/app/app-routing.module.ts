import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BondComponent } from './bond/bond.component';
import { BondsComponent } from './bonds/bonds.component';
import { HomeComponent } from './home/home.component';
import { StocksComponent } from './stocks/stocks.component';
import { LocationsComponent } from './locationsFolder/locations/locations.component';
import { LocationComponent } from './locationsFolder/location/location.component';
import { RetcalcComponent } from './retcalc/retcalc.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "bonds", component: BondsComponent},
  {path: "bonds/:id", component: BondComponent},
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "stocks", component: StocksComponent},
  {path: "retcalc", component: RetcalcComponent},
  {path: "locations", component: LocationsComponent, pathMatch: "full"},
  {path: "locations/:id", component: LocationComponent},
  {path: "retcalc", component: RetcalcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
