import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { ScheduleData, ScheduleParams } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = environment.baseUrl
  private service = 'person/schedules'

  constructor(private htpp: HttpClient) { }
  

  getSchedules(query : ScheduleParams):Observable<Paginate<ScheduleData>>{
    let params = new HttpParams()
      .set('State',query.State)
      .set('CurrentPage',query.CurrentPage)
      .set('PageSize',query.PageSize)

    if (query.EmployeeId != 0) {
      params = params.set('EmployeeId',query.EmployeeId)
    }
    if (query.Date.length>0) {
      params = params.set('Date',query.Date)
    }
    return this.htpp.get<Paginate<ScheduleData>>(`${this.baseUrl}/${this.service}/generalSchedule`,{params})
  }

}
