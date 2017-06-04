import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

import { Message, User } from './models';

@Injectable()
export class MessageService {

  newMessage: Subject<Message> = new Subject<Message>();

  ws: WebSocket = new WebSocket('ws://192.168.0.50:3000', 'echo-protocol');

  public serverUrl: string = 'http://192.168.0.50:3000/api/';

  constructor(private http: Http) {
    this.ws.onmessage = (event) => {
      this.newMessage.next(JSON.parse(event.data) as Message);
    };
  }

  post(message: Message) {
    this.sendMessage(JSON.stringify(message));
    return this.http.post(this.serverUrl + 'messages', message).map(res => res.json());
  }

  delete(message: Message) {
    return this.http.delete(this.serverUrl + 'messages').map(res => res.json());
  }

  getAll(threadId: string): Observable<Message[]> {
    return this.http.get(this.serverUrl + 'messages/' + threadId).map(messages => messages.json() as Message[]);
  }

  get(id: number): Observable<Message> {
    return this.http.get(this.serverUrl + 'messages/{id}').map(res => res.json() as Message);
  }

  sendMessage(message) {
    this.ws.send(message);
  }

}
