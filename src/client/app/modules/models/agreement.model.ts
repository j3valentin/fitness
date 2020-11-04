import { TermsConditions } from './terms-conditions.model';
import { Person } from './person.model';

export class Agreement {
  public amount: number;
  public end: Date;
  public quantity: number;
  public person: Person;
  public start: Date;
  public terms: TermsConditions;

  constructor() {
    this.amount = 0;
    this.quantity = 1;
  }

  public toJson() {
    const json = JSON.stringify(this, this.replacer);
    return json;
  }

  replacer(key: any, value: any) {
    if (
      key.indexOf('end') !== -1 ||
      key.indexOf('start') !== -1 ||
      key.indexOf('birthDate') !== -1
    ) {
      return this.dateNormalizer(value);
    }

    if (key.indexOf('terms') !== -1) {
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
