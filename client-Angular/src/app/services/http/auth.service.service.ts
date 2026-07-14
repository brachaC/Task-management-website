import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceBase } from './http-service.base';
import { HttpRequestModel } from '../../model/http-request.model';

export interface LoginResponse {
  token: string;
  userName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.servicePath}auth/`;
  }

  login$({ userName, password }: { userName: string; password: string }): Observable<LoginResponse> {
    return this.post$<LoginResponse>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'login',
      body: { userName, password }
    }));
  }
}
