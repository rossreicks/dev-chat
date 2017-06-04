import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';

import { Group } from '../models/group.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  group: Group;

  constructor(private teamService: GroupService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.teamService.getGroup(params['groupName']))
    .subscribe(group => {
      this.group = group;
    });
  }

}
