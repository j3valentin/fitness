import { TestBed, inject } from '@angular/core/testing';

import { CustomerNewComponent } from './customer-new.component';

describe('a client component', () => {
  let component: CustomerNewComponent;

  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerNewComponent]
    });
  });

  // instantiation through framework injection
  beforeEach(
    inject([CustomerNewComponent], CustomerNewComponent => {
      component = CustomerNewComponent;
    })
  );

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });
});
