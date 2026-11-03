import { Component, EventEmitter, Output } from '@angular/core';
import { BrandParams, BrandShort } from '../../../../shared/interfaces/brand.interface';
import { BrandService } from '../../../../shared/services/brand.service';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoryService } from '../../../../shared/services/category.service';
import { CategoryParams, CategoryShort } from '../../../../shared/interfaces/category.interface';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'store-filter-product',
  imports: [ReactiveFormsModule,CheckboxModule,FormsModule,LoadingTextComponent,NgIf],
  templateUrl: './filter-product.component.html',
  styles: ``
})
export class FilterProductComponent {

  @Output() brands = new EventEmitter<string[]>();
  @Output() typePet = new EventEmitter<string[]>();
  @Output() categories = new EventEmitter<string[]>();
  @Output() deleteParams = new EventEmitter<void>();
  @Output() searchProduct = new EventEmitter<string>();


  public searchInputBrand = new FormControl('');
  public searchInputProduct = new FormControl('');

  public brandParams : BrandParams = new BrandParams();
  public categoryParams : CategoryParams = new CategoryParams();

  public listBrands : BrandShort[] = []
  public typeBrand : string[] = []
  public typeCategory : string[] = []

  public listCategories : CategoryShort[] = []

  public listTypePet : string[] = []

  public selectedBrand : any[] = []
  public selectedTypePet : any[] = []
  public selectedCategories : any[] = []

  public showDeleteParams : boolean = false

  constructor(
    public brandService : BrandService,
    public categoryService : CategoryService
  ){
  }

  ngOnInit(): void {
    this.getBrands();    
    this.getCategories();
  }

  getBrands():void{
    this.brandService.getBrands(this.brandParams)
      .subscribe({
        next: (data) => this.listBrands = data.data
      })
  }

  getCategories():void{
    this.categoryService.getCategories(this.categoryParams).subscribe({
      next: (data) => this.listCategories = data.data
    })
  }

  onChangeBrand():void{
    this.typeBrand = [...this.selectedBrand];
    if (this.selectedBrand.length==0) {
      this.brands.emit([]);
    }
    this.selectedBrand.forEach(element => {
      this.typeBrand.push(element)
      this.brands.emit(this.typeBrand);
      this.showDeleteParams = true;
    });
  }

  onChangeTypePet():void{
    this.listTypePet = []
    if (this.selectedTypePet.length==0) {
      this.typePet.emit([]);
    }
    this.selectedTypePet.forEach(element => {
      this.listTypePet.push(element)
      this.typePet.emit(this.listTypePet);
      this.showDeleteParams = true;
    });
  }

  onChangeCategories():void{
    this.typeCategory = []
    if (this.selectedCategories.length ==0) {
      this.categories.emit([]);
    }
    this.selectedCategories.forEach(element => {
      this.typeCategory.push(element);
      this.categories.emit(this.typeCategory);
      this.showDeleteParams = true;
    });
  }

  searchBrand():void{
    const value : string = this.searchInputBrand.value?.trim() || '';
    setTimeout(() => {
      this.brandParams.Search = value
      this.getBrands()
    }, 2000);
  }


  onDeleteParams():void{
    this.deleteParams.emit();
    this.showDeleteParams = false;
    this.selectedBrand = [];
    this.brands.emit([]);
    this.selectedCategories=[];
    this.categories.emit([])
    this.selectedTypePet=[];
    this.typePet.emit([])
  }

  bySearchProduct():void{
    const value : string = this.searchInputProduct.value?.trim() || '';
    setTimeout(() => {
      this.searchProduct.emit(value)
    }, 2000);
  }

}
