export interface RegisterCustomer {
    name: string,
    lastName: string,
    email: string,
    password: string
}

export interface SendEmailCustomerResponse {
    emailVerificationId : number
}

export interface RegisterCustomerWithRespasword {
    name: string,
    lastName: string,
    email: string,
    password: string
    repassword : string
}

export interface ResponseRegisterCustome{
    bannerId : number,
    personId : number,
    userId : number,
    customerId : number,
    emailVerificationId : number,
    email : string,
    type : TypeSendEmail  ,
}

export type TypeSendEmail = 'validateEmial'|'changePassword'