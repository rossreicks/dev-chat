import { Component, OnInit, ViewChild } from '@angular/core';

import { StartGroupCreateComponent } from '../start-group-create/start-group-create.component';
import { User, UserService } from '../services/index';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  @ViewChild(StartGroupCreateComponent)
  public readonly modal: StartGroupCreateComponent;

  public groupCreateForm: Boolean = false;

    currentUser: User;
    users: User[] = [];
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit(): void {
        this.loadAllUsers();
    }
    deleteUser(id: number): void {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    toggleGroupCreateForm(): void {
        this.groupCreateForm = !this.groupCreateForm;
    }
    private loadAllUsers(): void {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}
