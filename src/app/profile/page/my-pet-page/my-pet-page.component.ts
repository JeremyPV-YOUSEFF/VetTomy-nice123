import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { PetService } from '../../../shared/services/pet.service';
import { PetData, PetParams, PetSort } from '../../../shared/interfaces/pet.interface';
import { DatePipe } from '@angular/common';
import { LoadingImageComponent } from "../../../shared/components/loading-image/loading-image.component";
import { FilterPetComponent } from "../../components/filter-pet/filter-pet.component";
import { Paginate } from '../../../shared/interfaces/paginate.interface';

@Component({
  selector: 'app-my-pet-page',
  imports: [DatePipe, LoadingImageComponent, FilterPetComponent],
  templateUrl: './my-pet-page.component.html',
  styles: ``
})
export class MyPetPageComponent implements OnInit {

  public petData : PetData[] = []
  public petParams : PetParams = new PetParams();
  public pet ?: Paginate<PetData>

  constructor(
    private auth : AuthenticationService,
    private petService : PetService
  ) {
    
  }

  ngOnInit(): void {
    this.receiveData
    if (this.receiveData) {
      this.petParams.CustomerId = this.receiveData.customerId
    }
    this.getPets();
  }

  get receiveData (){
    return this.auth.profileData
  }

  getPets():void{
    this.petService.generalPets(this.petParams).subscribe({
      next: (data) => {
        this.petData = data.data
        this.pet = data
      }
    })
  }

  receiveChangeSort(data:PetSort):void{
    this.petParams.Sort = data;
    this.getPets();
  }
    
  receiveChangePage(page:number):void{
    this.petParams.CurrentPage = page;
    this.getPets();
  }

}
