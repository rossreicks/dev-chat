import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from './user.service';
import { Message } from './message.service';

@Injectable()
export class TeamService {

  public serverUrl: string = 'http://192.168.0.50:3000/api/';

  constructor(private http: Http) { }

  createTeam(team: Team) {
      return this.http.post(this.serverUrl + 'teams', team).map(res => res.json());
  }

  getTeam(teamName: string) {
      return this.http.get(this.serverUrl + 'teams/' + teamName).map(res => res.json());
  }

}

export class Team {
    constructor(
        public name: string,
        public owner: User,
        public description?: string,
        public _id?: string,
        public threads?: Thread[],
        public users?: User[]
        ) { }
};

export class Thread {
    constructor(
        public name: string,
        public description: string,
        public users?: User[],
        public messages?: Message[],
        public _id?: string
    ) { }
}
