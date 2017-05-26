/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartLoginComponent } from './start-login.component';

describe('StartLoginComponent', () => {
  let component: StartLoginComponent;
  let fixture: ComponentFixture<StartLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
