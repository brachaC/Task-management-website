import { EventEmitter, inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { IpConfig } from '../model/ip-config';
import { SettingsConfig } from '../model/settings';
import { WebsocketService } from './http/web-socket.service';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  ips: IpConfig = {} as IpConfig;
  settingConfig: SettingsConfig = {} as SettingsConfig;
  http = inject(HttpClient);
  messageEvent = new EventEmitter<string>();
  importantEvent = new EventEmitter<string>();
  private websocketService = inject(WebsocketService);

  initConfiguration(path:string): Promise<any> {
    
    return combineLatest(
      this.http.get<IpConfig>(`${path}/ipConfig.json`),
      this.http.get<SettingsConfig>(`${path}/settingsConfig.json`)
    ).pipe(
      tap(response => console.log(response)),
      tap(response => [this.ips, this.settingConfig] = response),
      tap(_ => this.initWS())
    ).toPromise();
  }

    initWS(){
      const wsUrl = this.ips.webSocketPath ; 
      this.websocketService.init(wsUrl);
      this.websocketService.messages
      .subscribe( (msg )  => {
        if(msg.topic==='message'){
          this.messageEvent.emit(msg.data)
            console.log("Response from websocket: " + msg);
        }
        if(msg.topic==='important'){
          this.importantEvent.emit(msg.data);
          console.log("Response from websocket: " + msg);
      }
    });
  }
}
