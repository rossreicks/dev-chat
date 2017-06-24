import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../services/team.service';
import { Team, Thread } from '../services/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  thread: Thread;
  team: Team;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.teamService.getTeam(+params['teamId']))
    .subscribe(team => {
      this.team = team;
    });
  }

}
