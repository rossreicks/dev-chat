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
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { GroupService} from './services/group.service';
import { StartComponent } from './start/start.component';
import { StartLoginComponent } from './start-login/start-login.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ChatNavComponent,
    ChatThreadsComponent,
    ChatBoxComponent,
    ChatStatusComponent,
    StartComponent,
    StartLoginComponent,
    GroupCreateComponent,
    ChatComponent
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

  providers: [appRoutingProviders, MessageService, UserService, GroupService ],
})
export class AppModule { }
