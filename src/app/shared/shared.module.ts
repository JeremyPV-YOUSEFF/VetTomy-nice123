import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoadingTextComponent } from './components/loading-text/loading-text.component';
import { LoadingImageComponent } from './components/loading-image/loading-image.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    LoadingTextComponent,
    LoadingImageComponent,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    LoadingTextComponent,
    LoadingImageComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
