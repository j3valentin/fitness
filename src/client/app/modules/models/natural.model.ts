import { Person } from './person.model';
// import { UUID } from 'angular2-uuid';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 23/01/2017.
 */

export class Natural {
  id: String;
  birthDate: any;
  email: String;
  lastName: String;

  constructor() {
    this.email = '';
  }

  dateNormalizer(date: string) {
    return date.substring(0, 10);
  }

  replacer(key: any, value: any) {
    if (key.indexOf('birthDate') !== -1) {
      return this.dateNormalizer(value);
    }
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }

  public toJson() {
    const json = JSON.stringify(this, this.replacer);
    return json;
  }
}
