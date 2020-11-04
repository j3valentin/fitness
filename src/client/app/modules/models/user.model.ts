/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 08/05/2017.
 */

export class User {
  constructor(
    public email,
    public password,
    public role,
    public token,
    public image,
    public name,
    public providerId
  ) {}

  public toJson() {
    const json = JSON.stringify(this, this.replacer);
    return json;
  }

  replacer(key: any, value: any) {
    return value;
  }
}
