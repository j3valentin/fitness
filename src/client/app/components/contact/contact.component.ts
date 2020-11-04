import { RegisterService } from './../../modules/api/services/register.service';
// angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

// app
import { RouterExtensions, Config } from '../../modules/core/index';
import { Contact } from '../../modules/models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../modules/api/services/person.service';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'fit-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  contact: Contact;
  personId: String;
  stateCtrl: FormControl;
  filteredCountries: any;
  countries: Object[];
  countriesPattern: string;
  loading: number = 0;

  constructor(
    private params: ActivatedRoute,
    public routerext: RouterExtensions,
    public personService: PersonService,
    private loginService: RegisterService,
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) {
    this.stateCtrl = new FormControl();
    this.filteredCountries = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterCountries(name));

    this.personId = this.loginService.currentUser.providerId;
    this.contact = new Contact(this.personId);
  }

  filterCountries(val: string) {
    return val
      ? this.countries.filter(s => new RegExp(`^${val}`, 'gi').test(s[1]))
      : this.countries;
  }

  ngOnInit() {
    this.personService.getCountries().subscribe(x => {
      this.countriesPattern = x.map(c => c[1]).join('|');
      this.countries = x;
    });
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
    const country = this.contact.country;
    this.contact.country = this.personService.getCountryCodeByName(country);
    this.personService.addOffice(this.contact).subscribe(resp => {
      this.loading = 2;
      this.translate.get('SUCCES').subscribe((res: string) => {
        this.openSnackBar(res, '');
        this.redirect(`/provider/${this.personId}`);
        // window.location.reload();
      });
    });
    this.contact.country = country;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
