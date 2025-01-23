export class QuestionList {
    sections!:Section[]
}

export class Section {
    name!:string;
    questions!:Question[];
}

export class Question {
    name!:string;
    prompt!:string;
    answers!:Answer[];
}

export class Answer {
    prompt!:string;
    scope!:string;
    selected!:boolean;
    questions!:Question[];
}