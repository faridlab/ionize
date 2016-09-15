import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RESTFul {

  constructor(
    private http: Http
  ) {

  }

  get(url, param = null) {
    let params = new URLSearchParams();
    // Predefined params
    // params.set('token', this.user.token);
    if (param) {
      for (let i in param) {
        let _param: any = param[i];
        if (typeof _param === 'object') _param = JSON.stringify(_param);
        params.set(i, _param);
      }
    }

    return new Promise((resolve, reject) => {
      this.http.get(url, {
          search: params
        })
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => reject(err)
        );
    });
  }

  post(url, param = null) {

    let params = new URLSearchParams();
    // Predefined params
    // params.set('token', this.user.token);
    let body = JSON.stringify(param);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
                                      headers: headers,
                                      search: params
                                    });

    return new Promise((resolve, reject) => {
      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => reject(err)
        );
    });
  }

}
