import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService} from '../../services/team.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Thread, User} from '../../services/models';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css']
})
export class ChatNavComponent implements OnInit {
  @Input()
  thread: Thread;

  constructor() { }

  ngOnInit() {
  }

}
