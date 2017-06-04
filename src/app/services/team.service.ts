import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from './user.service';
import { Group } from '../models/group.model';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {

  public serverUrl: string = 'http://192.168.0.50:3000/api/';

  constructor(private http: Http) { }

  createTeam(group: Group): Observable<Group> {
      return this.http.post(this.serverUrl + 'teams', group).map(res => res.json());
  }

  getTeam(groupName: string): Observable<Group> {
      return this.http.get(this.serverUrl + 'teams/' + groupName).map(res => res.json());
  }

}
