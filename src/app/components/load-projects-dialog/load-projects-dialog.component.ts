import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { BrowserData, Project } from '../classes/classes';

@Component({
  selector: 'app-load-projects-dialog',
  templateUrl: './load-projects-dialog.component.html',
  styleUrls: ['./load-projects-dialog.component.scss']
})
export class LoadProjectsDialogComponent {
  @Input() data:BrowserData = new BrowserData;
  @Output() onprojectselected = new EventEmitter<Project>();
  @Output() onclose = new EventEmitter();
  
  header = 'Select A Local Project';
  selected = signal<number>(-1);

  onSelectProject(index: number) {
    this.selected.set(index);
  }

  loadSelectedProject() {
    if (this.selected() != -1) {
      this.onprojectselected.emit(this.data.projects[this.selected()]);
    }
  }

  close() {
    this.onclose.emit();
  }
}
