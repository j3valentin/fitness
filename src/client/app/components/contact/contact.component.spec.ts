// angular
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';
import { MaterialModule, MdInputDirective } from '@angular/material';

// libs
import { t } from '../../modules/test/index';
import { AnalyticsModule } from '../../modules/analytics/analytics.module';
import { CoreModule } from '../../modules/core/core.module';
import { LanguageProviders } from '../../modules/i18n/index';
import { RouterExtensions } from '../../modules/core/services/router-extensions.service';
import { SharedModule } from '../../modules/shared/shared.module';

import { ContactComponent } from './contact.component';
import { PersonService } from '../../modules/api/services/person.service';
import { RegisterService } from '../../modules/api/services/register.service';
import { Contact } from '../../modules/models/contact.model';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AnalyticsModule,
      CoreModule,
      MaterialModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      BrowserModule,
      SharedModule
    ],
    declarations: [ContactComponent, TestComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
      BaseRequestOptions,
      MockBackend,
      LanguageProviders,
      RouterExtensions,
      PersonService,
      RegisterService,
      {
        provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
};

export function main() {
  t.describe('@Component: ContactComponent', () => {

    t.be(testModuleConfig);

    t.it('should create the component',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
          });
      }));

    t.it('should have a defined component',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let component = fixture.componentInstance;
            expect(component).toBeDefined();
          });
      }));

    t.it('should add contact',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let contactInstance = fixture.debugElement.children[0].componentInstance;

            contactInstance.contact.personId = '1';
            contactInstance.contact.phone = '123456';
            contactInstance.contact.name = 'test';
            contactInstance.contact.country = 'Colombia';
            contactInstance.contact.state = 'Cundinamarca';
            contactInstance.contact.address = 'Cll 12c # 71 c 30';
            // contactInstance.save();
            // let resp = contactInstance.save();
            // t.e(resp).toBe(true);

            // const element = fixture.debugElement.nativeElement;
            // let input = fixture.debugElement.query(By.css('input'));
            // input.nativeElement.value = 'test';
            // input.nativeElement.dispatchEvent(new Event('input'));

            // fixture.detectChanges();
            // t.e(true).toBe(true);

            // t.e(input.nativeElement.value).toBe('test');
            // expect(element.textContent).toContain('PHONE');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<fit-contact></fit-contact>'
})
class TestComponent {

}
