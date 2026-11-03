export interface ChangePasswordProfile {
    userId      : number,
    oldPassword : string,
    newPassword : string
}

export class ChangePasswordProfileClass {
    userId      : number = 0;
    oldPassword : string = '';
    newPassword : string= '';
}