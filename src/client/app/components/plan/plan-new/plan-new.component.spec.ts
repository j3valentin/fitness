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
import { ResponsiveModule } from 'ng2-responsive';
import { CoreModule } from '../../../modules/core/core.module';
import { LanguageProviders } from '../../../modules/i18n/index';
import { SharedModule } from '../../../modules/shared/index';

import { PlanNewComponent } from './plan-new.component';
import { TermsConditionsService } from '../../../modules/api/services/terms-conditions.service';
import { MyMaterialModule } from '../../../modules/material/myMaterial.module';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      AnalyticsModule,
      CoreModule,
      SharedModule,
      MaterialModule,
      MyMaterialModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      BrowserModule,
      ResponsiveModule,
      RouterTestingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PlanNewComponent, TestComponent],
    providers: [
      BaseRequestOptions,
      LanguageProviders,
      MockBackend,
      TermsConditionsService,
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
  t.describe('@Component: TermsConditionsComponent', () => {
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
  template: '<fit-plan-new></fit-plan-new>'
})
class TestComponent {}
