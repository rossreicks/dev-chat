import { Component, OnInit, ViewChild, Renderer, AfterViewInit, AfterViewChecked, ElementRef, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';
import { Team, Message } from '../../services/models';

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
      console.log(newMessage);
      this.appendMessage(newMessage);
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  appendMessage(newMessage: Message): void {
      this.messages.push(newMessage);
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.messageService.getAll(+params['threadId'], +params['teamId']))
    .subscribe(messages => {
      this.messages = messages;
    });
  }

  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  convertDate(date: Date): string {
    return moment().format('h:m A');
  }

}
