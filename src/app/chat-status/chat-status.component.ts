import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { Thread } from '../models/thread.model';
import { IThread, IUser } from '../services/models';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-chat-status',
  templateUrl: './chat-status.component.html',
  styleUrls: ['./chat-status.component.css']
})
export class ChatStatusComponent implements OnInit {
  @Input()
  group: Group;

  currentUser: User;
  users: IUser[];
  threads: IThread[];

  constructor(private userService: UserService) {
    this.currentUser = userService.getUser();
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.users = this.group.users;
    this.threads = this.group.threads;
  }



}
