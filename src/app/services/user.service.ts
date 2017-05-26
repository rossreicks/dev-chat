import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

  currentUser: Subject<User> = new Subject<User>();

  constructor() {
      this.currentUser.next(this.getUser());
  }

  setUser(user: User): void {
      this.currentUser.next(user);
      localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
      let user = localStorage.getItem('user');
      if (user == null) {
          return new User('', '');
      }
      return JSON.parse(user);
  }

}

export class User {
    constructor(
        public name: string,
        public email: string,
        public icon?: string,
        public _id?: string) { }
};
