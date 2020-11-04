// libs
import { Component } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// app
import { RouterExtensions, Config } from '../../modules/core/index';
import { User } from '../../modules/models/user.model';
import { RegisterService } from '../../modules/api/services/register.service';
import { MdSnackBar } from '@angular/material';
// import { LogService } from '../../shared/core/services/log.service';

@Component({
  moduleId: module.id,
  selector: 'fit-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  public names$: Observable<any>;
  loading: number = 0;
  user: User;
  loggedIn: boolean;
  providerId: number;

  constructor(
    public routerext: RouterExtensions,
    /*public logger: LogService,*/
    /*private store: Store<User>,*/
    public registerService: RegisterService,
    public snackBar: MdSnackBar,
    private translate: TranslateService
  ) {
    this.user = new User('', '', '', '', '','','');
  }

  ngOnInit() {
    // this.names$ = this.store.let(this.user);
    localStorage.removeItem('currentUser');
  }

  redirect(role: any) {
    let route =
      role.indexOf('ROLE_ADMIN') !== -1 ? `/provider` : '';
    this.routerext.navigate([route], {
      transition: {
        duration: 1000,
        name: 'slideTop'
      }
    });
  }

  login() {
    this.loading = 1;
    this.registerService.login(this.user).subscribe(
      response => {
        this.loading = 2;
        this.providerId = response.provider_id;
        this.translate.get('SUCCES').subscribe((res: string) => {
          this.redirect(response.roles);
          this.openSnackBar(res, '');
          // window.location.reload();
        });
      },
      error => {
        this.translate
          .get(error.value || error.message)
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
