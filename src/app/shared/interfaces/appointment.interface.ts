export interface AppointmentData {
    appointmentNumber: string,
    fullName: string,
    employeeName: string,
    serviceName: string,
    petName: string,
    petId: number,
    date: Date,
    time: string,
    type: string,
    reason: string,
    reasonCancellation: string,
    branchName: string
}



export interface CreateAppointment {
    date : Date,
    state : boolean,
    type : string,
    reason : string,
    branchId : number,
    petId : number,
    serviceId : number,
    scheduleId : number,
    customerId : number
}

export class CreateAppointmentClass {
    date : Date  = new Date() ;
    state : boolean = true;
    type : string = '';
    reason : string = '';
    branchId : number = 0;
    petId : number = 0;
    serviceId : number = 0 ;
    scheduleId : number = 0;
    customerId : number = 0;
}

export class AppointmentParams{
    CurrentPage : number = 1;
    PageSize    : number = 4;
    State       : boolean = true
    CustomerId  : number = 0
    Sort        : SortAppointmentParams = 'idDesc'
}

export type SortAppointmentParams = ''|'idDesc'|'dateDesc'|'dateAsc'|'creationDateAsc'|'creationDateDesc'