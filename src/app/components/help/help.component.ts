import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  header = 'Help';
  @Output() onclose = new EventEmitter();

  steps = [
    {
      "name":"Loading An Existing Project", 
      "tasks":
        [
          "To load an existing project click the \"Load Project\" button", 
          "This button is located in the top right corner [or top on mobile] of the screen", 
          "Upon successful import of a .ccsproject file, any answered questions and project/system details will appear. If you attempt to import an invalid file, nothing will occur"
        ]
    },
    {
      "name":"Saving Your Progress", 
      "tasks":
        [
          "To save your progress, once you've entered a valid project number, you can click the \"Save Project\" button", 
          "This will download a file that you can use to continue this project anywhere you [or someone else] has access to the scope generator.",
          "You should save this file to a teams folder so that it is held in the cloud. [Sorry, haven't implemented fancy features like that yet...]"
        ]
    },
    {
      "name":"Generating A Scope", 
      "tasks":
        [
          "Once you have completed all of the available questions, you will see the \"Generate Scope\" button at the bottom of the page", 
          "Press this to generate a new scope document.", "Once generated a download button will appear", 
          "Clicking this button will download a file containing a simple text file that can be imported into the CCS SOW template"
        ]
    }
  ]

  close() {
    this.onclose.emit();
  }
}
