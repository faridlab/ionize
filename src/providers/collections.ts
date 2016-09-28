import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Model} from './model';
import {Db} from './db';

export class Collections {

  private model: Model;
  private sql: string;
  private fieldsTypes: Array<string> = ['singleline', 'multiline', 'password', 'email'];

  constructor(
    private http: Http,
    private db: Db
  ) {
    this.initialize();
  }

  private initialize() {
    let tables = [], attr = this.model.attributes;
    for (let i in attr) {
      let _type;
      if (this.fieldsTypes.indexOf(attr[i]) >= 0) {
        _type = `${i} TEXT`;
      } else {
        _type = `${i}  INTEGER`;
      }
      tables.push(_type);
    }
    let fields = tables.join(',');
    this.sql = `CREATE TABLE IF NOT EXISTS ${this.model.name} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${fields})`;
  }

  public setModel(model) {
    if (!(model instanceof Model)) throw new Error('model must be instanceof Model!.');
    this.model = model;
  }

  public sync(): void {}

}
