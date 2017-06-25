import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './services/guards/index';

const appRoutes: Routes = [
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'chat/:teamName/:threadName', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
