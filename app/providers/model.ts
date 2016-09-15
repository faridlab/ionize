import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Model {

  storage: any;

  /**
   * Constants type of field
   */
  static SINGLELINE: string  = 'singleline';
  static MULTILINE: string  = 'multiline';
  static PASSWORD: string  = 'password';
  static NUMBER: string  = 'number';
  static EMAIL: string  = 'email';

  name: string; // Model name not an object of Model itself
  attributes: any;
  data: any = {};

  constructor(
    private http: Http
  ) {
    this.initialize();
  }

  private initialize() {
    this.extractAttr();
  }

  /**
   * Extractor attributes to data of model
   * @return {[type]} [description]
   */
  private extractAttr() {
    if (this.attributes) {
      this.data['id'] = null;
      for (let i in this.attributes) {
        this.data[i] = null;
      }
    }
  }

  /**
   * [save is method to save or update data to store to Database or Server]
   * @return {any} [return Promise]
   */
  save(): any {}

  /**
   * [Delete current model by model id]
   * @return {any} [description]
   */
  delete(): any {}

  /**
   * [Check if this model has an attribute]
   * @param  {string} key [description]
   * @return {any}        [description]
   */
  has(key: string): any {}

  /**
   * Get a value of item selected by key
   * @param  {string} key [description]
   * @return {any}        [description]
   */
  get(key?: string): any {}

  /**
   * Set valu of model's attribute by its key
   * @param {string} key   [description]
   * @param {any}    value [description]
   */
  set(key: string, value: any): void {}

}


class User extends Model {

  name: 'user';

  attributes: any = {
    username: Model.SINGLELINE,
    password: Model.PASSWORD,
    email: Model.EMAIL,
    name: Model.SINGLELINE,
    age: Model.NUMBER,
    address: Model.MULTILINE
  };


}
