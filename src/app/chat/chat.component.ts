import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.teamService.getTeam(x['teamId']).subscribe(team => {
        this.team = team;
        let threadId = +x['threadId'];
        let index = this.team.threads.map(y => y.id).indexOf(threadId);
        if(index !== -1) {
          this.thread = this.team.threads[index];

        }
      });
    });
  }

}
