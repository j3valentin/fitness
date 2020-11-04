// angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader } from '@ngx-translate/core';
import { QRCodeModule } from 'angular2-qrcode';
// import { QrScannerModule } from 'angular2-qrscanner';
import { FileUploadModule } from 'ng2-file-upload';
import { MomentModule } from 'angular2-moment';

// app
import { APP_COMPONENTS, AppComponent } from './app/components/index';
import { routes } from './app/components/app.routes';

// feature modules
import {
  WindowService,
  ConsoleService,
  LogTarget,
  LogLevel,
  ConsoleTarget
} from './app/modules/core/services/index';
import { CoreModule, Config } from './app/modules/core/index';
import { AnalyticsModule } from './app/modules/analytics/index';
import {
  MultilingualModule,
  Languages,
  translateLoaderFactory,
  MultilingualEffects
} from './app/modules/i18n/index';
import { SampleModule, SampleEffects } from './app/modules/sample/index';
import { AppReducer } from './app/modules/ngrx/index';
import { MyMaterialModule } from './app/modules/material/myMaterial.module';
import { ResponsiveModule } from 'ng2-responsive';
import { ApiServicesModule } from './app/modules/api/services/api-service.module';
import { AgePipe } from './app/modules/shared/pipes/age.pipe';

// config
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= BUILD_TYPE %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, { useHash: true });
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}
export function consoleLogTarget(consoleService: ConsoleService) {
  return new ConsoleTarget(consoleService, { minLogLevel: LogLevel.Debug });
}

let DEV_IMPORTS: any[] = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DEV_IMPORTS = [
    ...DEV_IMPORTS,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ];
}

// configure app state
// dev environment only imports
// override with supported languages
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: win },
      { provide: ConsoleService, useFactory: cons },
      {
        provide: LogTarget,
        useFactory: consoleLogTarget,
        deps: [ConsoleService],
        multi: true
      }
    ]),
    routerModule,
    AnalyticsModule,
    MultilingualModule.forRoot([
      {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: translateLoaderFactory
      }
    ]),
    SampleModule,
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(SampleEffects),
    MomentModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FileUploadModule,
    ResponsiveModule,
    // PlanModuleModule,
    ApiServicesModule,
    QRCodeModule,
    // QrScannerModule,
    MyMaterialModule,
    MaterialModule,
    DEV_IMPORTS
  ],
  declarations: [APP_COMPONENTS, AgePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    {
      provide: Languages,
      useValue: Config.GET_SUPPORTED_LANGUAGES()
    }
  ],
  bootstrap: [AppComponent]
})
export class WebModule {}
