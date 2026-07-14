import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from './../configuration.service';
import { HttpRequestModel } from '../../model/http-request.model';

@Injectable({ providedIn: 'root' })
export abstract class HttpServiceBase {

  constructor(
    protected http: HttpClient,
    protected config: ConfigurationService,
  ) { }

  private _authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  get$<T = string>(httpRequest: HttpRequestModel): Observable<T> {
    if (httpRequest.isText) {
      return this.http.get(httpRequest.fullUrl, {
        headers: this._authHeaders(),
        params: { ...httpRequest.fullParams },
        responseType: 'text' as any
      }) as Observable<T>;
    }
    return this.http.get<T>(httpRequest.fullUrl, {
      headers: this._authHeaders(),
      params: { ...httpRequest.fullParams }
    });
  }

  delete$<T = string>(httpRequest: HttpRequestModel): Observable<T> {
    return this.http.delete<T>(httpRequest.fullUrl, {
      headers: this._authHeaders(),
      params: { ...httpRequest.fullParams }
    });
  }

  post$<T = string>(httpRequest: HttpRequestModel): Observable<T> {
    if (httpRequest.isText) {
      return this.http.post(httpRequest.fullUrl, httpRequest.body, {
        headers: this._authHeaders(),
        params: { ...httpRequest.fullParams },
        responseType: 'text'
      }) as Observable<T>;
    }
    return this.http.post<T>(httpRequest.fullUrl, httpRequest.body, {
      headers: this._authHeaders(),
      params: { ...httpRequest.fullParams }
    });
  }

  put$<T = string>(httpRequest: HttpRequestModel): Observable<T> {
    if (httpRequest.isText) {
      return this.http.put(httpRequest.fullUrl, httpRequest.body, {
        headers: this._authHeaders(),
        params: { ...httpRequest.fullParams },
        responseType: 'text'
      }) as Observable<T>;
    }
    return this.http.put<T>(httpRequest.fullUrl, httpRequest.body, {
      headers: this._authHeaders(),
      params: { ...httpRequest.fullParams }
    });
  }

  request$(httpRequest: HttpRequestModel): Observable<any> {
    return this.http.request('GET', httpRequest.fullUrl, {
      headers: this._authHeaders(),
      params: { ...httpRequest.fullParams },
      observe: 'response',
      responseType: 'blob',
    });
  }

  requestPost$(httpRequest: HttpRequestModel): Observable<any> {
    return this.http.request('POST', httpRequest.fullUrl, {
      headers: this._authHeaders(),
      body: { ...httpRequest.body },
      params: { ...httpRequest.fullParams },
      observe: 'response',
      responseType: 'blob',
    });
  }
}
