import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms'; 
import { Project, Question, QuestionList, System } from '../classes/classes';
import { signal, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  //passed from main app component
  @Input() questions:QuestionList = new QuestionList;
  @Input() project:Project = new Project;  
  
  //placeholders for project details to prompt the user
  projectNumberPlaceholder:string | string = 'PR-XXXXX';
  projectDescriptionPlaceholder:string | string ='a new building, an existing room to update';
  projectClientNamePlaceholder:string | string ='company, school, entity name';

  systemSelected = signal<number>(0);

  //holds the value of the custom details
  customDetails:string | string = '';
  
  //lets us validate the form input
  details!:FormGroup;

  //project error messages
  projectNumberRequiredMessage = 'A project number is required!!';
  projectNumberInvalidMessage = 'Please enter a valid project number!!';

  ngOnInit() {
        //generate form group to validate input
        this.details = new FormGroup({
          projectnumber: new FormControl('', [Validators.required, Validators.pattern(/[Pp][Rr]-[\d]+$/)]) 
        });
    
        //set defaults for generation to placeholders
        this.project.clientname = this.projectClientNamePlaceholder;
        this.project.description = this.projectDescriptionPlaceholder;
        this.project.number = this.projectNumberPlaceholder;
  }

  onProjectInput(sender:string, event:Event): void {
    if (sender == 'number') { this.project.number = (event.target as HTMLInputElement).value; }
    else if (sender == 'client') { this.project.clientname = (event.target as HTMLInputElement).value; }
    else if (sender == 'description') { this.project.description = (event.target as HTMLInputElement).value; }
  }

  onSystemInput(sender:string, system:System, event:Event): void {
    if (sender == 'name') { system.name = (event.target as HTMLInputElement).value; }
    else if (sender == 'details') { system.customDetails = (event.target as HTMLInputElement).value; }
    else if (sender == 'description') { system.description = (event.target as HTMLInputElement).value; }
  }

  onAddNewSystem():void {
    let system = new System;
    //create a copy of the system questions because we dont want all systems to view the same object.
    system.questions = JSON.parse(JSON.stringify(this.questions));
    this.project.systems.push(system);
    //set the page to the current system the user just added
    this.systemSelected.set(this.project.systems.length - 1);
  }

  onDeleteSystem(system: System):void {
    let index = this.project.systems.indexOf(system);
    //set the selected system to 0 if we deleted all but one system so that we dont show no tab by accident
    if (this.project.systems.length == 1) { this.systemSelected.set(0); }
    //if the system to delete is the last one in the list, then we should set systemselected to the new last project in the list
    else if ((this.project.systems.length - 1) == index) { this.systemSelected.set(this.project.systems.length - 2); }
    //delete the item
    this.project.systems.splice(index, 1);
  }

  onSelectSystem(index: number) {
    this.systemSelected.set(index);
  }

}
