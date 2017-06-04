import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IMessage, IUser, IGroup, IThread, IGroupCreate } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService {

  public serverUrl: string = 'http://192.254.190.129:3000/api/';

  constructor(private http: Http) { }

  createGroup(groupCreateForm: IGroupCreate): Observable<IGroup> {
      return this.http.post(this.serverUrl + 'group', groupCreateForm).map(res => res.json());
  }

  getGroup(groupId: number): Observable<IGroup> {
      return this.http.get(this.serverUrl + 'group/' + groupId).map(res => res.json());
  }

}
