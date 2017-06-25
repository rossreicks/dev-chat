import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from './../../services/models';
import { UserService } from './../../services/user.service';
import { AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(RegisterComponent)
  public readonly modal: RegisterComponent;
  
  loginForm: FormGroup;
  error: string;

  constructor(
    private userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public authenticationService: AuthenticationService,
    public alertService: AlertService) {

        this.loginForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
     }

    ngOnInit(): void {

    }

    login(): void {
        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                data => {
                    let teamName = data.json().teamName;
                    let threadName = data.json().threadName;
                    this.router.navigateByUrl('/chat/' + teamName + '/' + threadName);
                },
                error => {
                    this.error = error._body;
                });
    }

}
