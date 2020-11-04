// angular
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialModule, MdNativeDateModule, MdMenuModule, MdSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule,
    MdNativeDateModule,
    MdMenuModule,
    MdSidenavModule
  ],
  declarations: [
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  ]
})
export class MyMaterialModule {

}
