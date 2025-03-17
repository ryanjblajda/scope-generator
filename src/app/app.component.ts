import { Component, OnInit, Signal } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionList, Question, Project, BrowserData } from './components/classes/classes';
import { LocalStorageService } from './service/localstorage/localstorage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe],
})

export class AppComponent implements OnInit {
  title = 'Functional Scope Generator';

  projectNumberPattern = new RegExp(/[Pp][Rr]-[\d]+$/);

  browserData!:BrowserData;
  project:Project = new Project;
  questions:QuestionList = new QuestionList;

  //shows a wait or error screen as needed
  loaded = signal<boolean>(false);
  loading = signal<boolean>(true);
  showLoadProjectDialog = signal<boolean>(false);
  savedProject = signal<boolean>(false);
  help = signal<boolean>(false);

  //error message texts
  errorHeader = 'Error';
  errorMessage = 'Please contact Ryan B. apparently something has gone terribly wrong, and the questions list cannot be loaded.';

  loadExistingHeader = 'Error Loading Project Data';
  loadExistingProjectMessage = '';
  loadExistingError = signal<boolean>(false);
  errorTimeout = 5000;

  //loading message texts
  loadingHeader = 'Loading';
  loadingMessage = 'Please wait, the question list is loading...';

  //lets the user know when the scope is ready to download
  downloadReady = signal<boolean>(false);
  downloadName = signal<string>('scope.txt');
  downloadURL = signal<string>('/scope.txt');

  //lets us grab the json scope questions as text
  private httpClient: HttpClient;
  private localBrowserStorage: LocalStorageService;
  private datePipe: DatePipe;

  constructor(http: HttpClient, localStore: LocalStorageService, datePipe: DatePipe) {
    this.httpClient = http;
    this.localBrowserStorage = localStore;
    this.datePipe = datePipe;
  }

  ngOnInit() {
    //attempt to load the question json so we can generate the body of the page
    this.getQuestionList();
  }

  getQuestionList():void {
    try {
      this.httpClient.get('assets/scope_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
          //set success true will only occur if the catch block doesn't fire
          //setTimeout(() => {
          this.project.systems.forEach(system => {
            system.questions = JSON.parse(JSON.stringify(this.questions));
          });
          this.loaded.set(true);
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

  checkCurrentProjectNumber():boolean {
    if (this.project.number != undefined) {
      if (this.projectNumberPattern.test(this.project.number) && this.project.number.length >= 8) {
        return true;
      }
      else { console.log('invalid project name'); }
    }
    else { console.log('undefined project name'); }
    return false;
  }
  
  exportCurrentProject(): void {
    if (this.checkCurrentProjectNumber()) {
      let config = JSON.stringify(this.project);
      let file = new Blob([config], {type: '.ccsproject'});
      let url = URL.createObjectURL(file);
      let link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      let now = this.datePipe.transform(new Date(), 'MM-dd-yyyy_HH-mm-ss');
      link.download = `${this.project.number.toLowerCase()}_${now}.ccsproject`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  onLoadProjectError(error:string) {
    this.loadExistingProjectMessage = error;
    this.loadExistingError.set(true);
    setTimeout(() => {
      this.loadExistingError.set(false);
    }, this.errorTimeout);
  }

  loadExistingProject():void {
    this.showLoadProjectDialog.set(true);
  }

  closeLoadProject() {
    this.showLoadProjectDialog.set(false);
  }

  loadProject(project:Project) {
    //console.log(project);
    this.showLoadProjectDialog.set(false);
    this.project = project;
    console.log('Loaded Project from Dialog');
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
      scope += system.name + "\r\n\r\n" + system.description + "\r\n\r\n";
      scope += this.parseResponses(system.questions);
      //only add the custom details section if there is data there
      if (system.customDetails.length > 0) { scope += `${system.name} Custom Requirements\r\n\r\n\t` + system.customDetails + '\r\n'; }
    });
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
    this.downloadName.set(`${this.project.number.toLowerCase()}_${this.project.clientname}_functional_scope.txt`.replaceAll(" ", "_").toLowerCase());
    this.downloadReady.set(true);
  }

  downloaded(): void {
    this.downloadReady.set(false);
  }
}
