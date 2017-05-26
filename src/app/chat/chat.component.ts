import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamService, Team } from '../services/team.service';
import { User } from '../services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  team: Team;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.teamService.getTeam(params['teamName']))
    .subscribe(team => {
      this.team = team;
    });
  }

}
