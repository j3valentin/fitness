import { Person } from './person.model';
import { Agreement } from './agreement.model';

export class TermsConditions {
  id: String;
  public amount: number;
  public description: String;
  public internal: boolean;
  public name: String;
  public periodicity: String;
  public person: Person;
  public quantity: number;
  public end: Date;
  public start: Date;

  constructor() {
    this.id = '';
  }

  public toJson() {
    const json = JSON.stringify(this, this.replacer);
    return json;
  }

  replacer(key: any, value: any) {
    if (key.indexOf('end') !== -1 || key.indexOf('start') !== -1) {
      return this.dateNormalizer(value);
    }
    if (key.indexOf('person') !== -1 || key.indexOf('id') !== -1) {
      return undefined;
    }
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }

  dateNormalizer(date: string) {
    return date.substring(0, 10);
  }
}
