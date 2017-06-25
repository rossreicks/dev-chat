import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { Team, User, Thread } from '../../services/models';

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
    
  }

  ngOnInit(): void {
    this.threads = this.team.threads;
    this.users = [].concat.apply([], this.threads.map(x => x.users));
    let curId = JSON.parse(localStorage.getItem('currentUser')).user.id;
    let index = this.users.map(x => x.id).indexOf(curId);
    if(index < 0 ){
      throw "User is not part of this team, should redirect in the future";
    }
    this.currentUser = this.users[index];
    
  }

}
