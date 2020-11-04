// angular
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

// libs
import { t } from '../../../modules/test/index';
import { AnalyticsModule } from '../../../modules/analytics/analytics.module';
import { CoreModule } from '../../../modules/core/core.module';
import { LanguageProviders } from '../../../modules/i18n/index';
import { SharedModule } from '../../../modules/shared/index';

import { ProviderDetailComponent } from './provider-detail.component';
import { PersonService } from '../../../modules/api/services/person.service';
import { RegisterService } from '../../../modules/api/services/register.service';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      AnalyticsModule,
      CoreModule,
      SharedModule,
      MaterialModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      BrowserModule,
      RouterTestingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ProviderDetailComponent, TestComponent],
    providers: [
      BaseRequestOptions,
      MockBackend,
      LanguageProviders,
      PersonService,
      RegisterService,
      {
        provide: Http,
        useFactory: function(
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions
        ) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
};

export function main() {
  t.describe('@Component: ProviderDetailComponent', () => {
    t.be(testModuleConfig);

    t.it(
      'should work',
      t.async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<fit-provider-detail></fit-provider-detail>'
})
class TestComponent {}
