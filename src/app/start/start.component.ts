import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleGroupCreateForm(): void {
    this.groupCreateForm = !this.groupCreateForm;
  }

}
