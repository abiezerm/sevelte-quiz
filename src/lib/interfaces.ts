export interface QuizResponse {
    response_code: number;
    results:       Question[];
}

export interface Question {
    type:              Type;
    difficulty:        Difficulty;
    category:          Category;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum Category {
    EntertainmentMusic = "Entertainment: Music",
}

export enum Difficulty {
    Medium = "medium",
}

export enum Type {
    Multiple = "multiple",
}
