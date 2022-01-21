import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BondComponent } from './bond/bond.component';
import { BondsComponent } from './bonds/bonds.component';
import { HomeComponent } from './home/home.component';
import { RetcalcComponent } from './retcalc/retcalc.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "bonds", component: BondsComponent},
  {path: "bonds/:id", component: BondComponent},
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "retcalc", component: RetcalcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
