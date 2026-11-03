export interface ValidateEmail {
    code : string,
    emailVerificationId : number
}

export class ValidateEmailClass implements ValidateEmail{
    constructor (
        public code : string,
        public emailVerificationId : number,
    ){}
}