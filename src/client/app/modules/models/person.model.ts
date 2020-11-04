import { TermsConditions } from './terms-conditions.model';
import { Contact } from './contact.model';
import { Natural } from './natural.model';
/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 23/01/2017.
 */

export interface PersonInterface {
  distance?: number;
  offices?: Contact[];
  image: String;
  documentType: number;
  documentNumber: String;
}

export class Person implements PersonInterface {
  id: String;
  public name: String;
  public documentType: number;
  public documentNumber: String;
  public image: String;
  public web: String;
  public contacts: Contact[];
  public natural: Natural;
  public terms: TermsConditions[];

  constructor() {
    this.contacts = [];
    this.contacts.push(new Contact(this.id));
  }

  dateNormalizer(date: string) {
    return date.substring(0, 10);
  }

  public toJsonArray() {
    let aPerson: Person[] = [];
    aPerson.push(this);
    const json = JSON.stringify(aPerson, this.replacer);
    return json;
  }

  public toJson() {
    const json = JSON.stringify(this, this.replacer);
    return json;
  }

  replacer(key: any, value: any) {
    if (key.indexOf('terms') !== -1 || key.indexOf('id') !== -1) {
      return undefined;
    }
    if (key.indexOf('birthDate') !== -1) {
      return this.dateNormalizer(value);
    }
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}
