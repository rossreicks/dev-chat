import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IMessage, IUser, ITeam, IThread, ITeamCreate } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {

  public serverUrl: string = 'http://localho/api/';

  constructor(private http: Http) { }

  createTeam(teamCreateForm: ITeamCreate): Observable<ITeam> {
      console.log(teamCreateForm);
      return this.http.post(this.serverUrl + 'teams', teamCreateForm).map(res => res.json());
  }

  getTeam(teamId: number): Observable<ITeam> {
      return this.http.get(this.serverUrl + 'teams/' + teamId).map(res => res.json());
  }

}
