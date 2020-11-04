import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// modules
import { MultilingualModule } from '../i18n/index';
import { MdMenuModule } from '@angular/material';

const SHARED_MODULES: any[] = [
  CommonModule,
  HttpModule,
  FormsModule,
  RouterModule,
  MultilingualModule,
  MdMenuModule
];

/**
 * SharedModule
 * Only for shared components, directives and pipes
 * Do not specify providers here
 * https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#what-kinds-of-modules-should-i-have-and-how-should-i-use-them-
 */

@NgModule({
  imports: [...SHARED_MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...SHARED_MODULES]
})
export class SharedModule {}
