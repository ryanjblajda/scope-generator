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