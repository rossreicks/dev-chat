import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { ChatNavComponent } from './chat/chat-nav/chat-nav.component';
import { ChatThreadsComponent } from './chat/chat-threads/chat-threads.component';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { ChatStatusComponent } from './chat/chat-status/chat-status.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { AlertComponent } from './alert/alert.component';

import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { TeamService} from './services/team.service';
import { AuthenticationService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/guards/index';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ChatNavComponent,
    ChatThreadsComponent,
    ChatBoxComponent,
    ChatStatusComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
  ],
  providers: [
    appRoutingProviders,
    MessageService,
    UserService,
    TeamService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    ],
})
export class AppModule { }
