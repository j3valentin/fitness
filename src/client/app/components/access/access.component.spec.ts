// import { TestBed, inject } from '@angular/core/testing';
// import { HttpModule } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';

// import { AccessComponent } from './access.component';
// import { AccessService } from './shared/access.service';
// import { Access } from './shared/access.model';

// describe('a access component', () => {
//   let component: AccessComponent;

//   // register all needed dependencies
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [
//         { provide: AccessService, useClass: MockAccessService },
//         AccessComponent
//       ]
//     });
//   });

//   // instantiation through framework injection
//   beforeEach(
//     inject([AccessComponent], AccessComponent => {
//       component = AccessComponent;
//     })
//   );

//   it('should have an instance', () => {
//     expect(component).toBeDefined();
//   });
// });

// // Mock of the original access service
// class MockAccessService extends AccessService {
//   getList(): Observable<any> {
//     return Observable.from([{ id: 1, name: 'One' }, { id: 2, name: 'Two' }]);
//   }
// }
