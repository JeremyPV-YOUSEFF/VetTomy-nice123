import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})

export class ToastService {

  constructor(private messageService : MessageService ) { }

  showSucces(data:string) {
    this.messageService.add({severity:'success', summary:'¡Exito!',detail:`${data}`})
  }

  showError(){
    this.messageService.add({severity:'error',summary:'¡Error!',detail:'Ocurrio un error, intentelo de nuevo'})
  }

}
