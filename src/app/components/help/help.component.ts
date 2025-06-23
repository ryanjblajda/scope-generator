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
          "Upon successful import of a .ccsproject file, any answered questions and project/system details will appear",
          "Attempting to import any other type of file, or a corrupted .ccsproject file will result in an error message being displayed"
        ]
    },
    {
      "name":"Saving Your Progress", 
      "tasks":
        [
          "To save your progress, click the \"Save Project\" button", 
          "This will download a .ccsproject file that you can use to continue to work on this scope anywhere you [or someone else] has access to the scope generator",
          "You should save this file to a teams folder so that it is held in the cloud. [Sorry, haven't implemented any way to directly save it to the cloud or teams yet...]"
        ]
    },
    {
      "name":"Generating A Scope", 
      "tasks":
        [
          "Once you have completed all of the available questions, you will see the \"Generate Scope\" button at the bottom of the page", 
          "Pressing this will generate the scope of work based on how you answered the questions", 
          "Once the file is ready, a download button will appear on-screen", 
          "Clicking this button will download a plain text file, this can be imported into the CCS SOW template so the customer may agree to it, and sign off on it"
        ]
    }
  ]

  close() {
    this.onclose.emit();
  }
}
