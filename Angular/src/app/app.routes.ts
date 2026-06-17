import { Routes } from '@angular/router';
import { LoggedInGuardsService } from './services/logged-in-guards.service';
export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent)
       
    },
     
{
        path: 'main',
        loadComponent: () =>
          import('./main/main.component').then((m) => m.MainComponent),
         canActivate: [LoggedInGuardsService] ,       
children:[
           
            {
                path: 'tasks',
                loadComponent: () =>
                 import('./tasks/tasks.component').then((m) => m.TasksComponent),
                    
            },
            {
                path: 'about',
                loadComponent: () =>
                  import('./about/about.component').then((m) => m.AboutComponent),
                    
            },
            {
                path: 'users',
                loadComponent: () =>
                  import('./users/users.component').then((m) => m.UsersComponent),
                    
            },
            
         ]
            
    },
     {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent)
    },
   
  ];

