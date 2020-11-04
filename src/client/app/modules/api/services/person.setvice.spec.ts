// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angulartics2Module, Angulartics2Segment } from 'angulartics2';

// app
import { t } from '../../test/index';
import { CoreModule, ILang, WindowService, ConsoleService } from '../../core/index';
import { TEST_CORE_PROVIDERS, WindowMockFrench } from '../../core/testing/index';
import { RegisterService } from './register.service';
import { Contact } from '../../models/contact.model';
import { Person } from '../../models/person.model';


// test module configuration for each test
const testModuleConfig = (options?: any) => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console }
      ]),
      Angulartics2Module.forRoot([
        Angulartics2Segment
      ]),
      RouterTestingModule
    ],
    providers: [
      TEST_CORE_PROVIDERS(options),
    ]
  });
  TestBed.compileComponents();
};

export function main() {
  t.describe('api:', () => {
    t.describe('PersonService', () => {
      console.log();
    });

    t.describe('MultilingualService for French browser/platform', () => {
      console.log();
    });
  });
}
