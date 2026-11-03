import { Component } from '@angular/core';
import { schedule, Schedule } from './contact.mockup';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'shared-contact',
  imports: [NgClass,NgIf],
  templateUrl: './contact.component.html',
  styles: ``
})
export class ContactComponent {

  public listSchedule : schedule[] = Schedule
  public idElemnt : number = 0

  onHiddenElements(id : number):void{
    this.idElemnt = id
  }

}
