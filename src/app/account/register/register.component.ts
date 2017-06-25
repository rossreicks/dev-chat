import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, Team, TeamCreate } from '../../services/models';
import { TeamService } from '../../services/team.service';
import {AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errors: string;

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  constructor(private teamService: TeamService, public router: Router, public fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      nickname: [''],
      email: ['', Validators.required],
      icon: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
   }

  onSubmit(): void {
    console.log(this.form);
    let teamCreate: TeamCreate = this.form.value;
    teamCreate.icon = this.getRandomColor();
    this.teamService.createTeam(teamCreate).subscribe(res => {
      this.router.navigate(['chat', res.teamId, res.threadId])
    }, errors => {
      this.errors = "";
      errors.json().forEach(x => this.errors += x.msg);
    })
  }

  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
class PasswordValidation {

    static MatchPassword(AC: AbstractControl): void {
      let password = AC.get('password').value; // to get value in input tag
      let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if (password === '' || password !== confirmPassword) {
          AC.get('confirmPassword').setErrors( {MatchPassword: true} );
      } else {
          return null;
      }
    }
}
