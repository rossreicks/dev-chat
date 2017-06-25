import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import { AuthenticationService } from './auth.service';

import { Message, User } from './models';

@Injectable()
export class MessageService {

  newMessage: Subject<Message> = new Subject<Message>();

  ws: WebSocket = new WebSocket('ws://localhost:8080', 'echo-protocol');

  public serverUrl: string = 'api/';

  constructor(private http: Http, private authService: AuthenticationService) {
    this.ws.onmessage = (event) => {
      this.newMessage.next(JSON.parse(event.data) as Message);
    };
  }

  post(message: Message): Observable<Message> {
    let auth = this.authService.createAuthorizationHeader();
    
    return this.http.post(this.serverUrl + 'messages', message, {headers: auth}).map(res => {
      this.sendMessage(res.json() as Message);
      return res.json()
    });
  }

  delete(message: Message): Observable<Message> {
    return this.http.delete(this.serverUrl + 'messages').map(res => res.json());
  }

  getAll(threadId: number, teamId: number): Observable<Message[]> {
    let auth = this.authService.createAuthorizationHeader();
    return this.http.get(this.serverUrl + 'messages/' + teamId + '/' + threadId, {headers: auth})
    .map(messages => messages.json() as Message[]);
  }

  get(id: number): Observable<Message> {
    return this.http.get(this.serverUrl + 'messages/{id}').map(res => res.json() as Message);
  }

  sendMessage(message: Message): void {
    this.ws.send(JSON.stringify(message));
  }

}
