import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

export class Model {
  id: number;
  private attributes: any;

  constructor(attrs: any = null) {
    if(attrs) this.set(attrs);
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
   * @param  {string} key data object
   * @return {boolean}    result
   */
  has(key: string): boolean {
    if(Object.keys(this.attributes).indexOf(key) > 0) return true
    return false;
  }

  /**
   * Get a value of item selected by key
   * @param  {string} key [description]
   * @return {any}        [description]
   */
  get(key: string = null): any {
    if(!key) return this.attributes;
    return this.attributes[key];
  }

  /**
   * alias method for get()
   * @return {[type]} [description]
   */
  getAttributes(): any {
    return this.get();
  }

  /**
   * Set valu of model's attribute by its key
   * @param {string} key   [description]
   * @param {any}    value [description]
   */
  set(keyOrVal: any, value?: any): void {
    if(typeof keyOrVal === 'string' && value) {
      this.attributes[keyOrVal] = value;
      this[keyOrVal] = value;
    } else if(keyOrVal instanceof Object) {
      this.attributes = keyOrVal;
      for (let i in keyOrVal) {
        this[i] = keyOrVal[i];
      };
    }
  }
}

@Injectable()
export class BaseModel extends Model {}
