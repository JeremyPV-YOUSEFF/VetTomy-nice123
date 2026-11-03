export interface ValidateEmailToken {
    emailToken : string;
}

export class ValidateEmailTokenClass {
    constructor( public emailToken : string) {
    }
}