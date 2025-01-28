import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserData, Project } from '../classes/classes';

@Component({
  selector: 'app-load-projects-dialog',
  templateUrl: './load-projects-dialog.component.html',
  styleUrls: ['./load-projects-dialog.component.scss']
})
export class LoadProjectsDialogComponent {
  @Input() data:BrowserData = new BrowserData;
  @Output() onprojectselected = new EventEmitter<Project>();

  header = 'Select A Project';
}
