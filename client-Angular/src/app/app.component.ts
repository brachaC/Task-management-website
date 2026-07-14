import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerStatusComponent } from './server-status/server-status.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, ServerStatusComponent]
})
export class AppComponent {}
