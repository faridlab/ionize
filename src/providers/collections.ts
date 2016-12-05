import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Collection } from './collection';
// import {ExampleModel} from './models'

// FIXME: this line below is another collection sample, remove if you do not need this
@Injectable()
export class ExampleCollections extends Collection  {
  public collections: {string?: Array<any>} = {};
  public resetValue: any = {};
  constructor() {
    super();
  }
}
