import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { GroupService } from './../services/group.service';
import { Router } from '@angular/router';
import { IGroupCreate } from '../services/models';

@Component({
  selector: 'create-group',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
    public visible = false;
    form: FormGroup;
    group: FormGroup;
    private visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visible = false, 300);
    }

    constructor(private groupService: GroupService, public router: Router, public fb: FormBuilder) {
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

    ngOnInit(): void {
    }

    onSubmit(): void {
        let groupCreate: IGroupCreate = this.form.value;
        groupCreate.icon = this.getRandomColor();
        this.groupService.createGroup(groupCreate).subscribe(team => this.router.navigate(['chat', team.id]));
    }

    getRandomColor(): string {
        return '#33333';
    }

}

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if ( password === '' || password !== confirmPassword )  {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} );
        } else {
            console.log('true');
            return null; ;
        }
    }
}
