// angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// libs
import { IsDesktop } from 'ng2-responsive/devices/devices-directives';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

// app
import { RouterExtensions, Config } from '../../../modules/core/index';
import { Person } from '../../../modules/models/person.model';
import { PersonService } from '../../../modules/api/services/person.service';
import { Natural } from '../../../modules/models/natural.model';
import { GeolocationService } from '../../../modules/maps/services/geolocation.service';
import { Coords } from '../../../modules/models/coords.model';
import { FileUploader } from 'ng2-file-upload';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'fit-provider-new',
  templateUrl: 'provider-new.component.html',
  styleUrls: ['provider-new.component.css']
})
export class ProviderNewComponent implements OnInit {
  stateCtrl: FormControl;
  filteredCountries: any;
  person: Person;
  personNatural: Person;
  natural: Natural;
  types: String[];
  typesNatural: String[];
  countries: Object[];
  countriesPattern: string;
  coordinates: Coords;
  maxDateMobile: any;
  minDateMobile: any;
  minDateDesktop: any;
  maxDateDesktop: any;
  loading: number = 0;

  public uploader: FileUploader = new FileUploader({
    url: `${Config.ENVIRONMENT().API}/person/image`,
    method: 'POST'
  });

  constructor(
    public routerext: RouterExtensions,
    public personService: PersonService,
    public locationService: GeolocationService,
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) {
    this.stateCtrl = new FormControl();
    this.filteredCountries = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterCountries(name));

    this.person = new Person();
    this.natural = new Natural();

    this.maxDateMobile = moment().subtract(15, 'y').format('YYYY-MM-DD');
    this.maxDateDesktop = moment().subtract(15, 'y').toDate();

    this.minDateMobile = moment().subtract(100, 'y');
    this.minDateDesktop = moment().subtract(100, 'y').toDate();

    this.coordinates = new Coords();
    this.person.contacts[0].coordinates = this.coordinates;
    }

  filterCountries(val: string) {
    return val
      ? this.countries.filter(s => new RegExp(`^${val}`, 'gi').test(s[1]))
      : this.countries;
  }

  getDocuments() {
    setTimeout(() => {
      let c = this.personService.getCountryCodeByName(
        this.person.contacts[0].country
      );
      if (c === undefined) {
        return;
      }
      this.personService.getDocumentTypes(c).subscribe(t => {
        this.types = t;
        this.typesNatural = Object.assign([], t);
        this.typesNatural.splice(3, 1);
      });
    }, 250);
  }

  ngOnInit() {
    this.personService.getCountries().subscribe(x => {
      this.countriesPattern = x.map(c => c[1]).join('|');
      this.countries = x;
    });

    if (navigator.geolocation) {
      this.locationService.getCurrentPosition().forEach((x: Position) => {
        this.coordinates.latitude = x.coords.latitude;
        this.coordinates.longitude = x.coords.longitude;
      });
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

  save() {
    this.loading = 1;
    let nCountry;
    let country = this.person.contacts[0].country;

    this.person.contacts[0].country = this.personService.getCountryCodeByName(
      country
    );

    if (this.person.documentType !== 31) {
      this.person.natural = this.natural;
    } else {
      nCountry = this.personNatural.contacts[0].country;
    }

    this.personService.create(this.person, this.personNatural).subscribe(
      response => {
        // console.log(response);
        this.uploader.setOptions({
          url: `${Config.ENVIRONMENT().API}/person/image/${response}`,
          method: 'POST'
        });
        this.uploader.uploadAll();

        this.loading = 2;
        this.translate.get('SUCCES').subscribe((res: string) => {
          this.openSnackBar(res, '');
          this.redirect('');
        });
      },
      error => {
        this.translate
          .get(error.value || error.type)
          .subscribe((res: string) => {
            this.openSnackBar(res, '');
            this.loading = 0;
          });
      }
    );


    if (this.person.documentType === 31) {
      this.personNatural.contacts[0].country = nCountry;
    }
    this.person.contacts[0].country = country;
  }

  docTypeChange() {
    if (this.person.documentType === 31) {
      this.nit();
    } else {
      this.personNatural = undefined;
    }
  }

  nit() {
    this.personNatural = new Person();
    this.personNatural.natural = this.natural;
    this.personNatural.contacts[0].country = this.person.contacts[0].country;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
