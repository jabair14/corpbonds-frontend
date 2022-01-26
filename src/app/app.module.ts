import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { BondsComponent } from './bondsFolder/bonds/bonds.component';
import { BondComponent } from './bondsFolder/bond/bond.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEtfComponent } from './etfFolder/dialog-etf/dialog-etf.component';


import { LocationsComponent } from './locationsFolder/locations/locations.component';
import { LocationComponent } from './locationsFolder/location/location.component';
import { RetcalcComponent } from './retcalc/retcalc.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { EtfComponent } from './etfFolder/etf.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BondsComponent,
    BondComponent,
    EtfComponent,
    DialogEtfComponent,
    LocationsComponent,
    LocationComponent,
    RetcalcComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    AngularMaterialModule,
    FormsModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogEtfComponent],

})
export class AppModule { 
    constructor() {
      library.add(faFilm)
  }
}
