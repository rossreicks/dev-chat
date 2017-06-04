import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { GroupCreateComponent } from '../group-create/group-create.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  @ViewChild(GroupCreateComponent)
  public readonly modal: GroupCreateComponent;

  public groupCreateForm: Boolean = false;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
  }

  toggleGroupCreateForm(): void {
    this.groupCreateForm = !this.groupCreateForm;
  }

}
