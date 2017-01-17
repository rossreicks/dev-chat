import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../services/user.service';
import { Team, TeamService } from './../services/team.service';

@Component({
  selector: 'app-start-group-create',
  templateUrl: './start-group-create.component.html',
  styleUrls: ['./start-group-create.component.css']
})
export class StartGroupCreateComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;

  team: FormGroup;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.team = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(65)]),
      description: new FormControl(''),
      user: new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        icon: new FormControl('')
      })
    });
  }

  onSubmit() {
    let formTeam = this.team.value;
    let formUser = formTeam.user;
    let user = new User(formUser.username, formUser.email, this.getRandomColor());
    let team = new Team(formTeam.name, user, formTeam.description);
    this.teamService.createTeam(team).subscribe();
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
