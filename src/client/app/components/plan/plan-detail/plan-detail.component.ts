import { TermsConditionsService } from '../../../modules/api/services/terms-conditions.service';
import { Component, OnInit } from '@angular/core';
import { TermsConditions } from '../../../modules/models/terms-conditions.model';
import { Person } from '../../../modules/models/person.model';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../../modules/api/services/register.service';

@Component({
  moduleId: module.id,
  selector: 'fit-plan-detail',
  templateUrl: 'plan-detail.component.html',
  styleUrls: ['plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  plan: TermsConditions;

  constructor(
    public planService: TermsConditionsService,
    public loginservice: RegisterService,
    private params: ActivatedRoute
  ) {
    this.plan = new TermsConditions();
    this.plan.id = this.loginservice.currentUser.providerId;
  }

  ngOnInit() {
    this.planService.getPlanById(this.plan).subscribe(
      x => this.plan = x
    );
  }
}
