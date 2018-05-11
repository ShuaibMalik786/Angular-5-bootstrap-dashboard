import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private metaService: Meta) {
  }

  get(url: string, params: object = {}, headers: object = {}): Observable<any> {
    return this.http.get(url, this.getRequestOptions(headers, params));
  }

  post(url: string, body: any | null, headers: object = {}): Observable<any> {
    return this.http.post(url, body, this.getRequestOptions(headers));
  }

  put(url: string, body: any | null, headers: object = {}): Observable<any> {
    return this.http.put(url, body, this.getRequestOptions(headers));
  }

  patch(url: string, body: any | null, headers: object = {}): Observable<any> {
    return this.http.patch(url, body, this.getRequestOptions(headers));
  }

  delete(url: string, headers: object = {}): Observable<any> {
    return this.http.delete(url, this.getRequestOptions(headers));
  }

  download(url: string, params: object = {}): Observable<any> {
    const headers = { 'Accept': '*/*' };
    return this.http.get(url, this.getRequestOptions(headers, params, true));
  }

  private getHttpParams(params: object = {}): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((param, key) => param.set(key, params[key]), new HttpParams);
  }

  private getHttpHeaders(headers: object = {}): HttpHeaders {
    const defaultHeaders = {
      'Accept': 'application/json'
    };

    const csrfTokenMeta = this.metaService.getTag('name="csrf-token"');

    if (csrfTokenMeta) {
      headers['X-CSRF-TOKEN'] = csrfTokenMeta.content;
    }

    Object.assign(defaultHeaders, headers);

    return new HttpHeaders(defaultHeaders);
  }

  private getRequestOptions(headers: object = {}, params: object = {}, download: boolean = false) {
    const options = {
      // headers: this.getHttpHeaders(headers),
      params: this.getHttpParams(params),
    };

    if (download) {
      options['responseType'] = 'blob';
    }

    return options;
  }
}
