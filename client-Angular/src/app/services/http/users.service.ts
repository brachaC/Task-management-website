import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Observable } from 'rxjs';
import { IUser } from '../../model/user';
import { HttpRequestModel } from '../../model/http-request.model';

@Injectable({  providedIn: 'root'})
export class UsersService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}users/`;
   }

   getUsers$(): Observable<IUser[]> {
       return this.get$<IUser[]>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'getusers',
      }));
    }

    addUser$(user: IUser): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'adduser',
        body:user
      }));
    }

   deleteUser$(userId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteuser',
        params:{userId}
      }));
    }
}
