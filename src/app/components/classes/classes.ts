export class QuestionList {
    sections:Section[] | Section[] = [];
}

export class Section {
    name!:string;
    questions: Question[] | Question[] = [];
}

export class Question {
    name!:string;
    prompt!:string;
    answers:Answer[] | Answer[] = [];
}

export class Answer {
    prompt!:string;
    scope!:string;
    selected!:boolean;
    questions:Question[] | Question[] = [];
}

export class System {
    questions:QuestionList | QuestionList = new QuestionList;
    name:string | string = "System Name";
    description:string | string = 'a small huddle room, lecture hall, boardroom';
    customDetails:string | string = '';
}

export class Project {
    systems:System[] | System[] = [new System()]
    number:string | string = "PR-XXXXX";
    clientname:string | string = 'Project Client Name';
    description: string | string = 'Project Description';
}

export class BrowserData {
    projects:Project[] | Project[] = []
}