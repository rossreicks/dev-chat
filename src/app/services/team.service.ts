import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Team, TeamCreate } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {

  public serverUrl: string = 'http://127.0.0.1:3000/api/';

  constructor(private http: Http) { }

  createTeam(teamCreateForm: TeamCreate): Observable<Team> {
      console.log(teamCreateForm);
      return this.http.post(this.serverUrl + 'teams', teamCreateForm).map(res => res.json());
  }

  getTeam(teamId: number): Observable<Team> {
      return this.http.get(this.serverUrl + 'teams/' + teamId).map(res => res.json());
  }

}
