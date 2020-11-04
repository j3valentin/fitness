// angular
import { Component, OnInit } from '@angular/core';

// libs
import { Observable } from 'rxjs/Observable';

// app
import { RouterExtensions, Config } from '../../modules/core/index';
import { Person } from '../../modules/models/person.model';
import { PersonService } from '../../modules/api/services/person.service';
// import { RegisterService } from '../../modules/api/services/register.service';
// import { Natural } from '../../modules/models/natural.model';
import { GeolocationService } from '../../modules/maps/services/geolocation.service';

@Component({
  moduleId: module.id,
  selector: 'fit-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  providers$: Observable<Person[]>;
  message: string;
  range: number = 2;
  URL: string;

  constructor(
    public routerext: RouterExtensions,
    public locationService: GeolocationService,
    /*public registerService: RegisterService,*/
    public personService: PersonService
  ) {
    this.URL = `${Config.ENVIRONMENT().API}/..`;
  }

  ngOnInit() {
    this.getProviders(this.range);
  }

  getProviders(range) {
    if (navigator.geolocation) {
      this.locationService
        .getCurrentPosition()
        .forEach((position: Position) => {
          // this.location = position.coords;
          this.providers$ = this.personService.getProviders(
            position.coords,
            range
          );
          // console.log(this.location);
        })
        .catch((error: PositionError) => {
          if (error.code > 0) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.message = 'permission denied';
                break;
              case error.POSITION_UNAVAILABLE:
                this.message = 'position unavailable';
                break;
              case error.TIMEOUT:
                this.message = 'position timeout';
                break;
            }
          }
        });
    } else {
      this.message = 'browser doesn support geolocation';
    }
  }

  redirect(route: String) {
    this.routerext.navigate([route], {
      transition: {
        duration: 1000,
        name: 'slideTop'
      }
    });
  }
}
