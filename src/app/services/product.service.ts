import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:7171/api/products';
  private categoryUrl:string = 'http://localhost:7171/api/product-category';

  constructor(private httpClient: HttpClient) { }


  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         categoryId:number): Observable<GetResponseProducts> {

    const searchUrl:string =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                              +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList( categoryId:number): Observable<Product[]> {

    const searchUrl:string =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]>
  {
    return this.httpClient.get<GetProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  getSearchedProductsPaginated(thePageNumber:number,thePageSize:number,searchText:string):Observable<GetResponseProducts>
  {

    const searchUrl:string=`${this.baseUrl}/search/findByNameContaining?keyword=${searchText}`
                            +`&page=${thePageNumber}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getSearchedProducts(searchText:string):Observable<Product[]>
  {

    const searchUrl:string=`${this.baseUrl}/search/findByNameContaining?keyword=${searchText}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response=>response._embedded.products)
    );
  }

  getProduct(productId:number):Observable<Product>
  {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl).pipe(
    /*  map(data=>{
        console.log(data);
        return data;
      })*/
    );
  }



}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
}

interface GetProductCategory{
  _embedded:{
    productCategory: ProductCategory[]
  }
}
