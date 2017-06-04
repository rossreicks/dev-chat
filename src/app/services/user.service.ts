import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { IUser } from './models';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  currentUser: Subject<IUser> = new Subject<IUser>();

  constructor() {
      this.currentUser.next(this.getUser());
  }

  setUser(user: IUser): void {
      this.currentUser.next(user);
      localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser {
      let user = localStorage.getItem('user');
      if (user == null) {
          return;
      }
      return JSON.parse(user);
  }

}
