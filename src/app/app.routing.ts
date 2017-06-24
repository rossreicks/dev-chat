import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { StartGroupCreateComponent } from './start-group-create/start-group-create.component';
import { AuthGuard } from './services/guards/index';

const appRoutes: Routes = [
  { path: '', component: StartComponent, canActivate: [AuthGuard] },
  { path: 'register', component: StartGroupCreateComponent },
  { path: 'chat/:teamId/:threadName', component: ChatComponent},
  { path: 'chat/:teamId', component: ChatComponent},
  { path: 'login', component: LoginComponent},
  { path: 'start', component: StartComponent},
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
