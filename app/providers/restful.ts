import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RESTFul {

  constructor(
    private http: Http
  ) {

  }

  /**
   * GET method http request
   * @param  {string} url   endpoint url string
   * @param  {any}    param object parameters
   * @param  {any}    opt   options param and Headers {param: {}, header: {}}
   * @return {Promise}      Promise
   */

  get(url: string, param?: any, opt?: any) {
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

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
                                      headers: headers,
                                      search: params
                                    });

    return new Promise((resolve, reject) => {
       this.http.get(url, options)
        .map(res => res)
        // .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => reject(err)
        );
    });
  }

  /**
   * POST method http request
   * @param  {string} url   endpoint url string
   * @param  {any}    data  object parameters
   * @param  {any}    opt   options param and Headers {param: {}, header: {}}
   * @return {Promise}      Promise
   */
  post(url: string, data?: any, opt?: any) {

    let params = new URLSearchParams();
    // Predefined params
    // params.set('token', this.user.token);

    let _headers = { 'Content-Type': 'application/json' };
    if (opt && opt['headers']) {
      for (let i in opt['headers']) {
        _headers[i] = opt['headers'][i];
      }
    }

    console.log(_headers);

    let body = JSON.stringify(data);
    let headers = new Headers(_headers);
    let options = new RequestOptions({
                                      headers: headers,
                                      search: params
                                    });

    return new Promise((resolve, reject) => {
      this.http.post(url, body, options)
        .map(res => res)
        .subscribe(
          data => {
            resolve(data);
          },
          err => reject(err)
        );
    });
  }

}
