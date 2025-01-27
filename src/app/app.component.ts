import { Component, computed, OnInit } from '@angular/core';
//import data from '../assets/scope_questions.json';
import { Project, Question, QuestionList, System } from './components/classes/classes';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Functional Scope Generator';

  project:Project = new Project;
  questions:QuestionList = new QuestionList;
  
  //placeholders for project details to prompt the user
  projectNumberPlaceholder:string | string = 'PR-XXXXX';
  projectDescriptionPlaceholder:string | string ='a new building, an existing room to update';
  projectClientNamePlaceholder:string | string ='company, school, entity name';

  systemSelected = signal<number>(0);

  //shows a wait or error screen as needed
  success = signal<boolean>(false);
  loading = signal<boolean>(true);
  
  //lets the user know when the scope is ready to download
  downloadReady = signal<boolean>(false);
  downloadName = signal<string>('scope.txt');
  downloadURL = signal<string>('/scope.txt');

  //lets us validate the form input
  details!:FormGroup;

  projectNumberRequiredMessage = 'A project number is required!!';
  projectNumberInvalidMessage = 'Please enter a valid project number!!';

  //lets us grab the json scope questions as text
  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit() {
    //generate form group to validate input
    this.details = new FormGroup({
      projectnumber: new FormControl('', [Validators.required, Validators.pattern(/[Pp][Rr]-[\d]+$/)]) 
    });

    //set defaults for generation to placeholders
    this.project.clientname = this.projectClientNamePlaceholder;
    this.project.description = this.projectDescriptionPlaceholder;
    this.project.number = this.projectNumberPlaceholder;

    //attempt to load the question json so we can generate the body of the page
    try {
      this.httpClient.get('assets/scope_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
          //set success true will only occur if the catch block doesnt fire
          //setTimeout(() => {
          this.project.systems.forEach(system => {
            system.questions = JSON.parse(JSON.stringify(this.questions));
          })
          this.success.set(true);
          //}, 1000);
        }
        catch(error) {
          console.log(error);
        }
      });
    }
    catch(error) {
      console.log(error);
    }
    //set loading false so the fatal error message comes up if needed
    //setTimeout(() => {
      this.loading.set(false);
    //}, 3000);
  }

  parseQuestionRecursive(questions:Question[]): string {
    let questionTextData:string = "";
    //loop through all the questions
    
    questions.forEach(question => {
      //loop through all the answers for the question we are on
      
      question.answers.forEach(answer => {
        //only return an answer if its selected
        if (answer.selected) {
          //if the scope field is empty, return the question prompt instead.
          if (answer.scope.length > 0) { questionTextData += answer.scope + " "; }
          else { 
            if (answer.prompt.toLowerCase() == "no" || answer.prompt.toLowerCase() == "yes") { /* dont return anything */ }
            else { questionTextData += answer.prompt + " ";   }
          }
          //if the answer has children questions, parse recursively
          if (answer.questions != undefined) {
            if (answer.questions.length > 0) { questionTextData += this.parseQuestionRecursive(answer.questions); + "\r\n"; }
          }
        }
      });
    });
    
    //return the string
    return questionTextData;
  }

  parseResponses(list:QuestionList): string {
    let fileTextData:string = "";
    //loop through each section
    
    list.sections.forEach(section => {
      //grab the section name
      fileTextData += section.name + "\r\n\t";
      //parse all the questions for this section recursively
      fileTextData += this.parseQuestionRecursive(section.questions) + "\r\n\r\n";
    });
    //return the completed scope
    
    return fileTextData;
  }

  generateScope():string {
    //create the initial string, and generate the header details
    let scope:string = `CCS Presentation Systems\r\n\r\n${this.project.clientname}\r\n${this.project.number} // ${this.project.description}\r\n\r\nFunctional Programming Scope\r\n\r\n`;
    //generate the main body of the scope, looping through every single system in the project
    this.project.systems.forEach(system => {
      scope += "\r\n\r\n" + system.name + "\r\n\r\n" + system.description + "\r\n\r\n";
      scope += this.parseResponses(system.questions);
      scope += "Custom Requirements\r\n\r\n\t" + system.customDetails + "\r\n\r\n";
    });

    return scope;
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

  onGenerateScopeClicked():void {
    //console.log(this.questions);
    //parse the responses from the end user
    let scope = this.generateScope();
    //print it for me
    //console.log(scope);
    //generate a new file to download
    let file = new Blob([scope], {type: '.txt'});
    this.downloadURL.set(URL.createObjectURL(file));
    this.downloadName.set(`${this.project.number.toUpperCase()}_${this.project.clientname}_functional_scope.txt`.replaceAll(" ", "_").toLowerCase());
    this.downloadReady.set(true);
  }

  downloaded(): void {
    this.downloadReady.set(false);
  }
}
