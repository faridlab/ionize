import { Injectable } from '@angular/core';
import {DBNAME} from './config';
import 'rxjs/add/operator/map';
import { SQLite } from 'ionic-native';
import {Platform } from 'ionic-angular';

@Injectable()
export class Db {
  db: any;
  config: any = {
    name: DBNAME,
    location: 'default',
    tables: [
      'CREATE TABLE IF NOT EXISTS appstorage  (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, data TEXT)'
    ]
  };

  constructor(
    public platform: Platform
  ) {

  }

  public initDb(): any {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.db = new SQLite();
        this.db.openDatabase({
          name: this.config.name,
          location: 'default',
          androidDatabaseImplementation: 2,
          androidLockWorkaround: 1
        }).then(() => {
          let _tablesSql = [];
          for (let i in this.config.tables) {
            _tablesSql.push(this.config.tables[i]);
          }
          this.batch(_tablesSql).then(() => {
            resolve();
          });
        }, (err) => {
          console.error('Unable to open database: ', err);
        });
      });
    });
  }

  /**
   * another wrapping function query() from executeSql()
   * @param  {string}        sql [query string]
   * @param  {Array<any> =   []}
   *                         params [array of parameter]
   * @return {Promise}              [return promise]
   */
  public query(sql: string, params: Array<any> = []): any {
    return this.db.executeSql(sql, params);
  }

  /**
   * localStorage like, get(key) method will return any data from DB and smartly
   * could return object type when you store object data
   * @param  {string} key [used for key name]
   * @return {any}        [return any data for you]
   */
  public get(key: string): any {
    let sql = `SELECT appstorage.data FROM appstorage WHERE appstorage.key=?`;
    return this.query(sql, [key]).then(resultSet => {
      let item;
      try {
        if (resultSet.rows.length) {
          item = resultSet.rows.item(0)['data'];
          return JSON.parse(item);
        }
        return null;
      } catch (e) {
        return item;
      }
    }, (err) => {
      console.error('SQL Error: ', err);
    });
  }

  /**
   * localStorage like, get(key) method will store your any data
   * type (string|number|object) in SQLite DB
   * @param {string} key  [used for key name]
   * @param {any}    data [your data will store as string data]
   */
  public set(key: string, data: any): void {
    if (typeof(data) === 'object') data = JSON.stringify(data);
    this.get(key).then(item => {
      if (item) {
        this.query(`UPDATE appstorage SET data=? WHERE key=?`, [data, key]);
      } else {
        this.query(`INSERT INTO appstorage (key, data) VALUES (?,?)`, [key, data]);
      }
    });
  }

  /**
   * another wrapping function batch() from sqlBatch()
   * @param  {Array<any>} bulks [array of parameter]]
   * @return {Promise}    [return promise]
   */
  public batch(bulks: Array<any>): any {
    return this.db.sqlBatch(bulks);
  }

}
