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
      let availableTeams = JSON.parse(localStorage.getItem('currentUser')).user.teams;
      let index = availableTeams.map(x => x.name).indexOf(x['teamName']);
      if(index !== -1) {
        this.teamService.getTeam(availableTeams[index].id).subscribe(team => {
        this.team = team;
        let threadName = x['threadName'];
        let index = this.team.threads.map(y => y.name).indexOf(threadName);
        if(index !== -1) {
          this.thread = this.team.threads[index];
        }
      });
      } else {
        console.log('not authorized to view this team');
      }
    });
  }

}
