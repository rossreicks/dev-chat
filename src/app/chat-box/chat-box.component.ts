import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { ITeam, IUser, IMessage } from '../services/models';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input()
  team: ITeam;

  currentUser: IUser;

  constructor(
    private messageService: MessageService,
    private userService: UserService) {
      this.currentUser = this.userService.getUser();
      this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

  ngOnInit(): void {
  }

  sendMessage(data: string): void {
    let message: IMessage = {
          id: -1,
          user: this.currentUser,
          data: data,
          timestamp: new Date()
    };
    this.messageService.post(message).subscribe();
  }

}
