import { Component, computed, OnInit } from '@angular/core';
//import data from '../assets/scope_questions.json';
import { Question, QuestionList } from './components/interfaces/interfaces';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Functional Scope Generator';

  questions!:QuestionList;
  
  projectNumberPlaceholder = signal<string>('PR-XXXXX');
  projectNumber!: string;
  projectDescriptionPlaceholder = signal<string>('a small huddle room');
  projectDescription!: string;
  projectClientNamePlaceholder = signal<string>('company or school name');
  projectClientName!: string;

  customDetails:string | string = '';

  success = signal<boolean>(false);
  loading = signal<boolean>(true);

  formCompleted = computed<boolean>(() => this.checkQuestionsStatus());
  
  downloadReady = signal<boolean>(false);
  downloadName = signal<string>('scope.txt');
  downloadURL = signal<string>('/scope.txt');

  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit() {
    //set defaults for generation to placeholders
    this.projectClientName = this.projectClientNamePlaceholder();
    this.projectDescription = this.projectDescriptionPlaceholder();
    this.projectNumber = this.projectNumberPlaceholder();
    //attempt to load the question json so we can generate the body of the page
    try {
      this.httpClient.get('assets/scope_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
          //set success true will only occur if the catch block doesnt fire
          //setTimeout(() => {
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

  checkQuestionsRecursive(questions: Question[]):boolean {
    let status = false;
    questions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.selected) {
          console.log('answer selected')
          status = true;
          return;
        }
      });
    });
    console.log(`return ${status}`)
    return status;
  }

  checkQuestionsStatus():boolean {
    let status = false;
    this.questions.sections.forEach(section => {
      status = this.checkQuestionsRecursive(section.questions);
    });
    return status;
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
      fileTextData += this.parseQuestionRecursive(section.questions) + "\r\n";
    });
    //return the completed scope
    return fileTextData;
  }

  generateScope():string {
    //create the initial string, and generate the header details
    let scope:string = `CCS Presentation Systems\r\n\r\n${this.projectClientName}\r\n${this.projectNumber} // ${this.projectDescription}\r\n\r\nFunctional Programming Scope\r\n\r\n`;
    //generate the main body of the scope
    scope += this.parseResponses(this.questions);
    //if the custom details section has a length, add it to the bottom of the scope
    if (this.customDetails.length > 0 ) { scope += `Custom Scope Requirements\r\n\r\n\t${this.customDetails}`; }
    return scope;
  }

  onInput(sender:string, event:Event): void {
    if (sender == 'project-num') { this.projectNumber = (event.target as HTMLInputElement).value; }
    else if (sender == 'project-client') { this.projectClientName = (event.target as HTMLInputElement).value; }
    else if (sender == 'project-description') { this.projectDescription = (event.target as HTMLInputElement).value; }
    else if (sender == 'custom-details') { this.customDetails = (event.target as HTMLTextAreaElement).value; }
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
    this.downloadName.set(`${this.projectNumber}_${this.projectClientName}_functional_scope.txt`.replaceAll(" ", "_").toLowerCase());
    this.downloadReady.set(true);
  }

  downloaded(): void {
    this.downloadReady.set(false);
  }
}
