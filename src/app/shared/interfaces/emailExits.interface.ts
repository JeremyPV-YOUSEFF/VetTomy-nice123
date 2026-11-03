export interface IsValidEmail {
    valid : boolean;
}

export interface DontRepeatEmail {
    email : string
}

export class DontRepeatEmailClass {
    constructor(
        public email : string
    ) {}
}