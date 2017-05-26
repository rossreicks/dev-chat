import { Component, OnInit, ViewChild, Renderer, AfterViewInit, AfterViewChecked, ElementRef, Input } from '@angular/core';
import { MessageService, Message } from '../services/message.service';
import * as moment from 'moment';
import { Team } from '../services/team.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('content') content: ElementRef;

  @Input()
  team: Team;

  messages: Message[];

  constructor(private renderer: Renderer,
              private messageService: MessageService,
              private route: ActivatedRoute) {
    this.messageService.newMessage.subscribe((newMessage) => {
      this.appendMessage(newMessage);
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom()
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  appendMessage(newMessage: Message) {
      this.messages.push(newMessage);
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.messageService.getAll(params['threadName']))
    .subscribe(messages => {
      this.messages = messages;
    });
  }

  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  convertDate(date: Date) {
    return moment().format('h:m A');
  }

}
