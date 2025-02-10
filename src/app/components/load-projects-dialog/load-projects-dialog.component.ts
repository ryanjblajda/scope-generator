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
  @Output() onerror = new EventEmitter();
  @Output() onclose = new EventEmitter<string>();
  
  header = 'Load Project';
  fileName = null;
  selected = signal<number>(-1);

  onSelectProject(index: number) {
    this.selected.set(index);
  }

  onFileUpload(event:any): void {
    //console.log(event);
    try {
      let file = event.target.files[0];
      let reader = new FileReader();
      try {
        reader.onload = (e: any) => {
          const fileContent = e.target.result;
          // Do something with the file content
          //console.log(fileContent);

          try {
            let imported = JSON.parse(fileContent) as Project;
            this.onprojectselected.emit(imported);
          }
          catch(json) {
            console.log(json);
            this.onerror.emit(json);
          }
        };
  
        reader.readAsText(file); // Read the file as text
      }
      catch(reader) {
        console.log(reader);
      }
    }
    catch(file) {
      console.log(file);
    }
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
