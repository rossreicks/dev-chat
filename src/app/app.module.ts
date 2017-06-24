import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { ChatNavComponent } from './chat-nav/chat-nav.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatStatusComponent } from './chat-status/chat-status.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { StartGroupCreateComponent } from './start-group-create/start-group-create.component';
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
    StartComponent,
    LoginComponent,
    StartGroupCreateComponent,
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
