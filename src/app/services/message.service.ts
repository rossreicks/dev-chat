import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IMessage, IUser } from './models';

@Injectable()
export class MessageService {

  newMessage: Subject<IMessage> = new Subject<IMessage>();

  ws: WebSocket = new WebSocket('ws://192.254.190.129:3000', 'echo-protocol');

  public serverUrl: string = 'http://192.254.190.129:3000/api/';

  constructor(private http: Http) {
    this.ws.onmessage = (event) => {
      this.newMessage.next(JSON.parse(event.data) as IMessage);
    };
  }

  post(message: IMessage): Observable<IMessage> {
    this.sendMessage(JSON.stringify(message));
    return this.http.post(this.serverUrl + 'messages', message).map(res => res.json());
  }

  delete(message: IMessage): Observable<IMessage> {
    return this.http.delete(this.serverUrl + 'messages').map(res => res.json());
  }

  getAll(threadId: string): Observable<IMessage[]> {
    return this.http.get(this.serverUrl + 'messages/' + threadId).map(messages => messages.json() as IMessage[]);
  }

  get(id: number): Observable<IMessage> {
    return this.http.get(this.serverUrl + 'messages/{id}').map(res => res.json() as IMessage);
  }

  sendMessage(message): void {
    this.ws.send(message);
  }

}
