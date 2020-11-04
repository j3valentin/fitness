import { Coords } from '../models/coords.model';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 23/01/2017.
 */

export interface ContactInterface {
  address?: String;
  image?: String;
}

export class Contact implements ContactInterface {
  id: String;
  public name: String;
  public country: String;
  public image: String;
  public state: String;
  public city: String;
  public address: String;
  public phone: String;
  public coordinates: Coords;

  constructor(public personId: String) { }

  dateNormalizer(date: string) {
    return date.substring(0, 10);
  }

  replacer(key: any, value: any) {
    if (key.indexOf('image') !== -1) {
      return undefined;
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
