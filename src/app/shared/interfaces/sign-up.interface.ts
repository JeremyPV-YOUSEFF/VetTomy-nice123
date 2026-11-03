export interface SignIn {
    email    : string,
    password : string
}

export interface LoginResponse{
    token   : string,
    profile : UserAppProfile

}

export interface UserAppProfile {
    id       : number;
    name     : string;
    lastName : string;
    email    : string;
    customerId : number,
    employeeId : number,
    userId   : number;
    rol : RolAppProfile
}

export interface RolAppProfile {
    id   : number;
    name : string;
}