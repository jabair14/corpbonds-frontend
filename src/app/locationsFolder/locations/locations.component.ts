import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, ChartSelectEvent } from 'ng2-google-charts';
import { LocationService } from '../location.service';
import { Routes, Router} from 'node_modules/@angular/router'
import { Location } from './location.model';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {



  countrys_data = [['Country','Consultants' as any]];
  response: any[]=[];
  locations:Location[] = []
  mapReady=false;
  rightdiv=true;
  rightdivchina=false;
  rightdivindia=false;



  constructor(private locationService: LocationService, public router: Router) { 
    // document.addEventListener('click', (clickEvent: MouseEvent) => {
    //   console.log('Click Event Details: ', clickEvent)
    //   // this.router.navigateByUrl("/")
    // })
  }

  ngOnInit(){
    this.locationService.getLocations().subscribe(
      payload => {
        this.locations = payload
        console.log(this.locations[0])
        for (let location of this.locations){
          const doIExist = [
            location.country,
            location.consultants.length
          ]
          let countries = this.countrys_data.map(function(x) {
            return x[0]
          })
          if (countries.find(country => country == doIExist[0])){
            const newCountry = [location.country, 6]
            console.log('hi')
            let foundIndex = this.countrys_data.findIndex(x => x[0] == doIExist[0])
            console.log(this.countrys_data[foundIndex][1])
            this.countrys_data[foundIndex][1] = 6
          } else {
            this.countrys_data.push([location.country, location.consultants.length])
          }
        }
        this.mapReady = true
        console.log(this.countrys_data)
      }
    )
  }
  public select(event: ChartSelectEvent) {
    console.log('Clicking on the map gets:', event.selectedRowFormattedValues[0])
    let clickedLocation = this.locations.find(location => location.country == event.selectedRowFormattedValues[0])
    if (clickedLocation?.country == 'China') {
      this.rightdiv = false
      this.rightdivindia = false
      this.rightdivchina = true
    }else if (clickedLocation?.country == 'India'){
      this.rightdiv = false
      this.rightdivchina = false
      this.rightdivindia = true
    }else {
      this.router.navigate(['/locations', clickedLocation?.id])
    }
  }
  
  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: this.countrys_data,
    options: {
      // regions: 'all',
      colorAxis: {colors: ['#ffb890','#ff7b2e']},
      backgroundColor: '#00000',
      datalessRegionColor: '#00000',
      defaultColor: '#00000',
      'height': 600,
      legend:"none",
  }
  };
  
}
