import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { GroupService } from './../services/group.service';

@Component({
  selector: 'create-group',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;
  private group: Group;
  private user: User;
  // encrypt this?
  private confirmPassword: String;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  constructor(private teamService: GroupService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  getRandomColor(): String {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
