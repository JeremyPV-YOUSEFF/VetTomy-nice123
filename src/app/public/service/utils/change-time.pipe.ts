import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeTime'
})
export class ChangeTimePipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case ('08:00:00'):
        return '08:00 A.M'
      case ('09:00:00'):
        return '09:00 A.M'
      case ('10:00:00'):
        return '10:00 A.M'
      case ('11:00:00'):
        return '11:00 A.M'
      case ('12:00:00'):
        return '12:00 A.M'
      case ('13:00:00'):
        return '01:00 P.M'
      case ('14:00:00'):
        return '02:00 P.M'
      case ('15:00:00'):
        return '03:00 P.M'
      case ('16:00:00'):
        return '04:00 P.M'
      case ('17:00:00'):
        return '05:00 P.M'
      case ('18:00:00'):
        return '06:00 P.M'
      default : 
        return 'Any'
    }
  }

}
