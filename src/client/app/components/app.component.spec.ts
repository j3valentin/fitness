// angular
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResponsiveModule } from 'ng2-responsive';

// libs
import { StoreModule } from '@ngrx/store';
import { Angulartics2Module, Angulartics2Segment } from 'angulartics2';
import 'hammerjs/hammer.js';

// app
import { t } from '../modules/test/index';
import { TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS } from '../modules/core/testing/index';
import { SharedModule } from '../modules/shared/index';
import { MultilingualModule } from '../modules/i18n/multilingual.module';
import { LanguageProviders } from '../modules/i18n/index';
import { GeolocationService } from '../modules/maps/services/geolocation.service';
// import { routes } from './app.routes'

// module
import { APP_COMPONENTS } from './index';
import { HomeComponent } from './home/home.component';
import { ApiServicesModule } from '../modules/api/services/api-service.module';

const config: Route[] = [
  {path: '', component: HomeComponent},
];

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports     : [
      Angulartics2Module.forRoot([
        Angulartics2Segment
      ]),
      MaterialModule,
      MultilingualModule,
      BrowserAnimationsModule,
      BrowserModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      ResponsiveModule,
      StoreModule.provideStore({}),
      RouterTestingModule.withRoutes(config),
      ApiServicesModule,
      SharedModule
    ],
    schemas     : [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
      TestComponent,
      ... APP_COMPONENTS
    ],
    providers   : [
      TEST_CORE_PROVIDERS(),
      TEST_HTTP_PROVIDERS(),
      GeolocationService,
      LanguageProviders
    ]
  });
};

export function main() {
  t.describe('@Component: AppComponent', () => {

    t.be(testModuleConfig);

    t.it('should build without a problem',
      t.async(() => {
        TestBed.compileComponents()
               .then(() => {
                 let fixture = TestBed.createComponent(TestComponent);
                 fixture.detectChanges();
                 t.e(fixture.nativeElement).toBeTruthy();
               });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})
class TestComponent {
}
