import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { UserService } from './user.service';
import { Group } from '../models/group.model';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService {

  public serverUrl: string = 'http://192.168.0.50:3000/api/';

  constructor(private http: Http) { }

  createGroup(group: Group): Observable<Group> {
      return this.http.post(this.serverUrl + 'group', group).map(res => res.json());
  }

  getGroup(groupName: string): Observable<Group> {
      return this.http.get(this.serverUrl + 'group/' + groupName).map(res => res.json());
  }

}
