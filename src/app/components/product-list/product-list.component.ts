import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import {ActivatedRoute} from "@angular/router";
import {CartServiceService} from "../../services/cart-service.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId:number = null;
  products: Product[] = [];
  searchMode:boolean = false;
  previousCategoryId:number = 1;
  previousKeyword:string='';

  //new properties for pagination
  thePageNumber:number=1;
  thePageSize:number = 5;
  theTotalElements:number = 0;


  constructor(private productService: ProductService,
              private route:ActivatedRoute,
              private cartService:CartServiceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });


  }

  listProducts() {

    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode)
    {
      this.searchProducts();
    }
    else{
      this.handleListProducts();
    }

  }



  searchProducts()
  {

    const searchText:string=this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyword!=searchText){
      this.thePageNumber=1;
    }
    this.previousKeyword=searchText;

    this.productService.getSearchedProductsPaginated(this.thePageNumber-1,this.thePageSize,searchText)
      .subscribe(this.processResult());
  }

  handleListProducts()
  {
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId)
    {
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId=1;
    }

    //check if previous current category id is different from previouscategoryId
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }

  this.previousCategoryId=this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              this.currentCategoryId).subscribe(this.processResult());

  }

  updatePageSize()
  {
    this.thePageNumber=1;
    this.listProducts();
  }

  processResult()
  {
    return (data=>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    });
  }

  addToCart(tempProduct:Product)
  {
    const cartItem:CartItem=new CartItem(tempProduct);
    this.cartService.addToCart(cartItem);

  }



}
