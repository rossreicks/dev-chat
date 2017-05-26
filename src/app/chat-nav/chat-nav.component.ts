import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { TeamService, Team } from '../services/team.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css']
})
export class ChatNavComponent implements OnInit {
  @Input()
  team: Team;

  showModal: boolean;

  constructor(
    private userService: UserService,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
    this.showModal = false;
  }

  ngOnInit() {
  }

  changeUser(name: string) {
    this.userService.setUser(new User(name, '', this.getRandomColor()));
  }

  toggleModal() {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
