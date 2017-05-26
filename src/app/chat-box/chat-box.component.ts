import { Component, OnInit, Input } from '@angular/core';
import { MessageService, Message } from '../services/message.service';
import { UserService, User } from '../services/user.service';
import { Team } from '../services/team.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input()
  team: Team;


  currentUser: User;

  constructor(
    private messageService: MessageService,
    private userService: UserService) {
      this.currentUser = this.userService.getUser();
      this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

  ngOnInit() {
  }

  sendMessage(data: string) {
    let message: Message = new Message(this.currentUser, data, new Date());
    this.messageService.post(message).subscribe();
  }

}
