export interface RequestEmail {
    email : string
}

export interface SendEmailResponse{
    emailVerificationId : number,
    email               : string
}

export interface VerificCodeRequest {
    emailVerificationId : number,
    code                : string
}

export class VerificCodeRequestClass {
    constructor(
        public emailVerificationId : number,
        public code                : string
    ) {
        
    }
}

export interface ChangePassword {
    email: string,
    password: string
}

export class ChangePasswordClass {
    constructor(
        public email: string,
        public password: string
    ) {
        
    }
}