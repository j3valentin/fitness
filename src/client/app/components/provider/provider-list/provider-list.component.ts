import { PersonService } from '../../../modules/api/services/person.service';
import { MdSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Person } from '../../../modules/models/person.model';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../../../modules/core/index';

@Component({
  moduleId: module.id,
  selector: 'fit-provider-list',
  templateUrl: 'provider-list.component.html',
  styleUrls: ['provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Person[];
  loading: number = 0;
  public URL: String;

  constructor(
    public providersService: PersonService,
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) {
    this.URL = `${Config.ENVIRONMENT().API}/..`;
  }

  ngOnInit() {
    this.loading = 1;
    this.providersService.providers.subscribe(
      x => {
        this.loading = 2;
        this.providers = x;
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
