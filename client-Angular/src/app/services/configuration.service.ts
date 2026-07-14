import { EventEmitter, inject, Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
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
    return firstValueFrom(
      combineLatest([
        this.http.get<IpConfig>(`${path}/ipConfig.json`),
        this.http.get<SettingsConfig>(`${path}/settingsConfig.json`)
      ]).pipe(
        tap(response => console.log('Config loaded:', response)),
        tap(([ipConfig, settingsConfig]) => {
          this.ips = ipConfig;
          this.settingConfig = settingsConfig;
        }),
        tap(_ => this.initWS()),
        catchError(err => {
          console.error('Failed to load configuration files:', err);
          throw err;
        })
      )
    );
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
