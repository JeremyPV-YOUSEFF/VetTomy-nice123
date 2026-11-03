import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [SharedModule,RouterOutlet],
  templateUrl: './basic-page.component.html',
  styles: ``
})
export default class BasicPageComponent {

}
