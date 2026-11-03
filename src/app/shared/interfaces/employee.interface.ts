export interface EmployeeData {
    id: number,
    userId: number,
    personId: number,
    fullName: string,
    position: string,
    salary: number,
    address: string,
    email: string,
    profile: string,
    skills: string,
    experience: string,
    cellPhoneNumber: string,
    documentType: string,
    banner: string,
    documentNumber: string,
    bussinessName: string,
    birthday: Date
}

/* export interface EmployeeParams {
    CurrentPage : number
    PageSize : number  
    Sort : string 
    Type : string 
    Search : string 
} */

export class EmployeeParams {
    CurrentPage : number = 1
    PageSize : number  = 10
    Sort : string = ''
    Type : TypeEmployee = ''
    Search : string  = ''
}

export type TypeEmployee = 'Medico Veterinario' | 'Vendedor' | 'Ayudante' | ''