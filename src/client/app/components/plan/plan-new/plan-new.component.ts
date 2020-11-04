import { RegisterService } from './../../../modules/api/services/register.service';
import { MdSnackBar } from '@angular/material';
import { TermsConditionsService } from '../../../modules/api/services/terms-conditions.service';
import { Component } from '@angular/core';
import { TermsConditions } from '../../../modules/models/terms-conditions.model';
import { Person } from '../../../modules/models/person.model';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '../../../modules/core/index';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'fit-plan-new',
  templateUrl: 'plan-new.component.html',
  styleUrls: ['plan-new.component.css']
})
export class PlanNewComponent {
  plan: TermsConditions;
  loading: number = 0;
  minDateDesktop: any;
  minDateMobile: any;

  periodicity: String[] = [
    'Year',
    'Semiannual',
    'Quarter',
    'Month',
    'Fortnight',
    'Week',
    'Day',
    'Hour'
  ];

  constructor(
    public plansService: TermsConditionsService,
    public loginservice: RegisterService,
    public routerext: RouterExtensions,
    public snackBar: MdSnackBar,
    private translate: TranslateService,
    private params: ActivatedRoute
  ) {
    this.minDateMobile = moment().format('YYYY-MM-DD');
    this.minDateDesktop = new Date();

    this.plan = new TermsConditions();
    this.plan.person = new Person();
    this.plan.person.id = this.loginservice.currentUser.providerId;
  }

  redirect(route: String) {
    this.routerext.navigate([route], {
      transition: {
        duration: 1000,
        name: 'slideTop'
      }
    });
  }

  createPlan() {
    this.loading = 1;
    this.plansService.create(this.plan).subscribe(x => {
      this.loading = 2;

      this.translate.get('SUCCES').subscribe((res: string) => {
        this.openSnackBar(res, '');
        this.redirect(`provider`);
      });
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
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
