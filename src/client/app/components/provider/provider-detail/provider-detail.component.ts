// libs
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// app
import { RouterExtensions, Config } from '../../../modules/core/index';
import { Person } from '../../../modules/models/person.model';
import { Contact } from '../../../modules/models/contact.model';
import { PersonService } from '../../../modules/api/services/person.service';
import { TermsConditions } from '../../../modules/models/terms-conditions.model';
import { RegisterService } from '../../../modules/api/services/register.service';
import { SecurityService } from '../../../modules/api/services/security.service';

@Component({
  moduleId: module.id,
  selector: 'fit-provider-detail',
  templateUrl: 'provider-detail.component.html',
  styleUrls: ['provider-detail.component.css']
})
export class ProviderDetailComponent {
  provider: Person;
  contacts: Contact;
  public URL: String;
  agrements: TermsConditions[];
  plans: TermsConditions[];

  constructor(
    public providerService: PersonService,
    public routerext: RouterExtensions,
    public loginservice: RegisterService,
    public securityService: SecurityService,
    private params: ActivatedRoute
  ) {
    this.provider = new Person();
    this.URL = `${Config.ENVIRONMENT().API}/..`;
  }

  ngOnInit() {
    this.provider.id = this.loginservice.currentUser.providerId;
    this.providerService.getProviderById(this.provider.id).subscribe(prov => {
      // console.log(prov);
      this.provider = prov;
      this.agrements = this.provider.terms.filter(x => x.internal === true);
      this.plans = this.provider.terms.filter(x => x.internal === false);
    });

  }

  addContact() {
    this.routerext.navigate(['/contacts', this.provider.name], {
      transition: {
        duration: 1000,
        name: 'slideTop'
      }
    });
  }
}
