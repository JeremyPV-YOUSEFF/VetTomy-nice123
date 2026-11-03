import { Component, OnInit } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { FilterProductComponent } from "../filter-product/filter-product.component";
import { SortProductComponent } from "../sort-product/sort-product.component";
import { ProductService } from '../../../../shared/services/product.service';
import { ProductData, ProductParams, SortProduct } from '../../../../shared/interfaces/product.interface';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { BrandService } from '../../../../shared/services/brand.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { BrandParams } from '../../../../shared/interfaces/brand.interface';
import { CategoryParams } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'store-list-product',
  imports: [CardProductComponent, FilterProductComponent, SortProductComponent],
  templateUrl: './list-product.component.html',
  styles: ``
})
export class ListProductComponent implements OnInit {

  public productList: Paginate<ProductData> | null = null;
  public productParams: ProductParams = new ProductParams();
  public productByCache: ProductData[] = [];
  public productByCache1: ProductData[] = [];
  public brandData : string[] = []
  public categoryData : string[] = []

  constructor(private productService: ProductService,private brandService:BrandService,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.productParams.Type = 'Producto';
    this.productParams.PageSize = 200; // traemos todos los productos
    this.productParams.CurrentPage = 1;
    this.getProducts();
    this.getBrands();
    this.getCategories();
  }



  private getProducts(): void {
    this.productService.getProducts(this.productParams).subscribe({
      next: (data) => {
        this.productByCache = data.data; // guardamos todo en cache
        this.applyFiltersAndPagination(); // aplicamos filtros y paginado local
      }
    });
  }

  private getBrands():void{
    const params = new BrandParams();
    params.Exclude = "Sin marca";
    this.brandService.getBrands(params).subscribe({
       next: (data) => {
        const newdata = data.data.map(x => x.name)
        this.brandData = newdata;
       }
    })
  }

  private getCategories():void{
    const params = new CategoryParams();
    params.Exclude = "Sin categoria";
    this.categoryService.getCategories(params).subscribe({
       next: (data) => {
        const newdata = data.data.map(x => x.name)
        this.categoryData = newdata;
       }
    })
  }


  private applyFiltersAndPagination(): void {
    if (!this.productByCache) return;
    // 🔹 Filtrado
    let filtered = this.productByCache.filter(product => {
    const brandMatch = this.productParams.Brands?.length ? this.productParams.Brands.includes(product.brandName) : true;
    const typePetMatch = this.productParams.TypePet?.length ? this.productParams.TypePet.includes(product.typePet) : true;
    const categoryMatch = this.productParams.Category?.length ? this.productParams.Category.includes(product.categoryName) : true;

    // 🔹 Búsqueda (case-insensitive)
    const searchMatch = this.productParams.Search
      ? product.name.toLowerCase().includes(this.productParams.Search.toLowerCase()) ||
        product.brandName.toLowerCase().includes(this.productParams.Search.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(this.productParams.Search.toLowerCase())
      : true;

    return brandMatch && typePetMatch && categoryMatch && searchMatch;
  });

    // 🔹 Ordenamiento
    if (this.productParams.Sort) {
  switch (this.productParams.Sort) {
    case 'priceAsc':
      filtered = filtered.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      filtered = filtered.sort((a, b) => b.price - a.price);
      break;
    case 'nameAsc':
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'idDesc':
      filtered = filtered.sort((a, b) => b.id - a.id);
      break;
    default:
      filtered = filtered.sort((a, b) => a.id - b.id);
      break;
  }
}

    // 🔹 Paginación local
    const pageSize = 12;
    const currentPage = this.productParams.CurrentPage || 1;
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    this.productList = {
      data: filtered.slice(start, end),
      pageSize : 12,
      totalItems,
      totalPages,
      currentPage
    };
  }

  // 🎯 Métodos de filtros
  recieveBrands(brands: string[]): void {
    brands = brands.filter(x => !['Perro','Gato'].includes(x));
    brands = brands.filter(x => !this.categoryData.includes(x));
    this.productParams.Brands = brands;
    this.productParams.CurrentPage = 1;
    this.applyFiltersAndPagination();
  }

  recieveTypePets(typePets: string[]): void {
    typePets = typePets.filter(x => !this.categoryData.includes(x));
    typePets = typePets.filter(x => !this.brandData.includes(x));
    this.productParams.TypePet = typePets;
    this.productParams.CurrentPage = 1;
    this.applyFiltersAndPagination();
  }

  recieveCategories(categories: string[]): void {
    categories = categories.filter(x => !['Perro','Gato'].includes(x));
    categories = categories.filter(x => !this.brandData.includes(x));
    this.productParams.Category = categories;
    this.productParams.CurrentPage = 1;
    this.applyFiltersAndPagination();
  }

  // 🎯 Ordenamiento
  receiveSort(sort: SortProduct): void {
    this.productParams.Sort = sort;
    this.applyFiltersAndPagination();
  }

  // 🎯 Cambio de página
  receiveCurrentPage(page: number): void {
    this.productParams.CurrentPage = page;
    this.applyFiltersAndPagination();
  }

  // 🎯 Reset de filtros
  deleteParams(): void {
    this.productParams.Brands = [];
    this.productParams.TypePet = [];
    this.productParams.Category = [];
    this.productParams.CurrentPage = 1;
    this.applyFiltersAndPagination();
  }

  receiveSearchProduct(data:string){
    this.productParams.Search = data
    this.productParams.CurrentPage = 1
    this.applyFiltersAndPagination();
  }

}