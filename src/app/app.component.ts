import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionList, Question } from './components/classes/classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Functional Scope Generator';
  
  //question list
  questions:QuestionList = new QuestionList;

  //shows a wait or error screen as needed
  success = signal<boolean>(false);
  loading = signal<boolean>(true);
  
  //lets the user know when the scope is ready to download
  downloadReady = signal<boolean>(false);
  downloadName = signal<string>('scope.txt');
  downloadURL = signal<string>('/scope.txt');

  //lets us grab the json scope questions as text
  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit() {
    //attempt to load the question json so we can generate the body of the page
    try {
      this.httpClient.get('assets/scope_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
          //set success true will only occur if the catch block doesnt fire
          //setTimeout(() => {
          //this.project.systems.forEach(system => {
          //  system.questions = JSON.parse(JSON.stringify(this.questions));
          //});s
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
      scope += "\r\n\r\n" + system.name + "\r\n\r\n" + system.description + "\r\n\r\n\t";
      scope += this.parseResponses(system.questions);
    });
    //if the custom details section has a length, add it to the bottom of the scope
    if (this.customDetails.length > 0 ) { scope += `Custom Scope Requirements\r\n\r\n\t${this.customDetails}`; }
    return scope;
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
