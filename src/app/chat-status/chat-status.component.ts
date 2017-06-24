import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Team, User, Thread } from '../services/models';

@Component({
  selector: 'app-chat-status',
  templateUrl: './chat-status.component.html',
  styleUrls: ['./chat-status.component.css']
})
export class ChatStatusComponent implements OnInit {
  @Input()
  team: Team;

  currentUser: User;
  users: User[];
  threads: Thread[];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.threads = this.team.threads;
    this.users = this.threads[0].users;
  }

}
