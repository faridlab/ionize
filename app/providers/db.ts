import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {DBNAME} from './config';
@Injectable()
export class Db {
  db: any;
  storage: any;
  config: any = {
    name: DBNAME,
    location: 'default',
    tables: [
      'CREATE TABLE IF NOT EXISTS setting       (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, data TEXT)'
    ]
  };
  constructor( ) {
    this.storage = new Storage(SqlStorage, {
      name: this.config.name,
      backupFlag: SqlStorage.BACKUP_LOCAL
    });
    for (let i in this.config.tables) {
      this.storage.query(this.config.tables[i]);
    }
  }
  public get(key) {
    return this.storage.get(key);
  }
  public set(key, value) {
    return this.storage.set(key, value);
  }
  public query(sql, params = []) {
    return this.storage.query(sql, params);
  }
}
