import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { Thread, User, Message } from '../../services/models';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() thread: Thread;

  currentUser: User;

  constructor(
    private messageService: MessageService,
    private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    }

  ngOnInit(): void {
  }

  sendMessage(data: string): void {
    let message: Message = {
          id: -1,
          user: this.thread.users[this.thread.users.map(x => x.id).indexOf(this.currentUser.id)],
          data: data,
          timestamp: new Date(),
          threadId: this.thread.id
    };
    this.messageService.post(message).subscribe();
  }

}
