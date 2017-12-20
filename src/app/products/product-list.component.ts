import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl:'./product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
    errorMessage: string;
    pageTitle: String = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredList : IProduct[];
    
    _listFilter : string;
    private _productService:ProductService;

    get listFilter():string{
        return this._listFilter;
    }

    set listFilter(listFilter : string) {
        this._listFilter = listFilter;
        this.filteredList = this._listFilter ? this.filter(this.listFilter) : this.products;
    }
    products: IProduct[];

    constructor(productService:ProductService){
        this._productService = productService;
    }

    filter(filterBy : string) : IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }

    toggleImage() : void{
        this.showImage = !this.showImage; 
    }
    ngOnInit() : void{
        this._productService.getProducts().subscribe(products =>{
            this.products = products;
            this.filteredList = this.products;
        },
            error => this.errorMessage = <any>error);
        
    }

    onRatingClicked(message: string) : void{
        this.pageTitle = 'Product list ' + message;
    }
}