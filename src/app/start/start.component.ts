import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { StartGroupCreateComponent } from '../start-group-create/start-group-create.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  @ViewChild(StartGroupCreateComponent)
  public readonly modal: StartGroupCreateComponent;

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
