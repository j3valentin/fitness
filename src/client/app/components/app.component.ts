// any operators needed throughout your application
import './operators';

// libs
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// app
import { AnalyticsService } from '../modules/analytics/services/index';
import { LogService } from '../modules/core/services/index';
import { Config } from '../modules/core/utils/index';
import { RegisterService } from '../modules/api/services/register.service';
import { RouterExtensions, WindowService } from '../modules/core/index';
import { SecurityService } from './../modules/api/services/security.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  agent: string;
  public URL: String;

  constructor(
    public analytics: AnalyticsService,
    public log: LogService,
    public loginService: RegisterService,
    public securityService: SecurityService,
    public routerext: RouterExtensions,
    private win: WindowService
  ) {
    log.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
    // log.info(`Version: ${Config.VERSION}`)
    this.agent = win.navigator.userAgent.toLowerCase();
    this.URL = `${Config.ENVIRONMENT().API}/..`;
  }

  logOut() {
    this.loginService.logOut();
    this.routerext.navigate(['/login'], {
      transition: {
        duration: 1000,
        name: 'slideTop'
      }
    });
  }

  isDesktop() {
    return this.agent.search('electron') !== -1;
  }
}
