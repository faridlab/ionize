import 'rxjs/add/operator/map';

export class Collection {

  collections: any;
  public resetValue: any = [];

  constructor(data: any = null) {
    if(data) this.set(data);
  }

  /**
   * Set valu of model's attribute by its key
   * @param {string} key   [description]
   * @param {any}    value [description]
   */
  public set(keyOrVal: any, value?: any): void {
    //  If you deserve to use string as key, override `data` type data
    if(typeof keyOrVal === 'string' && value) {
      this.collections[keyOrVal] = value;
    } else if(keyOrVal instanceof Object) {
      this.collections = keyOrVal;
    }
  }

  /**
   * Get a value of item selected by key
   * @param  {string} key [description]
   * @return {any}        [description]
   */
  public get(key: string = null): any {
    if(!key) return this.collections;
    return this.collections[key];
  }

  public reset() {
    this.collections = this.resetValue;
  }

  // public toJson(key: string = null): any {
  //   let list = this.get(key);
  //   if(list) {
  //
  //   }
  //   return list;
  // }

  public sync(): void {}

}
