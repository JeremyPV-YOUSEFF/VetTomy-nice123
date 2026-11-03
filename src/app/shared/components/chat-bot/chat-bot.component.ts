import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-chat-bot',
  imports: [NgIf],
  templateUrl: './chat-bot.component.html',
  styles: ``
})
export class ChatBotComponent {

  public state : boolean = true;

  changeState():void{
    this.state = !this.state
  }

}
