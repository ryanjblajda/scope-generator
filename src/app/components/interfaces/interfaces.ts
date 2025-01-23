export interface QuestionList {
    sections:Section[]
}

export interface Section {
    name:string;
    questions:Question[];
}

export interface Question {
    name:string;
    prompt:string;
    answers:Answer[];
}

export interface Answer {
    prompt:string;
    scope:string;
    selected:boolean;
    questions:Question[];
}