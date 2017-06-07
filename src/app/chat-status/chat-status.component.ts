import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { ITeam, IUser, IThread } from '../services/models';

@Component({
  selector: 'app-chat-status',
  templateUrl: './chat-status.component.html',
  styleUrls: ['./chat-status.component.css']
})
export class ChatStatusComponent implements OnInit {
  @Input()
  team: ITeam;

  currentUser: IUser;
  users: IUser[];
  threads: IThread[];

  constructor(private userService: UserService) {
    this.currentUser = userService.getUser();
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.users = this.team.users;
    this.threads = this.team.threads;
  }

}
