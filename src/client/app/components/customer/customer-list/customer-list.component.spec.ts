import { TestBed, inject } from '@angular/core/testing';

import { CustomerDetailComponent } from './customer-detail.component';

describe('a client component', () => {
  let component: CustomerDetailComponent;

  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerDetailComponent]
    });
  });

  // instantiation through framework injection
  beforeEach(
    inject([CustomerDetailComponent], CustomerDetailComponent => {
      component = CustomerDetailComponent;
    })
  );

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });
});
