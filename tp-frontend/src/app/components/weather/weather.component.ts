import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData:any;
  lat:any;
  lng:any;

  constructor(private dataService:DataService) { }


  ngOnInit(): void {
    this.getWeather();
  }


  getWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.dataService.getForecast(this.lat, this.lng).subscribe((response:any)=>{
              console.log(response.data)
              this.weatherData=response.data
            })
          }
        },
          (error: any) => console.log(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
  }

}
