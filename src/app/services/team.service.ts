import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Team, TeamCreate } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {

  public serverUrl: string = 'api/';

  constructor(private http: Http) { }

  createTeam(teamCreateForm: TeamCreate): Observable<any> {
      return this.http.post(this.serverUrl + 'teams', teamCreateForm).map(res => {
          localStorage.setItem('token', res.json().token);
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
          return res.json()
      });
  }

  getTeam(teamId: number): Observable<Team> {
      return this.http.get(this.serverUrl + 'teams/' + teamId).map(res => res.json());
  }

}
