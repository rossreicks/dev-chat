import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

import { Message, User } from './models';

@Injectable()
export class MessageService {

  newMessage: Subject<Message> = new Subject<Message>();

  ws: WebSocket = new WebSocket('ws://127.0.0.1:3000', 'echo-protocol');

  public serverUrl: string = 'http://127.0.0.1:3000/api/';

  constructor(private http: Http) {
    this.ws.onmessage = (event) => {
      this.newMessage.next(JSON.parse(event.data) as Message);
    };
  }

  post(message: Message): Observable<Message> {
    this.sendMessage(JSON.stringify(message));
    return this.http.post(this.serverUrl + 'messages', message).map(res => res.json());
  }

  delete(message: Message): Observable<Message> {
    return this.http.delete(this.serverUrl + 'messages').map(res => res.json());
  }

  getAll(threadName: string, teamId: number): Observable<Message[]> {
    return this.http.get(this.serverUrl + 'messages/' + teamId + '/' + threadName).map(messages => messages.json() as Message[]);
  }

  get(id: number): Observable<Message> {
    return this.http.get(this.serverUrl + 'messages/{id}').map(res => res.json() as Message);
  }

  sendMessage(message): void {
    this.ws.send(message);
  }

}
