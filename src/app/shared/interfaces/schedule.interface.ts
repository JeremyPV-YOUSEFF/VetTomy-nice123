export interface ScheduleData {
    id          : number,
    employeeId  : number,
    date        : Date,
    startTime   : string,
    endTime     : string,
    state       : boolean
}

export class ScheduleParams {
    CurrentPage : number = 1
    PageSize    : number  = 10
    State       : boolean = true
    EmployeeId  : number = 0
    Date        : string = ''
}