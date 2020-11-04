import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { PersonService } from '../../../modules/api/services/person.service';
import { TermsConditions } from '../../../modules/models/terms-conditions.model';
import { TermsConditionsService } from '../../../modules/api/services/terms-conditions.service';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../../modules/models/person.model';
import { Natural } from '../../../modules/models/natural.model';
import { RouterExtensions } from '../../../modules/core/index';
import { RegisterService } from '../../../modules/api/services/register.service';
import { Agreement } from '../../../modules/models/agreement.model';

@Component({
  selector: 'fit-customer-new',
  moduleId: module.id,
  templateUrl: 'customer-new.component.html',
  styleUrls: ['customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {
  agreement: Agreement;
  customer: Person;
  countries: Object[];
  countriesPattern: string;
  filteredCountries: any;
  plans: TermsConditions[];
  stateCtrl: FormControl;
  types: any;
  loading: number = 0;
  providerId: number;
  maxDateMobile: any;
  minDateMobile: any;
  minDateDesktop: any;
  maxDateDesktop: any;
  startDateMinMob: any;
  startDateMaxMob: any;
  startDateMin: any;
  startDateMax: any;
  selectedPlan: TermsConditions;

  constructor(
    private personService: PersonService,
    public routerext: RouterExtensions,
    private planService: TermsConditionsService,
    private loginService: RegisterService,
    private params: ActivatedRoute,
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) {
    this.customer = new Person();
    this.agreement = new Agreement();
    this.agreement.person = this.customer;
    this.plans = [];

    this.maxDateMobile = moment().subtract(15, 'y').format('YYYY-MM-DD');
    this.minDateMobile = moment().subtract(100, 'y').format('YYYY-MM-DD');

    this.maxDateDesktop = moment().subtract(15, 'y').toDate();
    this.minDateDesktop = moment().subtract(100, 'y').toDate();

    this.customer.natural = new Natural();
    this.agreement.terms = new TermsConditions();
    this.stateCtrl = new FormControl();
    this.providerId = this.loginService.currentUser.providerId;
    this.filteredCountries = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterCountries(name));
  }

  ngOnInit() {
    this.personService.getCountries().subscribe(x => {
      this.countriesPattern = x.map(c => c[1]).join('|');
      this.countries = x;
    });

    this.planService
      .getPlans(this.providerId)
      .subscribe(plans => (this.plans = plans));
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

    let country = this.customer.contacts[0].country;
    this.customer.contacts[0].country = this.personService.getCountryCodeByName(
      country
    );
    this.personService
      .addCustomer(this.agreement, this.selectedPlan.id)
      .subscribe(x => {
        // console.log(x);
        this.loading = 2;
        this.translate.get('SUCCES').subscribe(
          (res: string) => {
            this.openSnackBar(res, '');
            this.redirect('provider');
          },
          error => {
            this.translate
              .get(error.value || error.json().type || error.type)
              .subscribe((res: string) => {
                this.openSnackBar(res, '');
                this.loading = 0;
              });
          }
        );
      });
    this.customer.contacts[0].country = country;
  }

  getDocuments() {
    setTimeout(() => {
      let c = this.personService.getCountryCodeByName(
        this.customer.contacts[0].country
      );
      if (c === undefined) {
        return;
      }
      this.personService.getDocumentTypes(c).subscribe(t => {
        this.types = t;
      });
    }, 250);
  }

  filterCountries(val: string) {
    return val
      ? this.countries.filter(s => new RegExp(`^${val}`, 'gi').test(s[1]))
      : this.countries;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

  planChange() {
    this.selectedPlan = this.plans.find(x => x.id === this.agreement.terms.id);

    this.periodicityMaper();

    this.startDateMin = new Date(this.selectedPlan.start);
    this.startDateMax = new Date(this.selectedPlan.end);

    this.startDateMinMob = moment(this.selectedPlan.start).format('YYYY-MM-DD');
    this.startDateMaxMob = moment(this.selectedPlan.end).format('YYYY-MM-DD');

    this.quantityChange();
    // console.log(this.selectedPlan);
  }

  quantityChange() {
    this.agreement.amount = this.selectedPlan.amount * this.agreement.quantity;
  }

  periodicityMaper() {
    let endDate;
    switch (this.selectedPlan.periodicity) {
      case 'Year':
        endDate = moment(this.agreement.start).add(1, 'y');
        break;
      case 'Semiannual':
        endDate = moment(this.agreement.start).add(2, 'Q');
        break;
      case 'Quarter':
        endDate = moment(this.agreement.start).add(1, 'Q');
        break;
      case 'Month':
        endDate = moment(this.agreement.start).add(1, 'M');
        break;
      case 'Fortnight':
        endDate = moment(this.agreement.start).add(15, 'd');
        break;
      case 'Week':
        endDate = moment(this.agreement.start).add(1, 'w');
        break;
      case 'Day':
        endDate = moment(this.agreement.start).add(1, 'd');
        break;
      case 'Hour':
        endDate = moment(this.agreement.start).add(1, 'h');
        break;
    }
    this.agreement.end = endDate.toDate();
  }
}
