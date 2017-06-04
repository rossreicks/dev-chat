import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input()

  currentUser: User;

  constructor(
    private messageService: MessageService,
    private userService: UserService) {
      this.currentUser = this.userService.getUser();
      this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

  ngOnInit(): void {
  }

  sendMessage(data: string): void {
    let message: Message = new Message(this.currentUser, data, new Date());
    this.messageService.post(message).subscribe();
  };

}
